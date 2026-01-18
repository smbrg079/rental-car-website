import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
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
        const body = await request.json();

        const { carId, customerName, email, phone, pickupDate, returnDate, pickupLocation } = body;

        // Validate required fields
        if (!carId || !customerName || !email || !phone || !pickupDate || !returnDate || !pickupLocation) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

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
        const totalPrice = days * car.price;

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
