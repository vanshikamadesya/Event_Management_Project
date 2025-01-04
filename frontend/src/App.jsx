import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BookEvent from "./pages/BookEvent";
import AddEvent from "./pages/admin/AddEvent";
import Dashboard from "./pages/admin/Dashboard";
import AddVendor from "./pages/admin/AddVendor"
import AddVenue from "./pages/admin/AddVenue"
import OrderSummary from "./pages/OrderSummary";
import ViewBookings from "./pages/admin/ViewBookings";
import UserDashboard from "./pages/Dashboard";
import EventsPage from "./pages/EventsPage";
import ViewEvents from "./pages/admin/ViewEvents";
import ViewVenue from "./pages/admin/ViewVenue";
import PaymentPage from "./pages/PaymentPage";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import ViewEvent from "./pages/organizer/ViewEvent";

const App = () => {
  const location = useLocation();

  // Define routes where Navbar should be hidden
  const excludeNavbarRoutes = ["/admin/add-event","/admin/view-event","/admin/view-venue","/admin","/admin/add-venue","/admin/view-booking","/admin/add-vendor","/admin/add-venue","/organizer","/organizer/view-event"];

  return (
    <AuthProvider>
    <div>
      {/* Render Navbar only if the current route is not in the exclusion list */}
      {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-profile" element={<UserDashboard />} />
        <Route path="/book-event" element={<BookEvent />} />
        <Route path="/orders/:bookingId" element={<OrderSummary />} />
        <Route path="/payment/:bookingId" element={<PaymentPage/>} />
        <Route path="/eventPage" element={<EventsPage />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-event" element={<AddEvent />} />
        <Route path="/admin/add-vendor" element={<AddVendor />} />
        <Route path="/admin/add-venue" element={<AddVenue />} />
        <Route path="/admin/view-booking" element={<ViewBookings/>}/>
        <Route path="/admin/view-event" element={<ViewEvents/>}/>
        <Route path="/admin/view-venue" element={<ViewVenue/>}/>


        {/*Organizer Routes */}
        <Route path="/organizer" element={<OrganizerDashboard />} />
        {/* <Route path="/organizer/view-event" element={<ViewEvent />} /> */}

      </Routes>

      <Footer />
    </div>
    </AuthProvider>
  );
};

export default App;
