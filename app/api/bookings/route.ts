import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { RateLimiter } from "@/lib/rate-limit";

const BookingSchema = z.object({
    carId: z.string().min(1, "Car ID is required"),
    customerName: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is too short"),
    pickupDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), { message: "Invalid pickup date" }),
    returnDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), { message: "Invalid return date" }),
    pickupLocation: z.string().min(2, "Pickup location is required")
}).refine(data => {
    const pickup = new Date(data.pickupDate);
    const ret = new Date(data.returnDate);
    return ret > pickup;
}, {
    message: "Return date must be after pickup date",
    path: ["returnDate"]
});

export async function GET(request: Request) {
    // ----------------------------------------------------------------------
    // SECURITY NOTE: This endpoint exposes sensitive booking data.
    // We are enforcing a basic API Key check via headers.
    // Header Key: x-admin-api-key
    // ----------------------------------------------------------------------
    const apiKey = request.headers.get("x-admin-api-key");
    const validKey = process.env.ADMIN_API_KEY;

    // Zero Trust: Default to deny if no key is configured or header is missing
    if (!validKey || apiKey !== validKey) {
        return NextResponse.json(
            { error: "Unauthorized Access" },
            { status: 401 }
        );
    }

    try {
        const bookings = await db.booking.findMany({
            include: { car: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "anonymous";
        const isAllowed = await RateLimiter.check(`booking_${ip}`, 10, 60000); // 10 bookings per minute

        if (!isAllowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate required fields
        const result = BookingSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation Error", details: result.error.issues },
                { status: 400 }
            );
        }

        const { carId, customerName, email, phone, pickupDate, returnDate, pickupLocation } = result.data;

        // Find the car to get its price
        const car = await db.car.findUnique({
            where: { id: carId },
        });

        if (!car) {
            return NextResponse.json(
                { error: "Car not found" },
                { status: 404 }
            );
        }

        // Calculate total price based on rental duration
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const days = Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
        const validDays = Math.max(1, days);
        const totalPrice = validDays * car.price;

        // Create the booking
        const booking = await db.booking.create({
            data: {
                carId,
                customerName,
                email,
                phone,
                pickupDate: pickup,
                returnDate: returnD,
                pickupLocation,
                totalPrice,
                status: "pending",
            },
            include: { car: true },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}
