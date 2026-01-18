# 🚗 Rental Car Website

A modern, full-stack car rental platform built with Next.js 16, Prisma 7, and SQLite. Features a beautiful UI with dynamic animations, comprehensive booking system, and RESTful API.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Sleek design with glassmorphism and smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Built with Next.js 16 and Turbopack
- 🎭 **Framer Motion** - Smooth page transitions and micro-interactions
- 🌙 **Premium Design** - Professional aesthetics with vibrant color schemes

### Backend
- 🗄️ **SQLite Database** - Lightweight, serverless database with LibSQL adapter
- 🔒 **Type-Safe API** - Full TypeScript coverage with Prisma-generated types
- 🚀 **RESTful API** - Clean, well-documented API endpoints
- ✅ **Input Validation** - Comprehensive validation on all endpoints
- 💰 **Auto Price Calculation** - Smart booking price calculation based on duration

### Key Functionality
- 🚙 Browse available cars with detailed specifications
- 📅 Book cars with date selection and location
- 💳 Automatic price calculation based on rental duration
- 📊 View all bookings with car details
- 🛎️ Additional services (Airport Pickup, Chauffeur, etc.)
- 🗺️ Interactive location map
- 📞 Contact information and support

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.3 (App Router) |
| **Language** | TypeScript 5.9.3 |
| **Styling** | TailwindCSS 4.0 |
| **Database** | SQLite with LibSQL Adapter |
| **ORM** | Prisma 7.2.0 |
| **Animations** | Framer Motion 12.26.2 |
| **Icons** | Lucide React 0.562.0 |
| **UI Utilities** | clsx, tailwind-merge, CVA |

## 📁 Project Structure

```
rental-car-website/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── bookings/         # Booking endpoints
│   │   ├── cars/             # Car endpoints
│   │   └── services/         # Service endpoints
│   ├── (pages)/              # Page components
│   └── layout.tsx            # Root layout
├── components/               # React components
├── lib/                      # Utilities & database
│   ├── db.ts                 # Prisma client singleton
│   └── utils.ts              # Helper functions
├── prisma/                   # Database layer
│   ├── schema.prisma         # Database schema
│   ├── seed.ts               # Seed data
│   └── migrations/           # Migration history
├── docs/                     # Documentation
│   ├── BACKEND_IMPLEMENTATION.md
│   └── BACKEND_STRUCTURE.md
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: v25.3.0)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rental-car-website.git
   cd rental-car-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Seed the database with sample data
   npx prisma db seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database GUI |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma db seed` | Seed database with data |

## 🔌 API Endpoints

### Cars

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars |
| GET | `/api/cars/[id]` | Get car by ID |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| POST | `/api/bookings` | Create new booking |

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Get all services |

### Example: Create Booking

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "carId": "clx1234567890",
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "pickupDate": "2026-01-20T10:00:00.000Z",
    "returnDate": "2026-01-25T10:00:00.000Z",
    "pickupLocation": "Airport Terminal 1"
  }'
```

## 🗄️ Database Schema

### Models

- **Car** - Vehicle information (model, type, price, specs)
- **Booking** - Rental bookings with customer details
- **Service** - Additional services offered

### Relationships

- Car → Bookings (One-to-Many)

For detailed schema information, see [BACKEND_IMPLEMENTATION.md](./docs/BACKEND_IMPLEMENTATION.md)

## 📖 Documentation

- [Backend Implementation Guide](./docs/BACKEND_IMPLEMENTATION.md) - Comprehensive backend documentation
- [Backend Structure Reference](./docs/BACKEND_STRUCTURE.md) - Quick reference for folder structure

## 🎨 Features Showcase

### Home Page
- Hero section with search functionality
- Featured cars carousel
- Services overview
- Interactive location map
- Contact information

### Cars Page
- Grid view of all available cars
- Filter by type, price, transmission
- Detailed car specifications
- Real-time availability

### Booking Page
- Multi-step booking form
- Date picker for rental period
- Location selection
- Automatic price calculation
- Booking confirmation

### Individual Car Page
- Detailed car information
- High-quality images
- Specifications and features
- Direct booking option

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Node Environment
NODE_ENV="development"
```

### Prisma Configuration

Database configuration is managed in `prisma.config.ts` (Prisma 7+):

```typescript
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "file:./dev.db",
  },
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

For deployment to other platforms, ensure:
- Node.js 18+ is available
- Run `npm run build` before starting
- Set `NODE_ENV=production`
- Configure database URL for production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Unsplash for car images
- Lucide for beautiful icons

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js and Prisma**
