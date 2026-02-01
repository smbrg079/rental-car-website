import BookingForm from "@/components/booking/BookingForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Complete Your Reservation",
    description: "Book your premium rental car in 3 easy steps. Secure payment, instant confirmation. Reserve now.",
}

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BookingPage({ searchParams }: PageProps) {
    const params = await searchParams
    const carId = typeof params.carId === "string" ? params.carId : undefined

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mx-auto max-w-2xl text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Complete Your Reservation</h1>
                <p className="text-muted-foreground mt-2">
                    Follow the steps below to secure your premium vehicle.
                </p>
            </div>
            <BookingForm preselectedCarId={carId} />
        </div>
    )
}
