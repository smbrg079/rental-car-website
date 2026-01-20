import { cars } from "@/lib/data"
import CarCard from "@/components/cars/CarCard"
import CarFilter from "@/components/cars/CarFilter"
import { Suspense } from "react"

// We need a wrapper to extract searchParams since it's a Server Component
// But we want to filter on the server (simulated).
// Next.js 15/14 requires searchParams to be a Promise in some configs or just props.
// For now, I'll type it correctly.

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CarsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const category = params.category as string | undefined
    const fuel = params.fuel as string | undefined
    const transmission = params.transmission as string | undefined

    const filteredCars = cars.filter((car) => {
        if (category && car.type !== category) return false
        if (fuel && car.fuel !== fuel) return false
        if (transmission && car.transmission !== transmission) return false
        return true
    })

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
