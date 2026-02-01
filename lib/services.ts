import { db } from "@/lib/db";

export async function getServices() {
    return db.service.findMany({
        orderBy: { createdAt: "asc" },
    });
}
