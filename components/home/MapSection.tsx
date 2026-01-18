"use client"

import { MapPin } from "lucide-react"

export default function MapSection() {
    return (
        <section className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Find Us</h2>
                    <p className="text-muted-foreground">
                        Conveniently located in major cities and airport terminals.
                    </p>
                </div>

                <div className="relative h-[400px] w-full overflow-hidden rounded-xl border shadow-lg bg-gray-200">
                    {/* Integrated Google Maps Embed (Using a generic location for demonstration) */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1650000000000!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>

                    {/* Overlay styled box */}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur p-4 rounded-lg shadow-lg border max-w-xs hidden md:block">
                        <h3 className="font-bold flex items-center gap-2 mb-2"><MapPin className="h-4 w-4 text-primary" /> Main Office</h3>
                        <p className="text-sm text-muted-foreground">
                            123 Premium Blvd, New York, NY 10001
                        </p>
                        <p className="text-sm font-medium mt-2">Open 9AM - 8PM</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
