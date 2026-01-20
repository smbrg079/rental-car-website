"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Calendar, CreditCard, User, MapPin } from "lucide-react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripePayment from "./StripePayment"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const steps = [
    { id: 1, name: "Rental Details", icon: Calendar },
    { id: 2, name: "Personal Info", icon: User },
    { id: 3, name: "Payment", icon: CreditCard },
    { id: 4, name: "Confirmation", icon: Check },
]

export default function BookingForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [clientSecret, setClientSecret] = useState("")

    // Mock amount, could be calculated based on selection
    const bookingAmount = 450;

    useEffect(() => {
        // Create PaymentIntent as soon as the user reaches step 3 or we could do it on mount if we knew the amount
        if (currentStep === 3) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: bookingAmount }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [currentStep])

    const handleNext = () => {
        // Step 3 (Payment) is handled by the payment form internally
        if (currentStep !== 3) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1)
    }

    const handlePaymentSuccess = () => {
        setCurrentStep(4)
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
        },
    };

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <div className="relative flex justify-between">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-secondary" />
                    {/* Active Progress Bar */}
                    <div
                        className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-primary transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-background px-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${currentStep >= step.id
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-secondary bg-background text-muted-foreground"
                                }`}>
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
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-xl font-bold">Rental Details</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Pick-up Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <input type="text" className="w-full rounded-md border bg-transparent py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter city or airport" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Drop-off Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <input type="text" className="w-full rounded-md border bg-transparent py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter city or airport" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Pick-up Date</label>
                                        <input type="date" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Drop-off Date</label>
                                        <input type="date" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </div>
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
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <input type="text" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <input type="text" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <input type="email" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone</label>
                                        <input type="tel" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 (555) 000-0000" />
                                    </div>
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
                                <h2 className="text-xl font-bold">Payment Method</h2>
                                <div className="mb-4">
                                    <p className="text-muted-foreground">Total: <span className="font-bold text-foreground mx-1">${bookingAmount.toFixed(2)}</span></p>
                                </div>
                                {clientSecret ? (
                                    <Elements options={options} stripe={stripePromise}>
                                        <StripePayment amount={bookingAmount} onSuccess={handlePaymentSuccess} />
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
                                    Your reservation has been successfully confirmed. A confirmation email has been sent to your inbox.
                                </p>
                                <Button onClick={() => window.location.href = '/'}>Return Home</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {currentStep < 4 && (
                        <div className="mt-8 flex justify-between">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                            >
                                Back
                            </Button>
                            {currentStep !== 3 && (
                                <Button
                                    onClick={handleNext}
                                >
                                    Next Step
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
