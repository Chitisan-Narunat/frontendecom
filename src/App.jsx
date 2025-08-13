import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'
import Speakers from './pages/Speakers'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Address from './pages/Address';
import Headphones from './pages/Headphones';
import Soundbars from './pages/Soundbars';
import Profile from './pages/Profile';

function App() {
  return (
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
