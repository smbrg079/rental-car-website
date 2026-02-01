import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cars = [
    { model: "Mercedes-Benz C-Class", type: "Luxury", price: 150, image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop", transmission: "Automatic", fuel: "Petrol", seats: 5, rating: 4.8 },
    { model: "BMW X5", type: "SUV", price: 200, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574&auto=format&fit=crop", transmission: "Automatic", fuel: "Diesel", seats: 7, rating: 4.9 },
    { model: "Tesla Model 3", type: "Electric", price: 120, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2671&auto=format&fit=crop", transmission: "Automatic", fuel: "Electric", seats: 5, rating: 4.7 },
    { model: "Audi A4", type: "Sedan", price: 130, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2574&auto=format&fit=crop", transmission: "Automatic", fuel: "Petrol", seats: 5, rating: 4.6 },
    { model: "Range Rover Sport", type: "SUV", price: 250, image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2574&auto=format&fit=crop", transmission: "Automatic", fuel: "Diesel", seats: 5, rating: 4.9 },
    { model: "Porsche 911 Carrera", type: "Luxury", price: 500, image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop", transmission: "Automatic", fuel: "Petrol", seats: 2, rating: 5.0 },
    { model: "Volkswagen Golf GTI", type: "Sedan", price: 85, image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2670&auto=format&fit=crop", transmission: "Manual", fuel: "Petrol", seats: 5, rating: 4.5 },
    { model: "Jeep Wrangler", type: "SUV", price: 175, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2671&auto=format&fit=crop", transmission: "Automatic", fuel: "Petrol", seats: 5, rating: 4.7 },
    { model: "BMW 3 Series", type: "Sedan", price: 140, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670&auto=format&fit=crop", transmission: "Automatic", fuel: "Petrol", seats: 5, rating: 4.8 },
    { model: "Mercedes EQS", type: "Electric", price: 280, image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop", transmission: "Automatic", fuel: "Electric", seats: 5, rating: 4.9 },
    { model: "Land Rover Defender", type: "SUV", price: 295, image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2574&auto=format&fit=crop", transmission: "Automatic", fuel: "Diesel", seats: 7, rating: 4.9 },
    { model: "Audi e-tron GT", type: "Electric", price: 320, image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2670&auto=format&fit=crop", transmission: "Automatic", fuel: "Electric", seats: 5, rating: 5.0 },
];

const services = [
    { title: "Airport Pickup & Drop-off", description: "Meet-and-greet service at the airport terminal. We'll have your car ready and waiting so you can hit the road immediately. Available 24/7 at all major airports.", icon: "Plane" },
    { title: "Chauffeur Service", description: "Professional, licensed drivers for business meetings, events, or leisure. Relax in the back seat while we handle the traffic. Hourly or full-day packages available.", icon: "User" },
    { title: "Long-term Rentals", description: "Special rates for rentals of 30+ days. Perfect for relocations, projects, or extended travel. Save up to 25% on monthly contracts with free maintenance included.", icon: "Calendar" },
    { title: "Corporate Fleet", description: "Managed fleet solutions for businesses. Volume discounts, dedicated account manager, and centralized billing. Ideal for sales teams, executives, and project-based needs.", icon: "Briefcase" },
    { title: "One-Way Rentals", description: "Pick up in one city and drop off in another. No return trip needed. Available across our network of 50+ locations. Ideal for road trips and relocations.", icon: "MapPin" },
    { title: "Luxury & Sports Cars", description: "Premium vehicles for special occasions. Weddings, anniversaries, or simply treating yourself. Our luxury fleet includes Mercedes, BMW, Porsche, and more.", icon: "Sparkles" },
    { title: "Roadside Assistance", description: "24/7 breakdown cover included with every rental. Flat tire, battery jump, or lockout—we'll get you back on the road. No extra cost.", icon: "Shield" },
    { title: "Child Seats & Extras", description: "Add child seats, GPS, roof racks, or additional drivers at booking. All equipment is professionally installed and meets safety standards.", icon: "Package" },
];

async function main() {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await prisma.booking.deleteMany();
    await prisma.car.deleteMany();
    await prisma.service.deleteMany();

    // Seed cars
    for (const car of cars) {
        await prisma.car.create({
            data: car,
        });
    }
    console.log(`✅ Created ${cars.length} cars`);

    // Seed services
    for (const service of services) {
        await prisma.service.create({
            data: service,
        });
    }
    console.log(`✅ Created ${services.length} services`);

    console.log("🎉 Database seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
