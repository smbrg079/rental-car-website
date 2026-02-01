"use client"

import { Shield, CreditCard, Zap } from "lucide-react"
import { motion } from "framer-motion"

const badges = [
    { icon: Shield, text: "Secure Booking", sub: "256-bit SSL encrypted" },
    { icon: CreditCard, text: "Best Price Guarantee", sub: "No hidden fees" },
    { icon: Zap, text: "Instant Confirmation", sub: "Book in under 2 min" },
]

export default function TrustBadges() {
    return (
        <section className="py-8 border-y bg-white/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {badges.map(({ icon: Icon, text, sub }, i) => (
                        <motion.div
                            key={text}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 justify-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{text}</p>
                                <p className="text-xs text-muted-foreground">{sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
