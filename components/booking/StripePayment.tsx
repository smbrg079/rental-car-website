"use client"

import { useState, useEffect } from "react"
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/Button"

interface StripePaymentProps {
    amount: number
    onSuccess: () => void
}

export default function StripePayment({ amount, onSuccess }: StripePaymentProps) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break
                default:
                    setMessage("Something went wrong.")
                    break
            }
        })
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/booking`,
            },
            redirect: "if_required", // Prevent redirect if not needed (e.g. standard card)
        })

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message ?? "An unexpected error occurred.")
            } else {
                setMessage("An unexpected error occurred.")
            }
            setIsLoading(false)
        } else {
            // Payment succeeded
            onSuccess()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            {message && <div className="text-sm text-red-500">{message}</div>}

            <Button
                disabled={isLoading || !stripe || !elements}
                className="w-full"
            >
                {isLoading ? "Processing..." : `Pay $${amount}`}
            </Button>
        </form>
    )
}
