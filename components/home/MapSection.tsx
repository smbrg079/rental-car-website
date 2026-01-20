"use client"

import { MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function MapSection() {
    const t = useTranslations("Map")

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

                <motion.div
                    className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1650000000000!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                    ></iframe>

                    {/* Overlay styled box */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-neutral-200 max-w-xs hidden md:block rtl:right-auto rtl:left-6">
                        <h3 className="font-bold flex items-center gap-2 mb-3 text-neutral-900">
                            <div className="p-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg">
                                <MapPin className="h-4 w-4 text-white" />
                            </div>
                            {t("office.title")}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3 whitespace-pre-line">
                            {t("office.address")}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">{t("office.hours")}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
