"use client"

import { cars } from "@/lib/data"
import CarCard from "@/components/cars/CarCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturedCars() {
    const featured = cars.slice(0, 3)

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-10 flex items-end justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Premium Fleet</h2>
                        <p className="text-muted-foreground">
                            Choose from our exclusive collection of luxury and high-performance vehicles.
                        </p>
                    </div>
                    <Link href="/cars" className="hidden md:block">
                        <Button variant="ghost" className="gap-2">
                            View All Cars <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featured.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CarCard car={car} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/cars">
                        <Button variant="ghost" className="gap-2">
                            View All Cars <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
