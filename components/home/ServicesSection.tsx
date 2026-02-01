"use client"

import { Plane, User, Calendar, Briefcase, MapPin, Sparkles, Shield, Package } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ElementType> = {
    Plane, User, Calendar, Briefcase, MapPin, Sparkles, Shield, Package,
}

type Service = { id: string; title: string; description: string; icon: string }

export default function ServicesSection({ services }: { services: Service[] }) {
    const t = useTranslations("Services")

    const fallbackItems = [
        { id: "airportPickup", icon: "Plane", title: t("items.airportPickup.title"), description: t("items.airportPickup.description") },
        { id: "chauffeurService", icon: "User", title: t("items.chauffeurService.title"), description: t("items.chauffeurService.description") },
        { id: "longTermRentals", icon: "Calendar", title: t("items.longTermRentals.title"), description: t("items.longTermRentals.description") },
        { id: "corporateRentals", icon: "Briefcase", title: t("items.corporateRentals.title"), description: t("items.corporateRentals.description") },
    ]

    const items = services.length > 0
        ? services.map((s) => ({ id: s.id, title: s.title, description: s.description, icon: s.icon }))
        : fallbackItems

    return (
        <section className="py-24 bg-neutral-50" aria-labelledby="services-heading">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    id="services-heading"
                    className="text-center mb-16"
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

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((service, index) => {
                        const Icon = iconMap[service.icon] || User
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="group"
                            >
                                <div className="h-full p-8 bg-white rounded-2xl border border-neutral-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-neutral-900">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
