import CarCard from "@/components/cars/CarCard"
import CarFilter from "@/components/cars/CarFilter"
import { getCars } from "@/lib/cars"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Fleet - Luxury Cars for Rent",
    description: "Browse our premium fleet of luxury cars, SUVs, and electric vehicles. Filter by type, fuel, and transmission. Best prices guaranteed.",
}

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CarsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const category = params.category as string | undefined
    const fuel = params.fuel as string | undefined
    const transmission = params.transmission as string | undefined

    const filteredCars = await getCars({ category, fuel, transmission })

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Our Fleet</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <Suspense fallback={<div>Loading filters...</div>}>
                        <CarFilter />
                    </Suspense>
                </div>

                <div className="lg:col-span-3">
                    {filteredCars.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredCars.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                            <p>No cars found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
