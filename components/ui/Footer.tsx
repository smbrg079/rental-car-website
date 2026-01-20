import { Link } from "@/i18n/routing"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Footer() {
    const t = useTranslations("Footer")

    return (
        <footer className="w-full border-t bg-background py-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Rental Car</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("description")}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">{t("company")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:underline">{t("links.about")}</Link>
                            </li>
                            <li>
                                <Link href="/locations" className="hover:underline">{t("links.locations")}</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">{t("links.contact")}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">{t("services")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/services" className="hover:underline">{t("links.chauffeur")}</Link>
                            </li>
                            <li>
                                <Link href="/cars" className="hover:underline">{t("links.carListing")}</Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:underline">{t("links.corporate")}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">{t("followUs")}</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        {t("rights", { year: new Date().getFullYear() })}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <Link href="#" className="hover:underline">{t("links.privacy")}</Link>
                        <Link href="#" className="hover:underline">{t("links.terms")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
