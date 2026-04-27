import Hero from "../components/Hero"
import DiscoverSection from "../components/DiscoverSection"
import TrustSection from "../components/TrustSection"
import OfferSection from "../components/OfferSection"
import AboutSection from "../components/AboutSection"
import RestaurantSection from "../components/RestaurantSection"
import SuitesSection from "../components/SuitesSection"
import HallBookingSection from "../components/HallBookingSection"

function Home() {
    return (
        <main className="bg-white">
            {/* 1. Hero (includes Quick Info Bar) */}
            <Hero />
            
            {/* 2. Waterpark Attractions */}
            <DiscoverSection />
            
            {/* 3. Resort Extensions */}
            <RestaurantSection />
            <SuitesSection />
            <HallBookingSection />
            
            {/* 5. Trust & Social Proof */}
            <TrustSection />
            
            {/* 6. About */}
            <AboutSection />
        </main>
    )
}

export default Home
