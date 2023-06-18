import { Routes, Route } from "react-router-dom" 
import LandingPage from "../Pages/LandingPage";
import NavBar from "./LandingPage/NavBar";
import Footer from "./LandingPage/Footer";
import BallsPage from "../Pages/BallsPage";
import './App.css';

export default function App() {
  return(
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/balls" element={<BallsPage />} />
    </Routes>
    <Footer />
    </>
  )
}