"use client"

import { ShieldCheck, Clock, MapPin, Headphones } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const featureKeys = [
    { id: "licensed", icon: ShieldCheck },
    { id: "support", icon: Clock },
    { id: "locations", icon: MapPin },
    { id: "cancellation", icon: Headphones },
]

export default function WhyChooseUs() {
    const t = useTranslations("WhyChooseUs")

    return (
        <section className="py-24 bg-white">
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

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {featureKeys.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="mb-6 p-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl text-white">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-neutral-900">{t(`features.${feature.id}.title`)}</h3>
                            <p className="text-neutral-600">{t(`features.${feature.id}.description`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
