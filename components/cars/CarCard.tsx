"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Fuel, Gauge, Users, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface CarProps {
    id: string
    model: string
    type: string
    price: number
    image: string
    transmission: string
    fuel: string
    seats: number
    rating: number
}

export default function CarCard({ car }: { car: CarProps }) {
    const t = useTranslations("CarCard")

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group"
        >
            <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={car.image}
                        alt={car.model}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="flex-1 p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{car.type}</p>
                            <h3 className="text-xl font-bold">{car.model}</h3>
                        </div>
                        <div className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                            <Star className="h-3 w-3 fill-current" />
                            {car.rating}
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div className="flex flex-col items-center gap-1 rounded-md bg-secondary/50 p-2 text-center">
                            <Gauge className="h-4 w-4" />
                            <span className="text-xs">{t(`transmission.${car.transmission}`)}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded-md bg-secondary/50 p-2 text-center">
                            <Fuel className="h-4 w-4" />
                            <span className="text-xs">{t(`fuel.${car.fuel}`)}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded-md bg-secondary/50 p-2 text-center">
                            <Users className="h-4 w-4" />
                            <span className="text-xs">{car.seats}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-secondary/10 p-5">
                    <div>
                        <span className="text-xl font-bold">${car.price}</span>
                        <span className="text-sm text-muted-foreground">{t("perDay")}</span>
                    </div>
                    <Link href={`/cars/${car.id}`}>
                        <Button size="sm" className="gap-2 group/btn transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-primary/30">
                            {t("bookNow")} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:rotate-180" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
