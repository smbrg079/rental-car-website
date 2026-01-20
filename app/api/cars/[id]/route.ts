import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const IdSchema = z.string().min(1);

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const rawParams = await params;
        const result = IdSchema.safeParse(rawParams.id);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const id = result.data;
        const car = await db.car.findUnique({
            where: { id },
        });

        if (!car) {
            return NextResponse.json(
                { error: "Car not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json(
            { error: "Failed to fetch car" },
            { status: 500 }
        );
    }
}
