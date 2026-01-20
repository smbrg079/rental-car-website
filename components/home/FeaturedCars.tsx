"use client"

import { cars } from "@/lib/data"
import CarCard from "@/components/cars/CarCard"
import { Button } from "@/components/ui/Button"
import { Link } from "@/i18n/routing"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function FeaturedCars() {
    const t = useTranslations("FeaturedCars")
    const featured = cars.slice(0, 3)

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                            {t("title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{t("subtitle")}</span>
                        </h2>
                        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                            {t("description")}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {featured.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CarCard car={car} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href="/cars">
                        <Button variant="outline" size="lg" className="group rounded-full px-8 py-6">
                            {t("viewAll")}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
