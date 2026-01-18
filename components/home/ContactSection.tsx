"use client"

import { Button } from "@/components/ui/Button"
import { Phone, MessageCircle } from "lucide-react"

export default function ContactSection() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Need Assistance?</h2>
                        <p className="text-primary-foreground/80 max-w-xl">
                            Our 24/7 support team is ready to help you with your booking or answer any questions.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-none gap-2">
                            <MessageCircle className="h-5 w-5" />
                            WhatsApp
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary gap-2">
                            <Phone className="h-5 w-5" />
                            +1 (555) 123-4567
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
