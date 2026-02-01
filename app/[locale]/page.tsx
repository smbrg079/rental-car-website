import Hero from "@/components/home/Hero"
import FeaturedCars from "@/components/home/FeaturedCars"
import FleetByCategory from "@/components/home/FleetByCategory"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import ServicesSection from "@/components/home/ServicesSection"
import MapSection from "@/components/home/MapSection"
import ContactSection from "@/components/home/ContactSection"
import TrustBadges from "@/components/home/TrustBadges"
import SocialProof from "@/components/home/SocialProof"
import { getCars } from "@/lib/cars"
import { getServices } from "@/lib/services"

export default async function Home() {
  const [cars, services] = await Promise.all([getCars(), getServices()])
  const featuredCars = cars.slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCars cars={featuredCars} />
      <FleetByCategory cars={cars} />
      <TrustBadges />
      <ServicesSection services={services} />
      <WhyChooseUs />
      <SocialProof />
      <MapSection />
      <ContactSection />
    </div>
  )
}
