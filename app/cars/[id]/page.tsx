import { cars } from "@/lib/data"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Fuel, Gauge, Users, Star, ArrowLeft, Check, Share2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function CarDetailsPage({ params }: PageProps) {
    const { id } = await params
    const car = cars.find((c) => c.id === id)

    if (!car) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <Link href="/cars" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to Fleet
            </Link>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Images */}
                <div className="space-y-4 lg:col-span-2">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                        <Image
                            src={car.image}
                            alt={car.model}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Thumbnail placeholder */}
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative aspect-video cursor-pointer overflow-hidden rounded-lg opacity-75 hover:opacity-100 ring-2 ring-transparent hover:ring-primary">
                                <Image
                                    src={car.image}
                                    alt={`View ${i}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details & Booking */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium text-primary">{car.type}</p>
                                <h1 className="text-3xl font-bold">{car.model}</h1>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{car.rating}</span>
                            <span className="text-muted-foreground">(120+ reviews)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 rounded-xl bg-secondary/20 p-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Gauge className="h-5 w-5 text-primary" />
                            <span className="text-xs font-medium uppercase text-muted-foreground">Transmission</span>
                            <span className="text-sm font-semibold">{car.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Fuel className="h-5 w-5 text-primary" />
                            <span className="text-xs font-medium uppercase text-muted-foreground">Fuel Type</span>
                            <span className="text-sm font-semibold">{car.fuel}</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="text-xs font-medium uppercase text-muted-foreground">Capacity</span>
                            <span className="text-sm font-semibold">{car.seats} People</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Rental Includes:</h3>
                        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {["Insurance Included", "24/7 Roadside Assist", "Free Cancellation", "Clean Interior"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-green-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Card className="border-primary/10 bg-primary/5 shadow-none">
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Daily Rate</p>
                                <p className="text-3xl font-bold">${car.price}</p>
                            </div>
                            <Link href={`/booking?minDate=2024-05-15`}>
                                <Button size="lg" className="px-8">Rent Now</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
