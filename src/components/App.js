import { Routes, Route } from "react-router-dom" 
import LandingPage from "../Pages/LandingPage";
import './App.css';

export default function App() {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/balls" element={<ProductPage />} /> */}
    </Routes>
  )
}