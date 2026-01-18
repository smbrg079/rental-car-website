"use client"

import { Button } from "@/components/ui/Button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const categories = ["Luxury", "SUV", "Electric", "Sedan"]
const fuels = ["Petrol", "Diesel", "Electric"]
const transmissions = ["Automatic", "Manual"]

export default function CarFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"))
    const [selectedFuel, setSelectedFuel] = useState<string | null>(searchParams.get("fuel"))
    const [selectedTrans, setSelectedTrans] = useState<string | null>(searchParams.get("transmission"))

    const handleFilter = () => {
        const params = new URLSearchParams()
        if (selectedCategory) params.set("category", selectedCategory)
        if (selectedFuel) params.set("fuel", selectedFuel)
        if (selectedTrans) params.set("transmission", selectedTrans)

        router.push(`/cars?${params.toString()}`)
    }

    const clearFilters = () => {
        setSelectedCategory(null)
        setSelectedFuel(null)
        setSelectedTrans(null)
        router.push("/cars")
    }

    return (
        <div className="space-y-6 rounded-lg border p-6 bg-card text-card-foreground shadow-sm">
            <div>
                <h3 className="text-lg font-semibold mb-3">Car Type</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                        <Button
                            key={c}
                            variant={selectedCategory === c ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
                        >
                            {c}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Fuel</h3>
                <div className="flex flex-wrap gap-2">
                    {fuels.map((f) => (
                        <Button
                            key={f}
                            variant={selectedFuel === f ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedFuel(selectedFuel === f ? null : f)}
                        >
                            {f}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Transmission</h3>
                <div className="flex flex-wrap gap-2">
                    {transmissions.map((t) => (
                        <Button
                            key={t}
                            variant={selectedTrans === t ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTrans(selectedTrans === t ? null : t)}
                        >
                            {t}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 pt-4">
                <Button className="flex-1" onClick={handleFilter}>Apply</Button>
                <Button variant="outline" onClick={clearFilters}>Reset</Button>
            </div>
        </div>
    )
}
