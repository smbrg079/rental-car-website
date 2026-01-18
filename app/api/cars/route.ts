import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const cars = await db.car.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json(
            { error: "Failed to fetch cars" },
            { status: 500 }
        );
    }
}
