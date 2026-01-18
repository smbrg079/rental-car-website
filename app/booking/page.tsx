import BookingForm from "@/components/booking/BookingForm"

export default function BookingPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mx-auto max-w-2xl text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Complete Your Reservation</h1>
                <p className="text-muted-foreground mt-2">
                    Follow the steps below to secure your premium vehicle.
                </p>
            </div>
            <BookingForm />
        </div>
    )
}
