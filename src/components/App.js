import { Routes, Route } from "react-router-dom" 
import LandingPage from "../Pages/LandingPage";
import NavBar from "./LandingPage/NavBar";
import Footer from "./LandingPage/Footer";
import BallsPage from "../Pages/BallsPage";
import ContactsPage from "../Pages/ContactPage";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import './App.css';

export default function App() {
  return(
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/balls" element={<BallsPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
    </Routes>
    <Footer />
    </>
  )
}