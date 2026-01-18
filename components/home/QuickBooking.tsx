"use client"
import { Button } from "@/components/ui/Button"
import { MapPin, Calendar, Clock } from "lucide-react"

export default function QuickBooking() {
    return (
        <div className="absolute -bottom-16 left-0 w-full px-4 z-20">
            <div className="container mx-auto">
                <div className="mx-auto max-w-5xl rounded-xl bg-background p-6 shadow-2xl border">
                    <form className="grid gap-4 md:grid-cols-4 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Pick Up
                            </label>
                            <input
                                type="text"
                                placeholder="City, Airport, or Address"
                                className="w-full rounded-md border bg-secondary/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Date
                            </label>
                            <input
                                type="date"
                                className="w-full rounded-md border bg-secondary/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Time
                            </label>
                            <input
                                type="time"
                                className="w-full rounded-md border bg-secondary/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <Button size="lg" className="w-full h-[42px]">Find Car</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
