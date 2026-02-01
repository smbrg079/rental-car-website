import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const fuel = searchParams.get("fuel");
        const transmission = searchParams.get("transmission");

        const cars = await db.car.findMany({
            where: {
                ...(category && { type: category }),
                ...(fuel && { fuel }),
                ...(transmission && { transmission }),
            },
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
