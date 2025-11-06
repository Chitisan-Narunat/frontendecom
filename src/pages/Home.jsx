import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Navbar from "/src/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getImageById } from "/Styles/product-images";
import { speakerImages } from "../assets";
import { headphoneImages } from "../assets";
import { iconImages } from "../assets";
import Endbar from "../components/Endbar";
import ProductGrid from "../components/ProductCard";
import { api } from "../../services/api";
import meena from "/src/assets/563386224_18374261965150416_5706055306884998264_n.jpg";
import meena2 from "/src/assets/552881529_18371415862150416_3631376685415195847_n.jpg";
import meena3 from "/src/assets/560930248_18373408864150416_5361864549389014608_n.jpg";
import toast, { Toaster } from "react-hot-toast";

function Home({
  onBeoLit20Click,
  onBeoA5Click,
  onBeoExClick,
  onBeoA1Click,
  onBeoH100Click,
  onBeoH95Click,
  onBeoElevenClick,
  onBeoPlayExClick,
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartRendered, setIsCartRendered] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isFavOpen, setIsFavOpen] = useState(false);
  const [isFavRendered, setIsFavRendered] = useState(false);
  const [isFavVisible, setIsFavVisible] = useState(false);

  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [requestId, setRequestId] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendWait, setResendWait] = useState(0);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1: ขอ OTP, 2: ใส่ OTP + รหัสใหม่
  const [fpEmail, setFpEmail] = useState("");
  const [fpRequestId, setFpRequestId] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPass, setFpNewPass] = useState("");
  const [fpMsg, setFpMsg] = useState("");
  const [fpSending, setFpSending] = useState(false);
  const [fpResendWait, setFpResendWait] = useState(0);

  const [isBeoLit20Open, setIsBeoLit20Open] = useState(false);
  const [isBeoA5Open, setIsBeoA5Open] = useState(false);
  const [isBeoExOpen, setIsBeoExOpen] = useState(false);
  const [isBeoA1Open, setIsBeoA1Open] = useState(false);
  const [isBeoH100Open, setIsBeoH100Open] = useState(false);
  const [isBeoH95Open, setIsBeoH95Open] = useState(false);
  const [isBeoElevenOpen, setIsBeoElevenOpen] = useState(false);
  const [isBeoPlayExOpen, setIsBeoPlayExOpen] = useState(false);

  onBeoLit20Click = () => setIsBeoLit20Open(true);
  onBeoA5Click = () => setIsBeoA5Open(true);
  onBeoExClick = () => setIsBeoExOpen(true);
  onBeoA1Click = () => setIsBeoA1Open(true);
  onBeoH100Click = () => setIsBeoH100Open(true);
  onBeoH95Click = () => setIsBeoH95Open(true);
  onBeoElevenClick = () => setIsBeoElevenOpen(true);
  onBeoPlayExClick = () => setIsBeoPlayExOpen(true);

  const images = [
    "/src/assets/beolit-20-001.png",
    "/src/assets/BL20_greey_front_2.png",
    "/src/assets/BL20_grey_side2.png",
  ];

  const images2 = [
    "/src/assets/Beosound_A5_Weave-Image_1.png",
    "/src/assets/Beosound_A5_-_PDP_-_Image_7.png",
    "/src/assets/Beosound_A5_-_PDP_-_Image_9.png",
    "/src/assets/Beosound_A5_-_PDP_-_Image_4.png",
  ];

  const images3 = [
    "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0034-Perspective-1200x1200.png",
    "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0040-Perspective-1200x1200.png",
    "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0037-Perspective-1200x1200.png",
  ];

  const images4 = [
    "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Perspective-0003-s1200x1200px.png",
    "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Front-0001-s1200x1200px.png",
    "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Perspective-0005-s1200x1200px.png",
  ];

  const images5 = [
    "/src/assets/Packshot-Beoplay-H100-Infinite-Black-perspective-0006-s1200x1200px.png",
    "/src/assets/Packshot-Beoplay-H100-Infinite-Black-Front-0007-s1200x1200px.png",
    "/src/assets/Packshot-Beoplay-H100-Infinite-Black-Perspective-0003-s1200x1200px.png",
  ];

  const images6 = [
    "/src/assets/Packshot-Beoplay-H95-Gold-Tone-0006-Perspective-1200x1200px.png",
    "/src/assets/H95_gold_fullside.png",
    "/src/assets/H95_gold_sidefullleft.png",
  ];

  const images7 = [
    "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Case-Earphones-Perspective-s1200x1200px.png",
    "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Case-earbuds-Front-s1200x1200px..png",
    "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Earphones-Logo-Front-s1200x1200px..png",
  ];

  const images8 = [
    "/src/assets/Beoplay-EX-Gold-Tone-Hero.png",
    "/src/assets/Beoplay-EX-Gold-Tone-Casewithearbuds-2.png",
    "/src/assets/Beoplay-EX-Gold-Tone-Earbuds.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const goToSpeakers = () => {
    navigate("/pages/Speakers");
  };
  const goToAddress = () => {
    navigate("/pages/Address");
    refreshCart();
  };
  const goToHeadphones = () => {
    navigate("/pages/Headphones");
  };
  const goToSoundbars = () => {
    navigate("/pages/Soundbars");
  };
  const goToAboutUs = () => {
    navigate("/pages/AboutUs");
  };
  const goToAll = () => {
    navigate("/pages/goToAll");
  };
  const goToTrack = () => {
    navigate("/pages/Track");
  };
  const goToHome = () => {
    navigate("/pages/Home");
  }

  const [form, setForm] = useState({
    email: "",
    passWord: "",
  });

  const [form2, setForm2] = useState({
    email: "",
    userName: "",
    passWord: "",
  });

  const [message, setMessage] = useState();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange2 = (e) => {
    setForm2({
      ...form2,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginPromise = api.get("/Authen/Login", {
      params: { Email: form.email, PassWord: form.passWord },
    });

    toast.promise(loginPromise, {
      loading: "กำลังเข้าสู่ระบบ...",
      success: "เข้าสู่ระบบสำเร็จ 🎉",
      error: "เข้าสู่ระบบไม่สำเร็จ ❌",
    });

    try {
      const APIRES = await loginPromise;
      setMessage(APIRES.data);
      setIsLoginOpen(false);

      if (APIRES.data.token) {
        localStorage.setItem("token", APIRES.data.token);
        const decoded = jwtDecode(APIRES.data.token);
        const role = decoded.Roles;

        localStorage.setItem("loginSuccess", "true");

        if (role === "Member") {
          window.location.reload(); // รีเฟรชหน้า
        } else if (role === "Admin") {
          navigate("/pages/Admin");
          window.location.reload();
        }
      } else {
        toast.error("Login success but no token received");
      }
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (
        status === 401 &&
        (data?.code === "UNVERIFIED" ||
          (typeof data === "string" && data.toLowerCase().includes("verify")))
      ) {
        toast.error(
          typeof data === "string"
            ? data
            : data?.message || "กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ"
        );
        setIsRegisterOpen(true);
        return;
      }

      toast.error(
        typeof data === "string" ? data : "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่"
      );
    }
  };

  const handleRegisterInit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form2.email,
      userName: form2.userName,
      passWord: form2.passWord,
    };
    const promise = api.post("/Authen/Register/Init", payload);
    toast.promise(promise, {
      loading: "กำลังส่งรหัส OTP ไปที่อีเมล",
      success: "ส่งรหัส OTP แล้ว 🎉",
      error: (err) =>
        typeof err?.response?.data === "string"
          ? err.response.data
          : "ส่งรหัสไม่สำเร็จ",
    });

    try {
      const { data } = await promise;
      setRequestId(data?.requestId || "");
      setIsRegisterOpen(false);
      setIsOtpOpen(true);
      setOtp("");
      setOtpMsg("รหัส OTP ถูกส่งไปที่อีเมลแล้ว");
      setResendWait(30);
    } catch (error) {
      return error;
    }
  };

  const handleVerifyOtp = async () => {
    if (!requestId || !otp) {
      setOtpMsg("กรุณากรอก OTP");
      return;
    }

    setIsVerifying(true);

    const promise = api
      .post("/Authen/Register/Verify", { requestId, otp })
      .then((res) => {
        if (!res?.data?.verified) {
          const err = new Error("ยืนยันไม่สำเร็จ");
          err.response = { data: "OTP ไม่ถูกต้องหรือหมดอายุ" };
          throw err;
        }
        return res;
      });

    toast.promise(promise, {
      loading: "กำลังยืนยัน OTP",
      success: "ยืนยันสำเร็จ! กำลังเข้าสู่ระบบ",
      error: (err) =>
        typeof err?.response?.data === "string"
          ? err.response.data
          : "ยืนยันไม่สำเร็จ",
    });
    try {
      const { data } = await promise;
      setOtpMsg("ยืนยันสำเร็จ กำลังเข้าสู่ระบบ");
      if (data?.token) localStorage.setItem("token", data.token);
      setTimeout(() => {
        setIsOtpOpen(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      const msg = error?.response?.data;
      setOtpMsg(typeof msg === "string" ? msg : "ยืนยันไม่สำเร็จ");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!requestId || resendWait > 0) return;
    try {
      await api.post("/Authen/Register/Resend", { requestId });
      setOtpMsg("ส่งรหัสใหม่แล้ว");
      setResendWait(30);
    } catch (error) {
      const msg = error?.response?.data;
      setOtpMsg(typeof msg === "string" ? msg : "ส่งรหัสใหม่ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    if (resendWait <= 0) return;
    const t = setInterval(() => setResendWait((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendWait]);

  const closeallmodal = () => {
    setIsBeoLit20Open(false);
    setIsBeoA5Open(false);
    setIsBeoExOpen(false);
    setIsBeoA1Open(false);
    setIsBeoH100Open(false);
    setIsBeoH95Open(false);
    setIsBeoElevenOpen(false);
    setIsBeoPlayExOpen(false);
  };

  const addToCart = async (ProductId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อน");
        navigate("/pages/Home");
        return;
      }
      const API = await api.post(
        "/OrderItem/AddItem",
        {
          ProductId,
          Quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...auth(),
          },
        }
      );

      const d = API.data;
      const message = typeof d === "string" ? d : d?.message || "";
      const needAddress =
        message === "No Address" ||
        (typeof d !== "string" && d?.needAddress === true);

      if (needAddress) {
        toast.error("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }

      const oid = Number(API.data?.orderId ?? API.data?.OrderId);
      if (Number.isFinite(oid) && oid > 0) {
        localStorage.setItem("currentOrderId", String(oid));
      }

      await refreshCart();

      closeallmodal();
      setIsCartOpen(true);
      toast.success("เพิ่มลงตะกร้าแล้ว");
    } catch (error) {
      const status = error?.response?.status;
      const raw = error?.response?.data;
      const msg = typeof raw === "string" ? raw : raw?.message;

      if (status === 404 && msg === "No Address") {
        alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }
      setMessage(typeof raw === "string" ? raw : "failed");
    }
  };

  const addToBuy = async (ProductId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อน");
        navigate("/pages/Home");
        return;
      }
      const API = await api.post(
        "/OrderItem/AddItem",
        {
          ProductId,
          Quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const d = API.data;
      const message = typeof d === "string" ? d : d?.message || "";
      const needAddress =
        message === "No Address" ||
        (typeof d !== "string" && d?.needAddress === true);

      if (needAddress) {
        alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }

      const oid = Number(API.data?.orderId ?? API.data?.OrderId);
      if (Number.isFinite(oid) && oid > 0) {
        localStorage.setItem("currentOrderId", String(oid));
      }

      closeallmodal();
      navigate("/pages/Address");
    } catch (error) {
      const status = error?.response?.status;
      const raw = error?.response?.data;
      const msg = typeof raw === "string" ? raw : raw?.message;
      alert("ไม่มีที่อยู่");

      if (status === 404 && msg === "No Address") {
        alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }
      setMessage(typeof raw === "string" ? raw : "failed");
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuRendered(true);
      setTimeout(() => setIsMenuVisible(true), 10);
    } else {
      setIsMenuVisible(false);
      setTimeout(() => setIsMenuRendered(false), 300);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isCartOpen) {
      setIsCartRendered(true);
      setTimeout(() => setIsCartVisible(true), 10);
    } else {
      setIsCartVisible(false);
      setTimeout(() => setIsCartRendered(false), 300);
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (isFavOpen) {
      setIsFavRendered(true);
      setTimeout(() => setIsFavVisible(true), 10);
    } else {
      setIsFavVisible(false);
      setTimeout(() => setIsFavRendered(false), 300);
    }
  }, [isFavOpen]);

  const auth = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });

  async function refreshCart() {
    const { data } = await api.get(`/OrderItem/Current`, { headers: auth() });
    setCart({
      orderId: data?.orderId ?? 0,
      items: data?.items ?? [],
      actualPrice: data?.actualPrice ?? 0,
    });
  }

  async function removeItem(rowId) {
    await api.delete(`/OrderItem/DropItem`, {
      params: { OrderItemsId: rowId },
      headers: auth(),
    });
    refreshCart();
  }

  async function incQty(rowId, qty) {
    await api.put(
      `/OrderItem/EditQuantity`,
      { quantity: qty + 1 },
      {
        params: { OrderItemsId: rowId },
        headers: { "Content-Type": "application/json", ...auth() },
      }
    );
    refreshCart();
  }

  async function decQty(rowId, qty) {
    if (qty <= 1) return;
    await api.put(
      "/OrderItem/EditQuantity",
      { quantity: qty - 1 },
      {
        params: { OrderItemsId: rowId },
        headers: { "Content-Type": "application/json", ...auth() },
      }
    );
    refreshCart();
  }

  useEffect(() => {
    if (isCartVisible) refreshCart();
  }, [isCartVisible]);

  const API = "http://localhost:5283/api";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let alive = true;
    api
      .get("/Product/GetProduct")
      .then((res) => {
        if (alive) setProducts(res.data || []);
      })
      .catch(console.error);
    return () => {
      alive = false;
    };
  }, []);

  const favs = products.filter((p) => !!(p.isFavourite ?? p.IsFavourite));

  const [favList, setFavList] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(false);


  async function refreshFavs() {
    try {
      setLoadingFavs(true);
      const { data } = await api.get("/Product/GetProduct", {
        params: { _t: Date.now() },
      });
      const favOnly = (data || []).filter(
        (p) => !!(p.isFavourite ?? p.IsFavourite)
      );
      setFavList(favOnly);
    } catch (e) {
      console.error(
        "load favs failed",
        e?.response?.status,
        e?.response?.data || e.message
      );
      setFavList([]);
    } finally {
      setLoadingFavs(false);
    }
  }

  useEffect(() => {
    if (isFavVisible) refreshFavs();
  }, [isFavVisible]);

  useEffect(() => {
    if (!token) {
      setFavList([]);
      return;
    }
    refreshFavs();
  }, [token]);

  const [openProduct, setOpenProduct] = useState(null);
  const cartCount = Array.isArray(cart?.items) ? cart.items.length : 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshCart();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshCart();
    } else {
      setCart({ orderId: 0, items: [], actualPrice: 0 });
    }
  }, [isLoginOpen]);

  async function handleForgotInit() {
    if (!fpEmail) {
      setFpMsg("กรุณากรอกอีเมล");
      return;
    }
    try {
      setFpSending(true);
      const { data } = await api.post("/Authen/Forgot/Init", {
        email: fpEmail,
      });
      setFpRequestId(data?.requestId || "");
      setFpMsg("ส่งรหัส OTP ไปที่อีเมลแล้ว");
      setFpStep(2);
      setFpResendWait(30);
    } catch (err) {
      const msg = err?.response?.data;
      setFpMsg(typeof msg === "string" ? msg : "ส่งรหัสล้มเหลว");
    } finally {
      setFpSending(false);
    }
  }

  async function handleForgotResend() {
    if (!fpRequestId || fpResendWait > 0) return;
    try {
      await api.post("/Authen/Register/Resend", { requestId: fpRequestId });
      setFpMsg("ส่งรหัสใหม่แล้ว");
      setFpResendWait(30);
    } catch (err) {
      const msg = err?.response?.data;
      setFpMsg(typeof msg === "string" ? msg : "ส่งรหัสใหม่ไม่สำเร็จ");
    }
  }

  async function handleForgotReset() {
    if (!fpRequestId || !fpOtp || !fpNewPass) {
      setFpMsg("กรอกให้ครบ: OTP และรหัสใหม่");
      return;
    }
    try {
      setFpSending(true);
      await api.post("/Authen/Forgot/Reset", {
        requestId: fpRequestId,
        otp: fpOtp,
        newPassword: fpNewPass,
      });
      setFpMsg("รีเซ็ตรหัสสำเร็จ! เข้าสู่ระบบด้วยรหัสใหม่ได้เลย");
      // ปิด modal นี้ เปิด Login
      setTimeout(() => {
        setIsForgotOpen(false);
        setIsLoginOpen(true);
      }, 700);
    } catch (err) {
      const msg = err?.response?.data;
      setFpMsg(typeof msg === "string" ? msg : "รีเซ็ตไม่สำเร็จ");
    } finally {
      setFpSending(false);
    }
  }

  useEffect(() => {
    if (fpResendWait <= 0) return;
    const t = setInterval(() => setFpResendWait((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [fpResendWait]);

  return (
    <main>
      <Navbar
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
        onFavClick={() => setIsFavOpen(true)}
        favCount={favList.length}
        cartCount={cartCount}
      />
      <div className="bg-[#edeef0] text-white h-screen flex items-center justify-center">
        <div className="container mx-auto text-left">
          <h1 className="text-5xl text-[#212529] font-playfair font-bold">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-[#6C757D] mt-4 font-playfair">
            Discover premium Bang & Olufsen speakers
            <br />
            combining sleek design and exceptional sound.
            <br />
            Perfect for any space, our collection offers top-quality audio to
            elevate your music experience.
          </p>
          <a
            href="/pages/Speakers"
            className="bg-[#feddd2] text-white px-6 py-2 rounded-full mt-8 inline-block hover:bg-gray-500 shadow-sm font-playfair"
          >
            Shop Now
          </a>
        </div>
        <img
          src={speakerImages.Bo8}
          alt="Bg"
          className="h-auto w-[420px] -ml-96"
          onError={(e) => console.error("Image load error:", e)}
        />
      </div>
      <div className="bg-white h-screen">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mt-10 font-playfair">
            Our Product
          </h2>
          <div className="myContainer">
            <div onClick={onBeoLit20Click} className="containerBox">
              <img
                src={`${API}/products/1/images-blob/1`}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beolit 20</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿21990</p>
            </div>
            <div onClick={onBeoA5Click} className="containerBox">
              <img
                src={`${API}/products/2/images-blob/2`}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beosound A5</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿64700</p>
            </div>
            <div onClick={onBeoExClick} className="containerBox">
              <img
                src={`${API}/products/3/images-blob/3`}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beosound Explore</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿7900</p>
            </div>
            <div onClick={onBeoA1Click} className="containerBox">
              <img
                src={`${API}/products/4/images-blob/4`}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beosound A1</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿14800</p>
            </div>
          </div>
          <div className="myContainer">
            <div onClick={onBeoH100Click} className="containerBox">
              <img
                src={`${API}/products/21/images-blob/16`}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beoplay H100</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿69000</p>
            </div>
            <div onClick={onBeoH95Click} className="containerBox">
              <img
                src={headphoneImages.Hp7}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beoplay H95</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿40990</p>
            </div>
            <div onClick={onBeoElevenClick} className="containerBox">
              <img
                src={headphoneImages.Hp8}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beoplay ELEVEN</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿19900</p>
            </div>
            <div onClick={onBeoPlayExClick} className="containerBox">
              <img
                src={headphoneImages.Hp9}
                alt="Be 20"
                className="imageInBox"
              />
              <h3 className="headText">Beoplay EX</h3>
              <p className="desText">Bang&Olufsen</p>
              <p className="priceText">฿18800</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 h-screen px-10 py-7">
        <h1 className="text-3xl font-bold">Brand Story</h1>
        <ul className="flex flex-row space-x-24 mt-[120px] ml-10">
          <li>
            <h2 className="text-5xl font-bold">Sound that elevates</h2>
            <h3 className="text-5xl font-bold mt-1">the everyday</h3>
            <h4 className="text-xl font-light mt-5">
              Curated Bang & Olufsen selections with authentic
              <br />
              products, after-sales service, and expert sound
              <br />
              advice from our specialists.
            </h4>
            <ul className="flex flex-col mt-3 space-y-1">
              <ul className="flex flex-row space-x-5">
                <li className="flex flex-row space-x-1 items-center">
                  <img src={iconImages.clock} alt="" className="w-5 h-5" />
                  <h1 className="text-lg font-light">Genuine Products</h1>
                </li>
                <li className="flex flex-row space-x-1 items-center">
                  <img src={iconImages.shipping} alt="" className="w-6 h-6" />
                  <h1 className="text-lg font-light">Free Shipping</h1>
                </li>
              </ul>
              <ul className="flex flex-row space-x-10">
                <li className="flex flex-row space-x-1 items-center">
                  <img src={iconImages.support} alt="" className="w-5 h-5" />
                  <h1 className="text-lg font-light">0% installments</h1>
                </li>
                <li className="flex flex-row space-x-1 items-center">
                  <img src={iconImages.support} alt="" className="w-5 h-5" />
                  <h1 className="text-lg font-light">Expert Support</h1>
                </li>
              </ul>
            </ul>
            <ul className="flex flex-row space-x-7 items-center mt-4">
              <li>
                <button
                  onClick={goToSpeakers}
                  className="bg-black border-2 border-black text-white h-[45px] w-[160px] rounded-lg"
                >
                  Shop Speakers
                </button>
              </li>
              <li>
                <button
                  onClick={goToAboutUs}
                  className="bg-white border-2 text-black h-[40px] w-[140px] rounded-lg"
                >
                  About Us
                </button>
              </li>
            </ul>
          </li>
          <li>
            <iframe
              data-testid="embed-iframe"
              title="Spotify player"
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/track/3rmqiQbzPDx7A8p88IRFKg?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </li>
          <li>
            <img
              src={headphoneImages.homeimage}
              alt=""
              className=" h-[700px] w-auto -mt-[170px] rounded-lg"
            />
          </li>
        </ul>
      </div>
      <div className="bg-white h-fit">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mt-10 font-playfair">
            Your Favourite
          </h2>
          {favs.length > 0 ? (
            <div className="mt-6">
              <ProductGrid
                title={null}
                items={favs}
                token={token}
                onFavChange={(pid, next, meta) => {
                  if (meta?.requireLogin) return;
                  setProducts((prev) =>
                    prev.map((p) =>
                      p.productId === pid ? { ...p, isFavourite: next } : p
                    )
                  );
                }}
                onProductClick={(pid) => {
                  const product = favs.find((p) => p.productId === pid);
                  if (product) setOpenProduct(product);
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 mt-8">ยังไม่มีสินค้าในรายการโปรด</p>
          )}
        </div>
      </div>
      <div className="bg-white h-[72px]"></div>
      <iframe
        width="640"
        height="360"
        src="https://www.youtube.com/embed/lmKeU0eZo_o?si=hvWuCRS8JyisSNlf"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        className="ml-10"
      ></iframe>
      <div className="bg-white h-[72px]"></div>
      <section aria-labelledby="reviews-title" className="bg-[#f9f9f9] py-16">
        <div className="container mx-auto px-4">
          <h2
            id="reviews-title"
            className="text-3xl font-bold text-gray-800 mb-10 text-center"
          >
            Customer Reviews
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: meena,
                name: "Meena N.",
                sub: "Natanon Sasen",
                textBold: "“เสียงดี รายละเอียดครบ”",
                textRest: " ใช้งานง่าย วัสดุพรีเมียม สมราคา ส่งไวมากครับ",
              },
              {
                img: meena2,
                name: "Meena N.",
                sub: "Natanon Sasen",
                textBold: "“ดีไซน์สวย เสียงบาลานซ์”",
                textRest:
                  " ตอนดูหนังกับฟังเพลงทำได้ดีมาก ตั้งค่าไม่นาน ก็พร้อมใช้งาน",
              },
              {
                img: meena3,
                name: "Meena N.",
                sub: "Natanon Sasen",
                textBold: "“ตั้งค่าเร็ว ใช้งานยืดหยุ่น”",
                textRest: " ใครมองหาเครื่องเสียงคุณภาพ รุ่นนี้ตอบโจทย์เลยครับ",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-200 mb-4">
                  <img
                    src={r.img}
                    alt={`${r.name} reviewer`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed max-w-xs">
                  <span className="font-semibold">{r.textBold}</span>
                  {r.textRest}
                </p>
                <div className="mt-4 text-[#f59e0b] flex">
                  {" "}
                  {/*dow*/}
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                    </svg>
                  ))}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <div className="font-semibold text-gray-800">{r.name}</div>
                  <div>{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-12 text-center italic">
            Loved your experience? Tag us on Instagram with{" "}
            <span className="font-semibold text-black">#DontknowSound</span>
          </p>
        </div>
      </section>
      <Endbar></Endbar>
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full border p-2 rounded"
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="passWord"
                className="w-full border p-2 rounded"
                value={form.passWord}
                onChange={handleChange}
              />
              <button
                type="button"
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                type="button"
                className="w-full text-sm text-blue-600 mt-2 underline"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsForgotOpen(true);
                }}
              >
                ลืมรหัสผ่าน?
              </button>
            </form>
          </div>
        </div>
      )}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full border p-2 rounded"
                value={form2.email}
                onChange={handleChange2}
              />
              <input
                type="text"
                placeholder="Username"
                name="userName"
                className="w-full border p-2 rounded"
                value={form2.userName}
                onChange={handleChange2}
              />
              <input
                type="password"
                placeholder="Password"
                name="passWord"
                className="w-full border p-2 rounded"
                value={form2.passWord}
                onChange={handleChange2}
              />
              <button
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600"
                onClick={handleRegisterInit}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
      {isOtpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setIsOtpOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                placeholder="กรอกรหัส 6 หลัก"
                className="w-full border p-2 rounded text-center tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
              <button
                disabled={isVerifying}
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                onClick={handleVerifyOtp}
              >
                {isVerifying ? "Verifying..." : "ยืนยัน"}
              </button>
              <button
                disabled={resendWait > 0}
                className="w-full border py-2 rounded disabled:opacity-50"
                onClick={handleResendOtp}
              >
                {resendWait > 0 ? `ส่งใหม่ได้ใน ${resendWait}s` : "ส่งรหัสใหม่"}
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">{otpMsg}</p>
              <p className="text-[11px] text-center text-gray-400 break-all">
                RequestId: {requestId}
              </p>
            </div>
          </div>
        </div>
      )}
      {isCartRendered && (
              <div
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setIsCartOpen(false);
                }}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end items-stretch z-50
                      transition-opacity duration-300 ease-out
                      ${
                        isCartVisible
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
              >
                <div
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`bg-white dark:bg-neutral-900 dark:text-neutral-100 w-96 h-full rounded-l-lg
                        shadow-[0_0_30px_rgba(0,0,0,0.25)] transform transition-transform duration-300 ease-out
                        ${isCartVisible ? "translate-x-0" : "translate-x-full"}`}
                >
                  <div className="sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-b border-black/10 dark:border-white/10 rounded-tl-lg">
                    <div className="flex items-center justify-between p-5">
                      <h2 className="text-lg font-bold tracking-tight">
                        ตะกร้าสินค้า
                      </h2>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 rounded-lg text-gray-500 hover:text-black dark:text-neutral-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="overflow-y-auto px-5 py-4 space-y-5 h-[calc(100%-140px)]">
                    {cart.items.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="mx-auto w-14 h-14 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-2xl text-gray-400">
                          🛒
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-gray-700 dark:text-neutral-300">
                          ตะกร้ายังว่างอยู่
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                          เลือกสินค้าจากหน้าร้านเพื่อเริ่มช้อปเลย
                        </p>
                        <button
                          onClick={goToHome}
                          className="mt-5 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition"
                        >
                          ไปหน้าร้าน
                        </button>
                      </div>
                    ) : (
                      cart.items.map((item) => (
                        <div
                          key={item.orderItemsId}
                          className="group relative bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 hover:shadow-lg transition"
                        >
                          <button
                            onClick={() => removeItem(item.orderItemsId)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition"
                          >
                            <IoClose size={16} />
                          </button>
      
                          <div className="flex gap-4 items-start">
                            <div className="w-28 h-24 md:w-32 md:h-28 rounded-lg overflow-hidden bg-white dark:bg-neutral-700 flex items-center justify-center shrink-0">
                              <img
                                src={getImageById(item.productId)}
                                alt={item.name}
                                className="object-contain w-full h-full"
                              />
                            </div>
      
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold truncate pr-6">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-600 dark:text-neutral-400 line-clamp-2">
                                {item.productDescription}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => decQty(item.orderItemsId, item.qty)}
                                  className="px-2 py-0.5 rounded-md border border-gray-300 dark:border-neutral-600 hover:bg-gray-200 dark:hover:bg-neutral-700"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center text-sm">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => incQty(item.orderItemsId, item.qty)}
                                  className="px-2 py-0.5 rounded-md border border-gray-300 dark:border-neutral-600 hover:bg-gray-200 dark:hover:bg-neutral-700"
                                >
                                  +
                                </button>
                              </div>
                              <div className="mt-2 text-right">
                                <span className="text-sm font-semibold">
                                  ฿{Number(item.subtotal).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.items.length > 0 && (
                    <div className="sticky bottom-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-t border-black/10 dark:border-white/10 rounded-bl-lg p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-neutral-400">
                          ยอดรวม
                        </h3>
                        <h1 className="text-xl font-bold">
                          ฿{Number(cart.actualPrice || 0).toLocaleString()}
                        </h1>
                      </div>
                      <button
                        onClick={goToAddress}
                        className="w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition font-medium"
                      >
                        ชำระเงิน
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
      {isMenuRendered && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start items-stretch z-50 transition-opacity duration-300 ease-in-out ${
            isMenuVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`bg-white shadow-lg p-6 w-72 relative transform transition-transform duration-300 ease-in-out ${
              isMenuVisible ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 left-9 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <ul className="flex space-y-3 flex-col mt-16 ml-2 font-semibold text-xl">
              <li>
                <button>Homes</button>
              </li>
              <li>
                <button onClick={goToAll}>All Product</button>
              </li>
              <li>
                <button onClick={goToSpeakers}>Speakers</button>
              </li>
              <li>
                <button onClick={goToHeadphones}>Headphones</button>
              </li>
              <li>
                <button onClick={goToSoundbars}>Soundbars</button>
              </li>
              <li>
                <button onClick={goToTrack}>Tracking</button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isFavRendered && (
        <div
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsFavOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsFavOpen(false);
          }}
          className={`fixed inset-0 z-50 flex justify-end items-stretch
                transition-opacity duration-300 ease-out
                ${
                  isFavVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          {/* Drawer (ขนาดเดิม w-96 + มุมโค้งแบบ rounded-l-lg) */}
          <aside
            onMouseDown={(e) => e.stopPropagation()}
            className={`relative h-full w-96 bg-white/95 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.25)]
                  transform transition-transform duration-300 ease-out
                  ${isFavVisible ? "translate-x-0" : "translate-x-full"}
                  rounded-l-lg`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 border-b backdrop-blur-md rounded-tl-lg">
              <div className="px-5 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-gray-900">
                  Favourite
                </h2>
                <button
                  onClick={() => setIsFavOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100"
                  aria-label="ปิด"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="h-full overflow-y-auto px-4 py-4 space-y-4">
              {/* Loading skeleton */}
              {loadingFavs && (
                <ul className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-gray-200 p-3 animate-pulse"
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-16 bg-gray-200 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
                          <div className="h-3 w-56 bg-gray-200 rounded mb-2" />
                          <div className="h-8 w-full bg-gray-200 rounded" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Empty */}
              {!loadingFavs && favList.length === 0 && (
                <div className="text-center py-16">
                  <div className="mx-auto size-14 rounded-lg bg-gray-100 grid place-items-center mb-3 text-xl">
                    ♡
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    ยังไม่มีสินค้าที่ชอบ
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    กดหัวใจในหน้าสินค้าเพื่อเพิ่ม
                  </p>
                  <a
                    href="/pages/All"
                    className="inline-flex items-center justify-center mt-5 px-4 py-2 rounded-lg
                         bg-black text-white hover:bg-gray-800 transition text-sm"
                  >
                    ไปเลือกสินค้า
                  </a>
                </div>
              )}

              {/* List */}
              {!loadingFavs && favList.length > 0 && (
                <ul className="space-y-3">
                  {favList.map((item) => {
                    const pid = item.productId ?? item.ProductId;
                    const name = item.productName ?? item.ProductName ?? "";
                    const desc =
                      item.productDescription ?? item.ProductDescription ?? "";
                    const img =
                      (item.primaryImageUrl ?? item.PrimaryImageUrl) ||
                      "/placeholder.png";
                    const price = item.price ?? item.Price;
                    const currency = (n) =>
                      `฿${Number(n || 0).toLocaleString()}`;

                    return (
                      <li key={pid}>
                        <div className="group relative rounded-lg border border-gray-200 bg-white hover:shadow-lg transition">
                          <div className="flex gap-3 p-3">
                            <div className="relative w-20 h-16 shrink-0">
                              <img
                                src={img}
                                alt={name}
                                className="w-full h-full object-contain rounded-lg bg-gray-50"
                              />
                              <div className="pointer-events-none absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition">
                                <img
                                  src={img}
                                  alt=""
                                  className="w-10 h-10 object-contain rounded-md shadow ring-1 ring-black/5 bg-white"
                                />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0 pr-7">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {name}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                                {desc}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 border border-gray-200 text-gray-700">
                                  Favourite
                                </span>
                                {price && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700">
                                    {currency(price)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={async () => {
                                try {
                                  await api.delete(
                                    "/Favourite/RemoveFavourite",
                                    { params: { ProductId: pid } }
                                  );
                                } finally {
                                  setFavList((prev) =>
                                    prev.filter(
                                      (x) =>
                                        (x.productId ?? x.ProductId) !== pid
                                    )
                                  );
                                  setProducts((prev) =>
                                    prev.map((p) =>
                                      (p.productId ?? p.ProductId) === pid
                                        ? { ...p, isFavourite: false }
                                        : p
                                    )
                                  );
                                }
                              }}
                              className="absolute right-3 top-3 p-1.5 rounded-md text-gray-500 hover:text-black hover:bg-gray-100"
                              aria-label="remove favourite"
                            >
                              <IoClose size={16} />
                            </button>
                          </div>

                          {/* Action */}
                          <div className="px-3 pb-3">
                            <button
                              onClick={async () => {
                                try {
                                  await api.post("/OrderItem/Add", null, {
                                    params: { ProductId: pid, Quantity: 1 },
                                  });
                                  toast.success("เพิ่มลงตะกร้าแล้ว");
                                } catch (e) {
                                  toast.error(
                                    e?.response?.data || "เพิ่มตะกร้าไม่สำเร็จ"
                                  );
                                }
                              }}
                              className="w-full h-8 rounded-lg border border-black text-black text-xs font-medium
                                   hover:bg-black hover:text-white transition"
                            >
                              ใส่ตะกร้า
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t px-5 py-3 rounded-bl-lg">
              <p className="text-[11px] text-gray-500 text-center">
                กดนอกแถบหรือปุ่ม Esc เพื่อปิด
              </p>
            </div>
          </aside>
        </div>
      )}
      {isForgotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setIsForgotOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {fpStep === 1 ? "ลืมรหัสผ่าน" : "ยืนยัน OTP และตั้งรหัสใหม่"}
            </h2>
            {fpStep === 1 ? (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="อีเมลที่ใช้สมัคร"
                  className="w-full border p-2 rounded"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                />
                <button
                  disabled={fpSending}
                  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                  onClick={handleForgotInit}
                >
                  {fpSending ? "กำลังส่ง..." : "ขอรหัสรีเซ็ต (OTP)"}
                </button>
                <p className="text-center text-sm text-gray-600">{fpMsg}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="กรอก OTP 6 หลัก"
                  className="w-full border p-2 rounded text-center tracking-widest"
                  value={fpOtp}
                  onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, ""))}
                />
                <input
                  type="password"
                  placeholder="ตั้งรหัสใหม่"
                  className="w-full border p-2 rounded"
                  value={fpNewPass}
                  onChange={(e) => setFpNewPass(e.target.value)}
                />
                <button
                  disabled={fpSending}
                  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                  onClick={handleForgotReset}
                >
                  {fpSending ? "กำลังยืนยัน..." : "ยืนยันและตั้งรหัสใหม่"}
                </button>
                <button
                  disabled={fpResendWait > 0}
                  className="w-full border py-2 rounded disabled:opacity-50"
                  onClick={handleForgotResend}
                >
                  {fpResendWait > 0
                    ? `ส่งรหัสใหม่ได้ใน ${fpResendWait}s`
                    : "ส่งรหัสใหม่"}
                </button>
                <p className="text-center text-sm text-gray-600">{fpMsg}</p>
                <p className="text-[11px] text-center text-gray-400 break-all">
                  RequestId: {fpRequestId}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {isBeoLit20Open && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoLit20Open(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoLit20Open(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beolit 20</h2>
            <h3 className="h3product">Bang & Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  This is 240 watts you can feel.
                </h2>
                <h3 className="mt-2">
                  Beolit 20 may be portable, but it packs a punch that rivals
                  much bigger speakers. A combo of powerful amplifiers and
                  drivers – including a wideband woofer for rumbling lows –
                  gives your music the presence it deserves. And with 360-degree
                  sound dispersion, everyone can enjoy it.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿21,990</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(1)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(1)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
            <p className="mt-auto font-light text-red-600 text-center">
              {message}
            </p>
          </div>
        </div>
      )}
      {isBeoA5Open && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoA5Open(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoA5Open(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beoplay A5</h2>
            <h3 className="h3product">Bang & Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images2[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  Brings the bass. Reads the room.
                </h2>
                <h3 className="mt-2">
                  A two-way setup with four drivers. The most powerful woofer in
                  any of our portable speakers. You won’t just hear Beosound A5
                  – you’ll feel it. We pack all of our latest acoustic
                  advancements in one compact package. RoomSense adapts playback
                  based on your space, so you always get the finest fidelity.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿64,700</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(2)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(2)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isBeoExOpen && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoExOpen(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoExOpen(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beosound Explore</h2>
            <h3 className="h3product">Bang & Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images3[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  Made to last.
                </h2>
                <h3 className="mt-2">
                  Breaking new ground or walking the beaten path? It’s all the
                  same to the sturdy Beosound Explore. Inside the
                  scratch-resistant, anodised aluminium shell, a vertical rib
                  structure provides serious protection from bumps. We design
                  and build the aluminum shell of the speaker in Denmark as this
                  is the only way we can ensure that it meets our strict
                  requirements.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿7,900</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(3)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(3)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isBeoA1Open && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoA1Open(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoA1Open(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beosound A1</h2>
            <h3 className="h3product">Bang & Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images4[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  Small size. Serious sound.
                </h2>
                <h3 className="mt-2">
                  With the largest woofer in its class, Beosound A1 delivers
                  dramatically deep bass. Not to mention clarity that lingers in
                  the air, and a presence that fills any space – all wrapped up
                  in a pack-friendly form.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿14,800</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(4)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(4)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isBeoH100Open && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoH100Open(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoH100Open(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beoplay H100</h2>
            <h3 className="h3product">Bang&Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images5[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  Ultimate over-ear headphones
                </h2>
                <h3 className="mt-2">
                  Beoplay H100 deliver immersive sound and a luxurious design
                  built to stand the test of time. These advanced headphones,
                  which are optimised for Dolby Atmos, feature titanium drivers
                  and next-level noise cancellation. Perfect for music, work,
                  and travel. Every purchase includes an exclusive leather pouch
                  to protect and carry your headphones in style.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿69,000</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(21)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(21)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isBeoH95Open && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoH95Open(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoH95Open(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beoplay H95</h2>
            <h3 className="h3product">Bang&Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images6[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  Premium over-ear headphones
                </h2>
                <h3 className="mt-2">
                  Moving. Meticulous. Mesmerising. Immerse yourself with our
                  adjustable noise-cancelling headphones that put a spin on
                  grab-and-go-listening.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿40,990</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(22)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(22)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isBeoElevenOpen && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoElevenOpen(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoElevenOpen(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beoplay ELEVEN</h2>
            <h3 className="h3product">Bang&Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images7[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  High-fidelity ANC earbuds
                </h2>
                <h3 className="mt-2">
                  Beoplay Eleven wireless earbuds boast improved noise
                  cancellation and multipoint Bluetooth for a seamless listening
                  experience anywhere.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿19,900</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(23)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(23)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isBeoPlayExOpen && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsBeoPlayExOpen(false);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setIsBeoPlayExOpen(false)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">Beoplay EX</h2>
            <h3 className="h3product">Bang&Olufsen</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  <img
                    src={images8[currentIndex]}
                    alt=""
                    className="productpic"
                  />
                  <ul className="ulpicbutton">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="picbutton"
                      >
                        ‹
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="picbutton"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  Premium wireless earbuds
                </h2>
                <h3 className="mt-2">
                  As versatile as they are beautiful, these wireless earbuds
                  with active noise cancellation bring deep sound and snug
                  comfort in one sleek package.
                </h3>
              </li>
            </ul>
            <h1 className="h1price">฿18,800</h1>
            <ul className="ulabbutton">
              <li>
                <button onClick={() => addToCart(24)} className="abbutton">
                  Add
                </button>
              </li>
              <li>
                <button onClick={() => addToBuy(24)} className="abbutton">
                  Buy
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {openProduct && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpenProduct(null);
          }}
          className="modalproductbg"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="modalProduct"
          >
            <button
              onClick={() => setOpenProduct(null)}
              className="closebutton"
            >
              <IoClose size={24} />
            </button>
            <h2 className="h2product">{openProduct.productName}</h2>
            <h3 className="h3product">{openProduct.productDescription}</h3>
            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  {" "}
                  {images.length > 0 && (
                    <img
                      src={images[currentIndex]}
                      alt={openProduct.productName}
                      className="productpic"
                    />
                  )}
                  {images.length > 1 && (
                    <ul className="ulsbpicbutton">
                      <li>
                        <button
                          onClick={() =>
                            setCurrentIndex((prev) =>
                              prev > 0 ? prev - 1 : images.length - 1
                            )
                          }
                          className="picbutton"
                        >
                          ‹
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            setCurrentIndex((prev) =>
                              prev < images.length - 1 ? prev + 1 : 0
                            )
                          }
                          className="picbutton"
                        >
                          ›
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li className="mt-11">
                <h2 className="text-black text-2xl font-semibold">
                  {openProduct.productHeadText}
                </h2>
                <h3 className="mt-2">{openProduct.productBrand}</h3>
              </li>
            </ul>
            <h1 className="h1price">
              ฿{Number(openProduct.productPrice).toLocaleString()}
            </h1>
            <ul className="ulabbutton">
              <li>
                <button
                  onClick={() => addToCart(openProduct.productId)}
                  className="abbutton"
                >
                  Add
                </button>
              </li>
              <li>
                <button
                  onClick={() => addToBuy(openProduct.productId)}
                  className="abbutton"
                >
                  Buy
                </button>
              </li>
            </ul>
            <p className="mt-auto font-light text-white text-center">
              {message}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
