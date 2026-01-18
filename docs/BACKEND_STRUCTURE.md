# Backend Folder Structure - Quick Reference

## Visual Structure

```
rental-car-website/
│
├── 📁 app/api/                        # API Routes Directory
│   │
│   ├── 📁 bookings/
│   │   └── 📄 route.ts                # Bookings API (GET, POST)
│   │       ├── GET  → Fetch all bookings with car details
│   │       └── POST → Create new booking with price calculation
│   │
│   ├── 📁 cars/
│   │   ├── 📄 route.ts                # Cars List API (GET)
│   │   │   └── GET  → Fetch all available cars
│   │   │
│   │   └── 📁 [id]/
│   │       └── 📄 route.ts            # Single Car API (GET)
│   │           └── GET  → Fetch specific car by ID
│   │
│   └── 📁 services/
│       └── 📄 route.ts                # Services API (GET)
│           └── GET  → Fetch all services
│
├── 📁 lib/                            # Shared Libraries
│   ├── 📄 db.ts                       # ⭐ Database Connection (Prisma Client)
│   ├── 📄 data.ts                     # Static/Mock Data (Legacy)
│   └── 📄 utils.ts                    # Utility Functions (cn helper)
│
├── 📁 prisma/                         # Database Layer
│   ├── 📄 schema.prisma               # ⭐ Database Schema Definition
│   ├── 📄 seed.ts                     # Database Seeding Script
│   │
│   └── 📁 migrations/
│       ├── 📄 migration_lock.toml     # Migration Lock File
│       └── 📁 20260118162642_init/
│           └── 📄 migration.sql       # Initial Database Migration
│
├── 📁 src/generated/
│   └── 📁 prisma/                     # 🤖 Auto-Generated Prisma Client
│       ├── index.d.ts                 # TypeScript Definitions
│       └── index.js                   # Prisma Client Runtime
│
├── 📄 prisma.config.ts                # ⭐ Prisma 7 Configuration
├── 📄 dev.db                          # 💾 SQLite Database File
├── 📄 package.json                    # Dependencies & Scripts
└── 📄 tsconfig.json                   # TypeScript Configuration
```

---

## File Descriptions

### 🔥 Core Backend Files

| File | Purpose | Importance |
|------|---------|------------|
| `lib/db.ts` | Database connection singleton | ⭐⭐⭐ Critical |
| `prisma/schema.prisma` | Database schema | ⭐⭐⭐ Critical |
| `prisma.config.ts` | Prisma 7 config | ⭐⭐⭐ Critical |
| `app/api/*/route.ts` | API endpoints | ⭐⭐⭐ Critical |
| `prisma/seed.ts` | Database seeding | ⭐⭐ Important |
| `dev.db` | SQLite database | ⭐⭐ Important |

---

## API Routes Map

### 📍 Endpoint Overview

```
BASE_URL: http://localhost:3000/api

├── /cars
│   ├── GET    → List all cars
│   └── /[id]
│       └── GET → Get car by ID
│
├── /bookings
│   ├── GET    → List all bookings
│   └── POST   → Create booking
│
└── /services
    └── GET    → List all services
```

---

## Database Schema Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                         Car Table                            │
├─────────────────────────────────────────────────────────────┤
│ id (PK)          │ String (CUID)                            │
│ model            │ String                                   │
│ type             │ String (Luxury, SUV, Sedan, Electric)    │
│ price            │ Float (daily rate)                       │
│ image            │ String (URL)                             │
│ transmission     │ String (Automatic, Manual)               │
│ fuel             │ String (Petrol, Diesel, Electric)        │
│ seats            │ Int                                      │
│ rating           │ Float (0-5)                              │
│ createdAt        │ DateTime                                 │
│ updatedAt        │ DateTime                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Booking Table                           │
├─────────────────────────────────────────────────────────────┤
│ id (PK)          │ String (CUID)                            │
│ carId (FK)       │ String → Car.id                          │
│ customerName     │ String                                   │
│ email            │ String                                   │
│ phone            │ String                                   │
│ pickupDate       │ DateTime                                 │
│ returnDate       │ DateTime                                 │
│ pickupLocation   │ String                                   │
│ status           │ String (pending, confirmed, cancelled)   │
│ totalPrice       │ Float (calculated)                       │
│ createdAt        │ DateTime                                 │
│ updatedAt        │ DateTime                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Service Table                           │
├─────────────────────────────────────────────────────────────┤
│ id (PK)          │ String (CUID)                            │
│ title            │ String                                   │
│ description      │ String                                   │
│ icon             │ String                                   │
│ createdAt        │ DateTime                                 │
│ updatedAt        │ DateTime                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Run migrations
npx prisma db seed       # Seed database
npx prisma studio        # Open database GUI
npx prisma migrate reset # Reset database (⚠️ deletes data)

