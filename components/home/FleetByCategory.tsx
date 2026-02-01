"use client"

import { Link } from "@/i18n/routing"
import { motion } from "framer-motion"
import { ArrowRight, Car, Mountain, Zap, Gauge } from "lucide-react"
import Image from "next/image"

type Car = { id: string; model: string; type: string; price: number; image: string }

const categories = [
    { id: "Luxury", label: "Luxury", icon: Gauge, description: "Premium comfort & style" },
    { id: "SUV", label: "SUV", icon: Mountain, description: "Space & capability" },
    { id: "Electric", label: "Electric", icon: Zap, description: "Zero emissions" },
    { id: "Sedan", label: "Sedan", icon: Car, description: "Everyday excellence" },
]

export default function FleetByCategory({ cars }: { cars: Car[] }) {
    const byCategory = categories.map((cat) => ({
        ...cat,
        cars: cars.filter((c) => c.type === cat.id).slice(0, 2),
    })).filter((c) => c.cars.length > 0)

    return (
        <section className="py-24 bg-neutral-50" aria-labelledby="fleet-categories-heading">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    id="fleet-categories-heading"
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Category</span>
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        Find the perfect vehicle for your trip. From city sedans to adventure SUVs.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {byCategory.map((category, catIndex) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <category.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{category.label}</h3>
                                        <p className="text-muted-foreground">{category.description}</p>
                                    </div>
                                </div>
                                <Link
                                    href={`/cars?category=${category.id}`}
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                                >
                                    View all {category.label} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {category.cars.map((car, i) => (
                                    <Link
                                        key={car.id}
                                        href={`/cars/${car.id}`}
                                        className="group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={car.image}
                                                alt={car.model}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                                                ${car.price}/day
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="font-semibold group-hover:text-primary transition-colors">{car.model}</p>
                                            <p className="text-sm text-muted-foreground">{car.type}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Link href="/cars">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                            View Full Fleet <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
