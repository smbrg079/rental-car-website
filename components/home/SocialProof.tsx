"use client"

import { Star, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function SocialProof() {
    return (
        <section className="py-16 bg-primary text-primary-foreground" aria-label="Customer reviews">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-8 w-8 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                        &ldquo;Best car rental experience I&apos;ve ever had. Seamless booking and the Mercedes was pristine.&rdquo;
                    </blockquote>
                    <p className="font-semibold">— Sarah M., Verified Customer</p>
                    <div className="mt-8 flex items-center justify-center gap-2 text-primary-foreground/90">
                        <Users className="h-5 w-5" />
                        <span>Join 10,000+ satisfied renters</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
