import { useEffect } from "react"
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom"
import Lenis from "@studio-freight/lenis"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Tickets from "./pages/Tickets"
import Contact from "./pages/Contact"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminTickets from "./pages/Admin/AdminTickets"
import AdminBookings from "./pages/Admin/AdminBookings"
import AdminMessages from "./pages/Admin/AdminMessages"
import AdminSettings from "./pages/Admin/AdminSettings"
import AdminUsers from "./pages/Admin/AdminUsers"
import AdminAuditLogs from "./pages/Admin/AdminAuditLogs"
import AdminLayout from "./components/Admin/AdminLayout"
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoute"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import Refund from "./pages/Refund"
import FAQ from "./pages/FAQ"
import Gallery from "./pages/Gallery"
import ScrollToTop from "./components/ScrollToTop"
import AuthProvider from "./context/AuthProvider"

function AdminPage({ children, roles }) {
  return (
    <ProtectedAdminRoute roles={roles}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedAdminRoute>
  )
}

function AppShell() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPage><AdminDashboard /></AdminPage>} />
        <Route path="/admin/tickets" element={<AdminPage><AdminTickets /></AdminPage>} />
        <Route path="/admin/bookings" element={<AdminPage><AdminBookings /></AdminPage>} />
        <Route path="/admin/messages" element={<AdminPage><AdminMessages /></AdminPage>} />
        <Route path="/admin/settings" element={<AdminPage roles={["super_admin", "admin"]}><AdminSettings /></AdminPage>} />
        <Route path="/admin/users" element={<AdminPage roles={["super_admin", "admin"]}><AdminUsers /></AdminPage>} />
        <Route path="/admin/audit-logs" element={<AdminPage roles={["super_admin", "admin"]}><AdminAuditLogs /></AdminPage>} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.2,
      gestureOrientation: "vertical",
      normalizeWheel: true,
      smoothWheel: true
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  )
}

export default App
