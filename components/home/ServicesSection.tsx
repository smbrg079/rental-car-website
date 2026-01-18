"use client"

import { services } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Plane, User, Calendar, Briefcase, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

// Helper to map string icon names to components
const iconMap: Record<string, React.ElementType> = {
    "Plane": Plane,
    "User": User,
    "Calendar": Calendar,
    "Briefcase": Briefcase,
}

// Gradient colors for each service
const gradients = [
    "from-violet-500 to-purple-600",
    "from-cyan-500 to-blue-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
]

export default function ServicesSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        Premium Services
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                        Our Premium Services
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Tailored solutions for every travel need, from airport transfers to corporate fleets.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon] || User
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group"
                            >
                                <Card className="h-full border border-white/10 shadow-lg bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-500 relative overflow-hidden">
                                    {/* Decorative gradient line at top */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index]} opacity-70 group-hover:opacity-100 transition-opacity`} />

                                    {/* Animated background glow */}
                                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full`} />

                                    <CardHeader className="relative z-10">
                                        <motion.div
                                            className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg`}
                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Icon className="h-7 w-7" />
                                        </motion.div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative z-10">
                                        <CardDescription className="text-base text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </CardDescription>

                                        {/* Learn more link */}
                                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            <span>Learn more</span>
                                            <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
