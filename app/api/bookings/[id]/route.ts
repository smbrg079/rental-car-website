import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const IdSchema = z.string().min(1);

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = IdSchema.safeParse(id);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid booking ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        if (status !== "confirmed" && status !== "cancelled") {
            return NextResponse.json(
                { error: "Invalid status. Use 'confirmed' or 'cancelled'" },
                { status: 400 }
            );
        }

        const booking = await db.booking.update({
            where: { id: result.data },
            data: { status },
            include: { car: true },
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error updating booking:", error);
        return NextResponse.json(
            { error: "Failed to update booking" },
            { status: 500 }
        );
    }
}