# Prisma Client Location
src/generated/prisma/    # Generated client files
```

---

## Import Patterns

### ✅ Correct Imports

```typescript
// Database connection
import { db } from "@/lib/db";

// Prisma types
import { Car, Booking, Service } from "@/src/generated/prisma";

// Next.js
import { NextResponse } from "next/server";

// Utilities
import { cn } from "@/lib/utils";
```

---

## Data Flow Diagram

```
┌──────────────┐
│   Frontend   │
│  (React)     │
└──────┬───────┘
       │ fetch()
       ▼
┌──────────────────────────────────────┐
│     API Route Handler                │
│  (app/api/*/route.ts)                │
│                                      │
│  1. Parse request                    │
│  2. Validate input                   │
│  3. Call database                    │
│  4. Format response                  │
└──────┬───────────────────────────────┘
       │ db.model.operation()
       ▼
┌──────────────────────────────────────┐
│     Database Layer                   │
│  (lib/db.ts)                         │
│                                      │
│  Prisma Client + LibSQL Adapter      │
└──────┬───────────────────────────────┘
       │ SQL queries
       ▼
┌──────────────────────────────────────┐
│     SQLite Database                  │
│  (dev.db)                            │
│                                      │
│  Tables: Car, Booking, Service       │
└──────────────────────────────────────┘
```

---

## File Size Reference

| File | Typical Size | Notes |
|------|--------------|-------|
| `lib/db.ts` | ~500 bytes | Small, singleton pattern |
| `prisma/schema.prisma` | ~1.3 KB | 3 models defined |
| `prisma/seed.ts` | ~3.5 KB | 6 cars + 4 services |
| `app/api/bookings/route.ts` | ~2.3 KB | Most complex route |
| `dev.db` | ~36 KB | Grows with data |

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | v25.3.0 |
| Framework | Next.js | 16.1.3 |
| ORM | Prisma | 7.2.0 |
| Database | SQLite | - |
| Adapter | @prisma/adapter-libsql | 7.2.0 |
| Language | TypeScript | 5.9.3 |

---

## Common Operations

### Adding a New API Route

1. Create folder: `app/api/[resource]/`
2. Create file: `route.ts`
3. Export HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
4. Import database: `import { db } from "@/lib/db"`
5. Add error handling with try-catch

### Adding a New Database Model

1. Edit `prisma/schema.prisma`
2. Add model definition
3. Run `npx prisma migrate dev --name add_model_name`
4. Run `npx prisma generate`
5. Update seed file if needed

### Modifying Existing Model

1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name update_model_name`
3. Run `npx prisma generate`
4. Update API routes if needed

---

## Security Checklist

- ✅ Input validation on all POST endpoints
- ✅ Error messages don't expose sensitive data
- ✅ Database credentials not in client code
- ✅ CORS configured properly
- ⚠️ TODO: Add authentication
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add request sanitization

---

## Performance Tips

1. **Use Prisma's `select` and `include`** to fetch only needed fields
2. **Add database indexes** for frequently queried fields
3. **Implement pagination** for large datasets
4. **Use connection pooling** in production
5. **Cache frequently accessed data** (Redis)

---

## Troubleshooting Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Build fails | `rm -rf .next && npx prisma generate && npm run build` |
| Database locked | `pkill -9 node && npm run dev` |
| Types not updating | `npx prisma generate` |
| Migration conflicts | `npx prisma migrate reset` (⚠️ deletes data) |
| Port in use | Change port in `package.json` or kill process |

---

**Last Updated:** 2026-01-18  
**For detailed documentation, see:** `BACKEND_IMPLEMENTATION.md`
