"use client"

import { Button } from "@/components/ui/Button"
import { Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function ContactSection() {
    const t = useTranslations("Contact")

    return (
        <section className="py-24 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-500 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left rtl:md:text-right"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t("title")}</h2>
                        <p className="text-white/90 max-w-xl text-lg">
                            {t("description")}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white border-none gap-2 px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                            <MessageCircle className="h-5 w-5" />
                            {t("whatsapp")}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-orange-600 gap-2 px-8 py-6 rounded-full transition-all"
                            onClick={() => window.open("tel:+15551234567")}
                        >
                            <Phone className="h-5 w-5 rtl:rotate-[260deg]" />
                            +1 (555) 123-4567
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
