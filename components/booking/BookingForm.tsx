"use client"

import { useState, useEffect } from "react"

function getClientSecretFromUrl(): string | null {
    if (typeof window === "undefined") return null
    return new URLSearchParams(window.location.search).get("payment_intent_client_secret")
}
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Calendar, CreditCard, User, MapPin, Car } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripePayment from "./StripePayment"
import Image from "next/image"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type CarType = { id: string; model: string; type: string; price: number; image: string }

const steps = [
    { id: 1, name: "Choose Car & Dates", icon: Car },
    { id: 2, name: "Your Info", icon: User },
    { id: 3, name: "Payment", icon: CreditCard },
    { id: 4, name: "Confirmed", icon: Check },
]

export default function BookingForm({ preselectedCarId }: { preselectedCarId?: string }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [cars, setCars] = useState<CarType[]>([])
    const [clientSecret, setClientSecret] = useState(() => getClientSecretFromUrl() || "")
    const [bookingId, setBookingId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        carId: preselectedCarId || "",
        pickupLocation: "",
        returnLocation: "",
        pickupDate: "",
        returnDate: "",
        customerName: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        fetch("/api/cars")
            .then((r) => r.json())
            .then(setCars)
            .catch(() => setCars([]))
    }, [])

    useEffect(() => {
        const urlSecret = getClientSecretFromUrl()
        if (urlSecret) {
            setClientSecret((prev) => prev || urlSecret)
            setCurrentStep((prev) => (prev < 3 ? 3 : prev))
        }
    }, [])

    useEffect(() => {
        if (preselectedCarId) setFormData((p) => ({ ...p, carId: preselectedCarId }))
    }, [preselectedCarId])

    const selectedCar = cars.find((c) => c.id === formData.carId)

    const pickup = formData.pickupDate ? new Date(formData.pickupDate) : null
    const returnD = formData.returnDate ? new Date(formData.returnDate) : null
    const days = pickup && returnD && returnD > pickup
        ? Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)) || 1
        : 1
    const totalPrice = selectedCar ? Math.round(selectedCar.price * days) : 0

    const canProceedStep1 = formData.carId && formData.pickupLocation && formData.pickupDate && formData.returnDate && totalPrice > 0
    const canProceedStep2 = formData.customerName?.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.phone?.trim().length >= 5

    const handleNext = () => {
        setError(null)
        if (currentStep === 1 && canProceedStep1) setCurrentStep(2)
        else if (currentStep === 2 && canProceedStep2) {
            createBookingAndPaymentIntent()
        }
    }

    const createBookingAndPaymentIntent = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    carId: formData.carId,
                    customerName: formData.customerName,
                    email: formData.email,
                    phone: formData.phone,
                    pickupDate: new Date(formData.pickupDate).toISOString(),
                    returnDate: new Date(formData.returnDate).toISOString(),
                    pickupLocation: formData.pickupLocation,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to create booking")

            setBookingId(data.id)

            const payRes = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: data.totalPrice, bookingId: data.id }),
            })
            const payData = await payRes.json()
            if (!payRes.ok) throw new Error(payData.error || "Failed to init payment")
            setClientSecret(payData.clientSecret)
            setCurrentStep(3)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handlePaymentSuccess = async () => {
        if (bookingId) {
            try {
                await fetch(`/api/bookings/${bookingId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "confirmed" }),
                })
            } catch {
                // Non-blocking
            }
        }
        setCurrentStep(4)
    }

    const options = {
        clientSecret,
        appearance: { theme: "stripe" as const },
    }

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-secondary" />
                    <div
                        className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-primary transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />
                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-background px-2">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                                    currentStep >= step.id ? "border-primary bg-primary text-primary-foreground" : "border-secondary bg-background text-muted-foreground"
                                }`}
                            >
                                <step.icon className="h-5 w-5" />
                            </div>
                            <span className={`text-xs font-medium ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <Card>
                <CardContent className="p-6">
                    {error && (
                        <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-xl font-bold">Choose Vehicle & Rental Period</h2>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Select Car *</label>
                                    <select
                                        value={formData.carId}
                                        onChange={(e) => setFormData((p) => ({ ...p, carId: e.target.value }))}
                                        className="w-full rounded-md border bg-transparent py-2 pl-3 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Choose a vehicle</option>
                                        {cars.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.model} - ${c.price}/day
                                            </option>
                                        ))}
                                    </select>
                                    {selectedCar && (
                                        <div className="flex gap-4 rounded-lg border p-3">
                                            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded">
                                                <Image src={selectedCar.image} alt={selectedCar.model} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{selectedCar.model}</p>
                                                <p className="text-sm text-muted-foreground">{selectedCar.type} • ${selectedCar.price}/day</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4" /> Pick-up Location *</label>
                                        <input
                                            type="text"
                                            value={formData.pickupLocation}
                                            onChange={(e) => setFormData((p) => ({ ...p, pickupLocation: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent py-2 pl-3 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="City, airport, or address"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4" /> Drop-off Location</label>
                                        <input
                                            type="text"
                                            value={formData.returnLocation}
                                            onChange={(e) => setFormData((p) => ({ ...p, returnLocation: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent py-2 pl-3 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Same as pick-up if blank"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2"><Calendar className="h-4 w-4" /> Pick-up Date *</label>
                                        <input
                                            type="date"
                                            value={formData.pickupDate}
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={(e) => setFormData((p) => ({ ...p, pickupDate: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2"><Calendar className="h-4 w-4" /> Return Date *</label>
                                        <input
                                            type="date"
                                            value={formData.returnDate}
                                            min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                                            onChange={(e) => setFormData((p) => ({ ...p, returnDate: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                                {totalPrice > 0 && (
                                    <p className="text-sm font-medium text-primary">
                                        Total: ${totalPrice} ({days} {days === 1 ? "day" : "days"})
                                    </p>
                                )}
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-xl font-bold">Your Information</h2>
                                <p className="text-sm text-muted-foreground">We&apos;ll send your confirmation here.</p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.customerName}
                                            onChange={(e) => setFormData((p) => ({ ...p, customerName: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2 md:max-w-[50%]">
                                        <label className="text-sm font-medium">Email *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2 md:max-w-[50%]">
                                        <label className="text-sm font-medium">Phone *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4">
                                    <p className="text-sm font-medium">Booking summary</p>
                                    <p className="text-muted-foreground text-sm">{selectedCar?.model} • {days} days • ${totalPrice}</p>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-xl font-bold">Payment</h2>
                                <p className="text-muted-foreground">Total: <span className="font-bold text-foreground mx-1">${totalPrice.toFixed(2)}</span></p>
                                {clientSecret ? (
                                    <Elements options={options} stripe={stripePromise}>
                                        <StripePayment amount={totalPrice} onSuccess={handlePaymentSuccess} bookingId={bookingId} />
                                    </Elements>
                                ) : (
                                    <div className="flex h-40 items-center justify-center">
                                        <p className="animate-pulse text-muted-foreground">Preparing secure payment...</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center space-y-4 py-8 text-center"
                            >
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    <Check className="h-10 w-10" />
                                </div>
                                <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
                                <p className="text-muted-foreground max-w-md">
                                    Your reservation has been confirmed.
                                    {formData.email ? ` A confirmation email has been sent to ${formData.email}.` : " A confirmation email has been sent to your inbox."}
                                </p>
                                <Button onClick={() => (window.location.href = "/")}>Return Home</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {currentStep < 4 && (
                        <div className="mt-8 flex justify-between">
                            <Button variant="outline" onClick={() => setCurrentStep((p) => Math.max(1, p - 1))} disabled={currentStep === 1}>
                                Back
                            </Button>
                            {currentStep !== 3 && (
                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        (currentStep === 1 && !canProceedStep1) ||
                                        (currentStep === 2 && !canProceedStep2) ||
                                        loading
                                    }
                                >
                                    {loading ? "Processing..." : currentStep === 2 ? "Proceed to Payment" : "Next Step"}
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
