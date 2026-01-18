# Backend Implementation Documentation
## Rental Car Website

**Version:** 1.0.0  
**Last Updated:** 2026-01-18  
**Tech Stack:** Next.js 16.1.3, Prisma 7.2.0, SQLite with LibSQL Adapter

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Folder Structure](#folder-structure)
3. [Database Layer](#database-layer)
4. [API Routes](#api-routes)
5. [Configuration Files](#configuration-files)
6. [Data Models](#data-models)
7. [Development Workflow](#development-workflow)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The backend follows a **serverless API architecture** using Next.js App Router with the following key components:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              API Routes (/app/api/*)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Bookings   │  │     Cars     │  │   Services   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Database Layer (lib/db.ts)                  │
│         Prisma Client + LibSQL Adapter                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              SQLite Database (dev.db)                    │
│         Tables: Car, Booking, Service                    │
└─────────────────────────────────────────────────────────┘
```

### Key Design Principles

- **Separation of Concerns:** API routes handle HTTP logic, database layer manages data access
- **Type Safety:** Full TypeScript coverage with Prisma-generated types
- **Error Handling:** Comprehensive try-catch blocks with meaningful error messages
- **Validation:** Input validation at the API route level
- **Scalability:** Singleton pattern for database connection to prevent connection exhaustion

---

## Folder Structure

```
rental-car-website/
│
├── app/
│   └── api/                          # API Routes (Next.js App Router)
│       ├── bookings/
│       │   └── route.ts              # Booking endpoints (GET, POST)
│       ├── cars/
│       │   ├── route.ts              # Cars list endpoint (GET)
│       │   └── [id]/
│       │       └── route.ts          # Single car endpoint (GET)
│       └── services/
│           └── route.ts              # Services endpoint (GET)
│
├── lib/                              # Shared utilities and configurations
│   ├── db.ts                         # Database connection (Prisma Client)
│   ├── data.ts                       # Static data/mock data (legacy)
│   └── utils.ts                      # Utility functions (cn helper)
│
├── prisma/                           # Database schema and migrations
│   ├── schema.prisma                 # Database schema definition
│   ├── seed.ts                       # Database seeding script
│   └── migrations/                   # Migration history
│       ├── migration_lock.toml       # Migration lock file
│       └── 20260118162642_init/
│           └── migration.sql         # Initial migration
│
├── src/
│   └── generated/
│       └── prisma/                   # Auto-generated Prisma Client
│
├── prisma.config.ts                  # Prisma 7 configuration
├── dev.db                            # SQLite database file
└── package.json                      # Dependencies and scripts
```

---

## Database Layer

### File: `lib/db.ts`

**Purpose:** Centralized database connection management using Prisma Client with LibSQL adapter.

```typescript
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
    url: "file:./dev.db",
});

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

#### Key Features:

1. **Singleton Pattern:** Prevents multiple Prisma Client instances in development
2. **LibSQL Adapter:** Enables SQLite compatibility with enhanced features
3. **Global Caching:** Reuses connection across hot reloads in development
4. **Production Ready:** Conditional caching based on environment

#### Why LibSQL Adapter?

- Better performance for serverless environments
- Compatible with Turso (cloud SQLite)
- Easy migration path from local to cloud database
- Supports embedded replicas for edge deployments

---

## API Routes

### Overview

All API routes follow RESTful conventions and return JSON responses.

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/cars` | GET | List all cars | - | `Car[]` |
| `/api/cars/[id]` | GET | Get single car | - | `Car` |
| `/api/bookings` | GET | List all bookings | - | `Booking[]` |
| `/api/bookings` | POST | Create booking | `BookingInput` | `Booking` |
| `/api/services` | GET | List all services | - | `Service[]` |

---

### 1. Cars API

#### **GET /api/cars**

**File:** `app/api/cars/route.ts`

**Purpose:** Retrieve all available cars for rental.

```typescript
export async function GET() {
    try {
        const cars = await db.car.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json(
            { error: "Failed to fetch cars" },
            { status: 500 }
        );
    }
}
```

**Response Example:**
```json
[
    {
        "id": "clx1234567890",
        "model": "Mercedes-Benz C-Class",
        "type": "Luxury",
        "price": 150,
        "image": "https://...",
        "transmission": "Automatic",
        "fuel": "Petrol",
        "seats": 5,
        "rating": 4.8,
        "createdAt": "2026-01-18T16:26:42.000Z",
        "updatedAt": "2026-01-18T16:26:42.000Z"
    }
]
```

---

#### **GET /api/cars/[id]**

**File:** `app/api/cars/[id]/route.ts`

**Purpose:** Retrieve a specific car by ID.

```typescript
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const car = await db.car.findUnique({
            where: { id },
        });

        if (!car) {
            return NextResponse.json(
                { error: "Car not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json(
            { error: "Failed to fetch car" },
            { status: 500 }
        );
    }
}
```

**Features:**
- Dynamic route parameter handling (Next.js 15+ async params)
- 404 error handling for non-existent cars
- Type-safe parameter extraction

---

### 2. Bookings API

#### **GET /api/bookings**

**File:** `app/api/bookings/route.ts`

**Purpose:** Retrieve all bookings with associated car details.

```typescript
export async function GET() {
    try {
        const bookings = await db.booking.findMany({
            include: { car: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
```

**Response Example:**
```json
[
    {
        "id": "clx9876543210",
        "carId": "clx1234567890",
        "customerName": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "pickupDate": "2026-01-20T10:00:00.000Z",
        "returnDate": "2026-01-25T10:00:00.000Z",
        "pickupLocation": "Airport Terminal 1",
        "status": "pending",
        "totalPrice": 750,
        "car": {
            "id": "clx1234567890",
            "model": "Mercedes-Benz C-Class",
            ...
        }
    }
]
```

---

#### **POST /api/bookings**

**Purpose:** Create a new booking with automatic price calculation.

**Request Body:**
```json
{
    "carId": "clx1234567890",
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "pickupDate": "2026-01-20T10:00:00.000Z",
    "returnDate": "2026-01-25T10:00:00.000Z",
    "pickupLocation": "Airport Terminal 1"
}
```

**Implementation:**
```typescript
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { carId, customerName, email, phone, pickupDate, returnDate, pickupLocation } = body;

        // Validation
        if (!carId || !customerName || !email || !phone || !pickupDate || !returnDate || !pickupLocation) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find car and verify existence
        const car = await db.car.findUnique({
            where: { id: carId },
        });

        if (!car) {
            return NextResponse.json(
                { error: "Car not found" },
                { status: 404 }
            );
        }

        // Calculate total price
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const days = Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = days * car.price;

        // Create booking
        const booking = await db.booking.create({
            data: {
                carId,
                customerName,
                email,
                phone,
                pickupDate: pickup,
                returnDate: returnD,
                pickupLocation,
                totalPrice,
                status: "pending",
            },
            include: { car: true },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}
```

**Features:**
- ✅ Required field validation
- ✅ Car existence verification
- ✅ Automatic price calculation based on rental duration
- ✅ Returns booking with car details
- ✅ Proper HTTP status codes (201 for creation)

---

### 3. Services API

#### **GET /api/services**

**File:** `app/api/services/route.ts`

**Purpose:** Retrieve all available services.

```typescript
export async function GET() {
    try {
        const services = await db.service.findMany({
            orderBy: { createdAt: "asc" },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}
```

---

## Configuration Files

### 1. `prisma.config.ts`

**Purpose:** Prisma 7 configuration file (replaces environment variables in schema).

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "file:./dev.db",
  },
});
```

**Key Points:**
- Required for Prisma 7+
- Defines database URL (no longer in schema.prisma)
- Configures migration path
- Loads environment variables via dotenv

---

### 2. `prisma/schema.prisma`

**Purpose:** Database schema definition.

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
}

model Car {
  id           String    @id @default(cuid())
  model        String
  type         String
  price        Float
  image        String
  transmission String
  fuel         String
  seats        Int
  rating       Float
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  bookings     Booking[]
}

model Booking {
  id             String   @id @default(cuid())
  carId          String
  car            Car      @relation(fields: [carId], references: [id])
  customerName   String
  email          String
  phone          String
  pickupDate     DateTime
  returnDate     DateTime
  pickupLocation String
  status         String   @default("pending")
  totalPrice     Float
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  title       String
  description String
  icon        String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Schema Features:**
- ✅ Custom output path for generated client
- ✅ CUID for unique IDs (collision-resistant)
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ Relational integrity (Car ↔ Booking)
- ✅ Default values for status fields

---

## Data Models

### Car Model

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier | Primary Key, CUID |
| `model` | String | Car model name | Required |
| `type` | String | Car category | Required (e.g., "Luxury", "SUV") |
| `price` | Float | Daily rental price | Required |
| `image` | String | Car image URL | Required |
| `transmission` | String | Transmission type | Required |
| `fuel` | String | Fuel type | Required |
| `seats` | Int | Number of seats | Required |
| `rating` | Float | Customer rating | Required (0-5) |
| `createdAt` | DateTime | Creation timestamp | Auto-generated |
| `updatedAt` | DateTime | Last update timestamp | Auto-updated |
| `bookings` | Booking[] | Related bookings | Relation |

---

### Booking Model

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier | Primary Key, CUID |
| `carId` | String | Associated car ID | Foreign Key → Car.id |
| `car` | Car | Car object | Relation |
| `customerName` | String | Customer full name | Required |
| `email` | String | Customer email | Required |
| `phone` | String | Customer phone | Required |
| `pickupDate` | DateTime | Rental start date | Required |
| `returnDate` | DateTime | Rental end date | Required |
| `pickupLocation` | String | Pickup location | Required |
| `status` | String | Booking status | Default: "pending" |
| `totalPrice` | Float | Total rental cost | Calculated |
| `createdAt` | DateTime | Creation timestamp | Auto-generated |
| `updatedAt` | DateTime | Last update timestamp | Auto-updated |

**Status Values:**
- `pending` - Awaiting confirmation
- `confirmed` - Booking confirmed
- `cancelled` - Booking cancelled
- `completed` - Rental completed

---

### Service Model

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier | Primary Key, CUID |
| `title` | String | Service name | Required |
| `description` | String | Service description | Required |
| `icon` | String | Icon identifier | Required |
| `createdAt` | DateTime | Creation timestamp | Auto-generated |
| `updatedAt` | DateTime | Last update timestamp | Auto-updated |

---

## Development Workflow

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Run migrations
npx prisma migrate dev

# 4. Seed database (optional)
npx prisma db seed
```

### Database Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed database with initial data
npx prisma db seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Development Server

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Best Practices

### 1. Database Connection

✅ **DO:**
- Use the singleton pattern from `lib/db.ts`
- Import `db` from `@/lib/db` in all API routes
- Close connections gracefully in scripts

❌ **DON'T:**
- Create new PrismaClient instances in API routes
- Use direct database queries without Prisma
- Expose database credentials in client-side code

### 2. Error Handling

✅ **DO:**
```typescript
try {
    const data = await db.model.findMany();
    return NextResponse.json(data);
} catch (error) {
    console.error("Descriptive error message:", error);
    return NextResponse.json(
        { error: "User-friendly message" },
        { status: 500 }
    );
}
```

❌ **DON'T:**
```typescript
// No error handling
const data = await db.model.findMany();
return NextResponse.json(data);
```

### 3. Input Validation

✅ **DO:**
```typescript
const { field1, field2 } = await request.json();

if (!field1 || !field2) {
    return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
    );
}
```

### 4. Type Safety

✅ **DO:**
- Use Prisma-generated types
- Define custom types for request/response bodies
- Enable strict TypeScript mode

### 5. API Response Codes

| Code | Usage |
|------|-------|
| 200 | Successful GET request |
| 201 | Successful POST (resource created) |
| 400 | Bad request (validation error) |
| 404 | Resource not found |
| 500 | Server error |

---

## Troubleshooting

### Issue: "PrismaLibSQL doesn't exist"

**Solution:** Use `PrismaLibSql` (lowercase 'ql')
```typescript
import { PrismaLibSql } from "@prisma/adapter-libsql";
```

### Issue: "datasource property `url` is no longer supported"

**Solution:** Move URL to `prisma.config.ts` (Prisma 7+)
```typescript
// prisma.config.ts
datasource: {
    url: "file:./dev.db",
}
```

### Issue: Build fails with Turbopack errors

**Solution:**
1. Delete `.next` folder
2. Run `npx prisma generate`
3. Run `npm run build`

### Issue: Database locked

**Solution:**
```bash
# Kill all node processes
pkill -9 node

# Restart dev server
npm run dev
```

### Issue: Migration conflicts

**Solution:**
```bash
# Reset database (WARNING: deletes data)
npx prisma migrate reset

# Or create a new migration
npx prisma migrate dev --name fix_conflict
```

---

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
# Database
DATABASE_URL="file:./dev.db"

# Node Environment
NODE_ENV="development"

# Optional: For production with Turso
# TURSO_DATABASE_URL="libsql://your-database.turso.io"
# TURSO_AUTH_TOKEN="your-auth-token"
```

---

## Future Enhancements

### Recommended Additions

1. **Authentication & Authorization**
   - Add user authentication (NextAuth.js)
   - Implement role-based access control
   - Secure admin endpoints

2. **Advanced Features**
   - Car availability checking
   - Payment integration (Stripe)
   - Email notifications (Resend/SendGrid)
   - File upload for car images

3. **Performance Optimization**
   - Implement caching (Redis)
   - Add pagination for large datasets
   - Database indexing for frequently queried fields

4. **Testing**
   - Unit tests for API routes (Jest)
   - Integration tests (Playwright)
   - Database seeding for test environments

5. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Vercel Analytics)
   - Database performance monitoring

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [LibSQL Adapter](https://www.prisma.io/docs/orm/overview/databases/turso)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Document Maintained By:** Development Team  
**For Questions:** Refer to project README or create an issue
