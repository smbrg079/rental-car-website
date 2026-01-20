"use client"

import { Button } from "@/components/ui/Button"
import { Link } from "@/i18n/routing"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function Hero() {
    const t = useTranslations("Hero")
    const taglines = t.raw("taglines") as string[]
    const [currentTagline, setCurrentTagline] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [taglines.length])

    return (
        <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
            {/* Animated Background Gradient */}
            <motion.div
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
            />

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/50 to-neutral-950" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center container mx-auto px-6 md:px-12">
                <div className="max-w-4xl">
                    {/* Animated Tagline */}
                    <div className="h-8 mb-8 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTagline}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-sm font-medium tracking-[0.3em] text-orange-400/80 uppercase"
                            >
                                {taglines[currentTagline]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-6 text-7xl md:text-9xl font-bold tracking-tight text-white leading-[0.95]"
                    >
                        {t("title")}
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                            {t("subtitle")}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-12 max-w-lg text-lg text-neutral-400 font-light"
                    >
                        {t("description")}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/cars">
                            <Button
                                size="lg"
                                className="group text-base px-8 py-6 rounded-full bg-white text-black hover:bg-neutral-100 transition-all duration-300"
                            >
                                {t("exploreFleet")}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                            </Button>
                        </Link>
                        <Link href="/booking">
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-base px-8 py-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300"
                            >
                                {t("bookNow")}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-16 grid grid-cols-3 gap-8 max-w-md"
                    >
                        <div className="text-center sm:text-left rtl:sm:text-right">
                            <div className="text-3xl font-bold text-white mb-1">50+</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-wider">{t("stats.vehicles")}</div>
                        </div>
                        <div className="text-center sm:text-left rtl:sm:text-right">
                            <div className="text-3xl font-bold text-white mb-1">24/7</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-wider">{t("stats.support")}</div>
                        </div>
                        <div className="text-center sm:text-left rtl:sm:text-right">
                            <div className="text-3xl font-bold text-white mb-1">100%</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-wider">{t("stats.insured")}</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] mb-2">{t("scroll")}</span>
                <ChevronDown className="h-5 w-5" />
            </motion.div>
        </div>
    )
}
