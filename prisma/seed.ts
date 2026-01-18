import { PrismaClient } from "../src/generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
    url: "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const cars = [
    {
        model: "Mercedes-Benz C-Class",
        type: "Luxury",
        price: 150,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: 5,
        rating: 4.8,
    },
    {
        model: "BMW X5",
        type: "SUV",
        price: 200,
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574&auto=format&fit=crop",
        transmission: "Automatic",
        fuel: "Diesel",
        seats: 7,
        rating: 4.9,
    },
    {
        model: "Tesla Model 3",
        type: "Electric",
        price: 120,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2671&auto=format&fit=crop",
        transmission: "Automatic",
        fuel: "Electric",
        seats: 5,
        rating: 4.7,
    },
    {
        model: "Audi A4",
        type: "Sedan",
        price: 130,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2574&auto=format&fit=crop",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: 5,
        rating: 4.6,
    },
    {
        model: "Range Rover Sport",
        type: "SUV",
        price: 250,
        image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2574&auto=format&fit=crop",
        transmission: "Automatic",
        fuel: "Diesel",
        seats: 5,
        rating: 4.9,
    },
    {
        model: "Porsche 911 Carrera",
        type: "Luxury",
        price: 500,
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: 2,
        rating: 5.0,
    }
];

const services = [
    {
        title: "Airport Pickup",
        description: "Seamless transfers from the airport to your destination.",
        icon: "Plane",
    },
    {
        title: "Chauffeur Service",
        description: "Professional drivers for a relaxing journey.",
        icon: "User",
    },
    {
        title: "Long-term Rentals",
        description: "Better rates for rentals exceeding 30 days.",
        icon: "Calendar",
    },
    {
        title: "Corporate Rentals",
        description: "Tailored solutions for business travel needs.",
        icon: "Briefcase",
    },
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
