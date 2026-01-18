"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { motion } from "framer-motion"


export default function Hero() {
    return (
        <div className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Image/Video Placeholder */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2866&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 text-5xl font-bold tracking-tight md:text-7xl"
                >
                    Drive Your Dream
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 max-w-2xl text-lg md:text-xl text-gray-200"
                >
                    Premium car rental service for those who appreciate comfort, style, and performance.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex gap-4"
                >
                    <Link href="/cars">
                        <Button size="lg" className="text-lg px-8">View Fleet</Button>
                    </Link>
                    <Link href="/booking">
                        <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
                            Book Now
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
