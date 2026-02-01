import { db } from "@/lib/db";

export type CarFilters = {
    category?: string;
    fuel?: string;
    transmission?: string;
};

export async function getCars(filters?: CarFilters) {
    return db.car.findMany({
        where: {
            ...(filters?.category && { type: filters.category }),
            ...(filters?.fuel && { fuel: filters.fuel }),
            ...(filters?.transmission && { transmission: filters.transmission }),
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getCarById(id: string) {
    return db.car.findUnique({
        where: { id },
    });
}
