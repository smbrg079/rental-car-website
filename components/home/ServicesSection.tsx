"use client"

import { Plane, User, Calendar, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

// Helper to map string icon names to components
const iconMap: Record<string, React.ElementType> = {
    "Plane": Plane,
    "User": User,
    "Calendar": Calendar,
    "Briefcase": Briefcase,
}

const serviceItems = [
    { id: "airportPickup", icon: "Plane" },
    { id: "chauffeurService", icon: "User" },
    { id: "longTermRentals", icon: "Calendar" },
    { id: "corporateRentals", icon: "Briefcase" },
]

export default function ServicesSection() {
    const t = useTranslations("Services")

    return (
        <section className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
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
                    {serviceItems.map((service, index) => {
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
                                        {t(`items.${service.id}.title`)}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {t(`items.${service.id}.description`)}
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
