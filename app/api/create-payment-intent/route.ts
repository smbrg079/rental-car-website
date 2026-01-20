import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { RateLimiter } from "@/lib/rate-limit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

const PaymentIntentSchema = z.object({
    amount: z.number().positive().min(1), // Ensure positive amount, at least 1 unit
});

export async function POST(request: Request) {
    try {
        // Simple rate limiting based on IP (using headers in proxy/middleware context)
        const ip = request.headers.get("x-forwarded-for") || "anonymous";
        const isAllowed = await RateLimiter.check(ip, 5, 60000); // 5 requests per minute

        if (!isAllowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate input
        const result = PaymentIntentSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid input: " + result.error.message },
                { status: 400 }
            );
        }

        const { amount } = result.data;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Ensure integer for Stripe
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}
