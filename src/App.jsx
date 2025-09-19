import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'
import Speakers from './pages/Speakers'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Address from './pages/Address';
import Headphones from './pages/Headphones';
import Soundbars from './pages/Soundbars';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import All from './pages/All';
import Contactus from './pages/contactus';
import FAQ from './pages/FAQ';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/Admin" element={<Admin />} />
        <Route path="/pages/Contactus" element={<Contactus />} />
        <Route path="/pages/AboutUs" element={<AboutUs />} />
        <Route path="/pages/FAQ" element={<FAQ />} />
        <Route path="/pages/All" element={<All />} />
        <Route path="/pages/Speakers" element={<Speakers />} />
        <Route path="/pages/Address" element={<Address />} />
        <Route path="/pages/Headphones" element={<Headphones />} />
        <Route path="/pages/Soundbars" element={<Soundbars />} />
        <Route path="/pages/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>  

  )
}
export default App
