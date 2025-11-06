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
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ChatWidget from './components/Chatwidget';
import { jwtDecode } from 'jwt-decode';
import Track from './pages/Track';
import AdminDashboard from './pages/AdminDashboard';
import Search from './pages/Search';



function App() {
  useEffect(() => {
    // ถ้ามี flag ว่า login สำเร็จ ให้แสดง toast แล้วลบ flag
    if (localStorage.getItem("loginSuccess") === "true") {
      toast.success("เข้าสู่ระบบสำเร็จ 🎉");
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    const decoded = jwtDecode(token);
    user = {
      userName: decoded.UserName,
      email: decoded.Email,
    };
  }
  return (
    <>
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
          <Route path="/pages/Track" element={<Track />} />
          <Route path="/pages/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/pages/Search" element={<Search />} />
        </Routes>
        <ChatWidget user={user} />
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "#1f2937" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#1f2937" },
          },
        }}
      />
    </>

  )
}
export default App
