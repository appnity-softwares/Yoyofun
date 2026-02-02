import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import DiscoverSection from "./components/DiscoverSection"
import HowItWorks from "./components/HowItWorks"
import AboutSection from "./components/AboutSection"
// import ScrollFloat from "./components/ScrollFloat"
import FacilitiesSection from "./components/FacilitiesSection"
import TrustSection from "./components/TrustSection"
import Footer from "./components/Footer"

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <DiscoverSection/>
      {/* <ScrollFloat/> */}
      <AboutSection/>
      <HowItWorks />
      <FacilitiesSection/>
      <TrustSection/>
      <Footer/>
    </>
  )
}

export default App
