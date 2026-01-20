"use client"

import * as React from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { Menu, X, Car, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLangOpen, setIsLangOpen] = React.useState(false)
    const pathname = usePathname()
    const t = useTranslations("Navbar")
    const locale = useLocale()
    const router = useRouter()

    const navItems = [
        { name: t("home"), href: "/" },
        { name: t("cars"), href: "/cars" },
        { name: t("services"), href: "/services" },
        { name: t("locations"), href: "/locations" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
    ]

    const languages = [
        { code: "en", name: "English" },
        { code: "fr", name: "Français" },
        { code: "ar", name: "العربية" },
        { code: "de", name: "Deutsch" },
    ]

    const handleLanguageChange = (langCode: string) => {
        setIsLangOpen(false)
        router.replace(pathname, { locale: langCode })
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Car className="h-6 w-6" />
                            <span className="text-xl font-bold tracking-tight">RentalCar</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex md:items-center md:gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                                <span className="uppercase">{locale}</span>
                                <ChevronDown className={cn("h-3 w-3 transition-transform", isLangOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-32 rounded-xl border bg-background p-1 shadow-xl"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={cn(
                                                    "w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-muted transition-colors",
                                                    locale === lang.code ? "bg-muted font-semibold text-primary" : "text-muted-foreground"
                                                )}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/booking">
                                <Button>{t("bookNow")}</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        {/* Mobile Language Icon */}
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="p-2 text-muted-foreground hover:text-foreground"
                        >
                            <Globe className="h-5 w-5" />
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Language Menu */}
            <AnimatePresence>
                {isLangOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b bg-muted/50 w-full overflow-hidden md:hidden"
                    >
                        <div className="container mx-auto px-4 py-2 grid grid-cols-2 gap-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={cn(
                                        "px-4 py-3 text-sm rounded-xl text-center transition-all",
                                        locale === lang.code ? "bg-primary text-white" : "bg-background text-muted-foreground"
                                    )}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b bg-background w-full md:hidden overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block text-sm font-medium transition-colors hover:text-primary",
                                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link href="/booking" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">{t("bookNow")}</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
