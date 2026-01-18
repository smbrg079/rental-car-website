"use client"

import { ShieldCheck, Clock, MapPin, Headphones } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        icon: ShieldCheck,
        title: "Fully Licensed",
        description: "We are fully licensed and insured, giving you peace of mind on the road.",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        description: "Our customer support team is available around the clock to assist you.",
    },
    {
        icon: MapPin,
        title: "Convenient Locations",
        description: "Pick up and drop off your car at any of our convenient locations.",
    },
    {
        icon: Headphones,
        title: "Free Cancellation",
        description: "Change of plans? No problem. Cancel up to 24h before pickup.",
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose Us</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We pride ourselves on providing the best car rental experience in the industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border"
                        >
                            <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
