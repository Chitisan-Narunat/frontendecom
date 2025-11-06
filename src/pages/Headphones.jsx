import Navbar from "/src/components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { getImageById } from "/Styles/product-images";
import { jwtDecode } from "jwt-decode";
import Endbar from "../components/Endbar";
import ProductGrid from "../components/ProductCard";
import { api } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

function Headphones() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartRendered, setIsCartRendered] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isFavOpen, setIsFavOpen] = useState(false);
  const [isFavRendered, setIsFavRendered] = useState(false);
  const [isFavVisible, setIsFavVisible] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [requestId, setRequestId] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendWait, setResendWait] = useState(0);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [fpStep, setFpStep] = useState(1);
  const [fpEmail, setFpEmail] = useState("");
  const [fpRequestId, setFpRequestId] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPass, setFpNewPass] = useState("");
  const [fpMsg, setFpMsg] = useState("");
  const [fpSending, setFpSending] = useState(false);
  const [fpResendWait, setFpResendWait] = useState(0);

  const navigate = useNavigate();
  const goToHome = () => navigate("/pages/Home");
  const goToSpeakers = () => navigate("/pages/Speakers");
  const goToSoundbars = () => navigate("/pages/Soundbars");
  const goToHeadphones = () => navigate("/pages/Headphones");
  const goToAddress = () => navigate("/pages/Address");
  const goToTrack = () => navigate("/pages/Track");

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

  const [form, setForm] = useState({ email: "", passWord: "" });
  const [form2, setForm2] = useState({ email: "", userName: "", passWord: "" });
  const [message, setMessage] = useState();

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const [message2] = useState();
  
  const handleChange2 = (e) =>
    setForm2({
      ...form2,
      [e.target.name]: e.target.value,
    });

  const auth = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

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
          window.location.reload();
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
    try {
      const { data } = await api.post("/Authen/Register/Init", {
        email: form2.email,
        userName: form2.userName,
        passWord: form2.passWord,
      });

      setRequestId(data?.requestId || "");
      setIsRegisterOpen(false);
      setIsOtpOpen(true);
      setOtp("");
      setOtpMsg("รหัส OTP ถูกส่งไปที่อีเมลแล้ว");
      setResendWait(30);
    } catch (error) {
      const msg = error?.response?.data;
      alert(typeof msg === "string" ? msg : "Register failed");
    }
  };

  const handleVerifyOtp = async () => {
    if (!requestId || !otp) {
      setOtpMsg("กรุณากรอก OTP");
      return;
    }
    try {
      setIsVerifying(true);
      const { data } = await api.post("/Authen/Register/Verify", {
        requestId,
        otp,
      });

      if (data?.verified) {
        setOtpMsg("ยืนยันสำเร็จ กำลังเข้าสู่ระบบ...");
        if (data.token) localStorage.setItem("token", data.token);
        setTimeout(() => {
          setIsOtpOpen(false);
          window.location.reload();
        }, 500);
      } else {
        setOtpMsg("ยืนยันไม่สำเร็จ");
      }
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

  const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });

  useEffect(() => {
    if (isCartVisible) refreshCart();
  }, [isCartVisible]);

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

  const addToCart = async (ProductId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อน");
        setOpenProduct(false);
        setIsLoginOpen(true);
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
        toast.error("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }

      const oid = Number(API.data?.orderId ?? API.data?.OrderId);
      if (Number.isFinite(oid) && oid > 0) {
        localStorage.setItem("currentOrderId", String(oid));
      }

      toast.success("เพิ่มลงตะกร้าแล้ว");
      setOpenProduct(false);
      setIsCartOpen(true);
    } catch (error) {
      const status = error?.response?.status;
      const raw = error?.response?.data;
      const msg = typeof raw === "string" ? raw : raw?.message;

      if (status === 404 && msg === "No Address") {
        toast.error("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
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
        alert("กรุณาเข้าสู่ระบบก่อน");
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

      setOpenProduct(false);
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

  const API_BASE = "http://localhost:5283/api";
  const [products, setProducts] = useState([]);
  const [openProduct, setOpenProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setLoadingImgs] = useState(false);

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

  const cat1 = products.filter((p) => (p.categoryId ?? p.CategoryId) === 2);

  useEffect(() => {
    if (!openProduct) return;
    let alive = true;
    setLoadingImgs(true);
    fetch(`${API_BASE}/products/${openProduct.productId}/images-blob`)
      .then((r) => r.json())
      .then((list) => {
        if (!alive) return;
        const urls = list
          .sort(
            (a, b) => b.isPrimary - a.isPrimary || a.sortOrder - b.sortOrder
          )
          .map(
            (x) =>
              `${API_BASE}/products/${openProduct.productId}/images-blob/${x.id}?v=${x.createdAt}`
          );
        setImages(urls);
        setCurrentIndex(0);
      })
      .catch(console.error)
      .finally(() => setLoadingImgs(false));
    return () => {
      alive = false;
    };
  }, [openProduct]);

  const token = localStorage.getItem("token");

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

  const cartCount = Array.isArray(cart?.items) ? cart.items.length : 0;

  useEffect(() => {
    const tk = localStorage.getItem("token");
    if (tk) refreshCart();
  }, []);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    if (tk) refreshCart();
    else setCart({ orderId: 0, items: [], actualPrice: 0 });
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

  // ยืนยัน OTP + ตั้งรหัสใหม่
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
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onFavClick={() => setIsFavOpen(true)}
        favCount={favList.length}
        cartCount={cartCount}
      />
      <div className="bg-[#edeef0] h-[1800px] flex items-start justify-center">
        <ProductGrid
          title="Headphones"
          items={cat1}
          token={token}
          hasRemove={true}
          onSelect={(p) => setOpenProduct(p)}
          onFavChange={(pid, next, meta) => {
            if (meta?.requireLogin) {
              setIsLoginOpen(true);
              return;
            }
            setProducts((prev) =>
              prev.map((x) =>
                (x.productId ?? x.ProductId) === pid
                  ? { ...x, isFavourite: next }
                  : x
              )
            );
            setFavList((prev) => {
              const exists = prev.some(
                (x) => (x.productId ?? x.ProductId) === pid
              );
              if (next) {
                if (!exists) {
                  const full =
                    (cat1 || []).find(
                      (x) => (x.productId ?? x.ProductId) === pid
                    ) ||
                    (products || []).find(
                      (x) => (x.productId ?? x.ProductId) === pid
                    );
                  return full ? [full, ...prev] : prev;
                }
                return prev;
              } else {
                return prev.filter((x) => (x.productId ?? x.ProductId) !== pid);
              }
            });
          }}
        />
      </div>
      <Endbar />
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
              <p className="mt-auto font-light text-red-600 text-center">
                {message2}
              </p>
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
      {isFavRendered && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsFavOpen(false);
          }}
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out ${
            isFavVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`bg-white rounded-lg shadow-lg p-6 w-96 relative transform transition-transform duration-300 ease-in-out ${
              isFavVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsFavOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Favourite</h2>
            <hr className="border-black border-t-2 w-full" />
            <ul className="mt-[14px] space-y-5">
              {loadingFavs ? (
                <li className="text-center text-gray-500 py-10">
                  กำลังโหลด...
                </li>
              ) : favList.length === 0 ? (
                <li className="text-center text-gray-500 py-10">
                  ยังไม่มีสินค้าที่ชอบ
                </li>
              ) : (
                favList.map((item) => {
                  const pid = item.productId ?? item.ProductId;
                  const name = item.productName ?? item.ProductName ?? "";
                  const desc =
                    item.productDescription ?? item.ProductDescription ?? "";
                  const img =
                    (item.primaryImageUrl ?? item.PrimaryImageUrl) ||
                    "/placeholder.png";
                  return (
                    <li key={pid}>
                      <div className="w-full h-28 rounded-lg bg-gray-100 flex space-x-3">
                        <div className="w-24 h-20 flex justify-center items-start">
                          <img
                            className="w-24 h-20 ml-4 object-contain"
                            src={img}
                            alt={name}
                          />
                        </div>
                        <ul className="flex flex-col flex-1 pr-10">
                          <li className="flex flex-row">
                            <h3 className="mt-3 font-bold truncate">{name}</h3>
                            <button
                              className="absolute right-9 mt-2"
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
                            >
                              <IoClose size={17} />
                            </button>
                          </li>
                          <li>
                            <h3 className="text-xs font-sans line-clamp-2">
                              {desc}
                            </h3>
                          </li>
                          <li>
                            <div className="bg-gray-200 rounded-sm w-full h-4" />
                          </li>
                        </ul>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
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
                <button onClick={goToHome}>Homes</button>
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
    </main>
  );
}

export default Headphones;
