import Hero from "@/components/home/Hero"
import FeaturedCars from "@/components/home/FeaturedCars"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import ServicesSection from "@/components/home/ServicesSection"
import MapSection from "@/components/home/MapSection"
import ContactSection from "@/components/home/ContactSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      {/* Add spacing to compensate for absolute positioned QuickBooking */}
      <div className="mt-20 md:mt-24"></div>
      <FeaturedCars />
      <ServicesSection />
      <WhyChooseUs />
      <MapSection />
      <ContactSection />
    </div>
  )
}
