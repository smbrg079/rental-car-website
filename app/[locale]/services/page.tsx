import { getServices } from "@/lib/services"
import { Plane, User, Calendar, Briefcase, MapPin, Sparkles, Shield, Package } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/Button"

const iconMap: Record<string, React.ElementType> = {
    Plane,
    User,
    Calendar,
    Briefcase,
    MapPin,
    Sparkles,
    Shield,
    Package,
}

export default async function ServicesPage() {
    const services = await getServices()

    const fallbackServices = [
        { id: "1", title: "Airport Pickup & Drop-off", description: "Meet-and-greet service at the airport terminal. We'll have your car ready and waiting.", icon: "Plane" },
        { id: "2", title: "Chauffeur Service", description: "Professional, licensed drivers for business meetings, events, or leisure.", icon: "User" },
        { id: "3", title: "Long-term Rentals", description: "Special rates for rentals of 30+ days. Save up to 25% on monthly contracts.", icon: "Calendar" },
        { id: "4", title: "Corporate Fleet", description: "Managed fleet solutions for businesses with volume discounts.", icon: "Briefcase" },
        { id: "5", title: "One-Way Rentals", description: "Pick up in one city and drop off in another. No return trip needed.", icon: "MapPin" },
        { id: "6", title: "Luxury & Sports Cars", description: "Premium vehicles for special occasions. Mercedes, BMW, Porsche, and more.", icon: "Sparkles" },
        { id: "7", title: "Roadside Assistance", description: "24/7 breakdown cover included with every rental. No extra cost.", icon: "Shield" },
        { id: "8", title: "Child Seats & Extras", description: "Add child seats, GPS, roof racks, or additional drivers at booking.", icon: "Package" },
    ]

    const items = services.length > 0 ? services : fallbackServices

    return (
        <div className="min-h-screen">
            <section className="bg-neutral-50 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Services</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Everything you need for a seamless rental. From airport meet-and-greet to 24/7 roadside assistance.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {items.map((service) => {
                    const Icon = iconMap[service.icon] || User
                    return (
                        <article
                            key={service.id}
                            className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg hover:border-orange-200"
                        >
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="h-7 w-7" />
                            </div>
                            <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                            <p className="text-muted-foreground mb-6">{service.description}</p>
                            <Link href="/booking">
                                <Button variant="outline" size="sm">Book Now</Button>
                            </Link>
                        </article>
                    )
                })}
            </div>

            <section className="mt-20 py-16 rounded-2xl bg-neutral-50 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to hit the road?</h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                    Browse our full fleet of luxury cars, SUVs, sedans, and electric vehicles.
                </p>
                <Link href="/cars">
                    <Button size="lg" className="rounded-full px-8">Browse Our Fleet</Button>
                </Link>
            </section>
            </div>
        </div>
    )
}
