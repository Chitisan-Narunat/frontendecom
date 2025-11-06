import Navbar from "/src/components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { getImageById } from "/Styles/product-images";
import { jwtDecode } from "jwt-decode";
import Endbar from "../components/Endbar";
import { api } from "../../services/api";
import ProductGrid from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";

function Speakers() {
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

  const [openProduct, setOpenProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setLoadingImgs] = useState(false);

  const navigate = useNavigate();
  const goToHome = () => navigate("/pages/Home");
  const goToSpeakers = () => navigate("/pages/Speakers");
  const goToHeadphones = () => navigate("/pages/Headphones");
  const goToSoundbars = () => navigate("/pages/Soundbars");
  const goToAddress = () => navigate("/pages/Address");
  const goToTrack = () => navigate("/pages/Track");

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1: ขอ OTP, 2: ใส่ OTP + รหัสใหม่
  const [fpEmail, setFpEmail] = useState("");
  const [fpRequestId, setFpRequestId] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPass, setFpNewPass] = useState("");
  const [fpMsg, setFpMsg] = useState("");
  const [fpSending, setFpSending] = useState(false);
  const [fpResendWait, setFpResendWait] = useState(0);

  const [form, setForm] = useState({ email: "", passWord: "" });
  const [form2, setForm2] = useState({ email: "", userName: "", passWord: "" });

  const [message, setMessage] = useState();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const [message2] = useState();
  const handleChange2 = (e) =>
    setForm2({ ...form2, [e.target.name]: e.target.value });

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

  useEffect(() => {
    if (isCartVisible) refreshCart();
  }, [isCartVisible]);

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

      setOpenProduct(false);
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
        alert("กรุณาเข้าสู่ระบบก่อน");
        navigate("/pages/Home");
        return;
      }
      const APIRES = await api.post(
        "/OrderItem/AddItem",
        { ProductId, Quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const d = APIRES.data;
      const message = typeof d === "string" ? d : d?.message || "";
      const needAddress =
        message === "No Address" ||
        (typeof d !== "string" && d?.needAddress === true);

      if (needAddress) {
        alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }

      const oid = Number(APIRES.data?.orderId ?? APIRES.data?.OrderId);
      if (Number.isFinite(oid) && oid > 0)
        localStorage.setItem("currentOrderId", String(oid));
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

  const API = "http://localhost:5283/api";
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/Product/GetProduct`)
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const cat1 = products.filter((p) => (p.categoryId ?? p.CategoryId) === 1);
  const [favList, setFavList] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(false);

  useEffect(() => {
    if (!openProduct) return;
    let alive = true;
    setLoadingImgs(true);
    fetch(`${API}/products/${openProduct.productId}/images-blob`)
      .then((r) => r.json())
      .then((list) => {
        if (!alive) return;
        const urls = list
          .sort(
            (a, b) => b.isPrimary - a.isPrimary || a.sortOrder - b.sortOrder
          )
          .map(
            (x) =>
              `${API}/products/${openProduct.productId}/images-blob/${x.id}?v=${x.createdAt}`
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

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) refreshCart();
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) refreshCart();
    else setCart({ orderId: 0, items: [], actualPrice: 0 });
  }, [isLoginOpen]);

  const cartCount = Array.isArray(cart?.items) ? cart.items.length : 0;

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
      await api.post("/Authen/Register/Resend", { requestId: fpRequestId }); // ใช้ endpoint Resend เดิม
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
    <main className="min-h-screen">
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
          title="Speakers"
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-0">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              aria-label="Close login"
            >
              <IoClose size={24} />
            </button>
            <div className="p-6 sm:p-7">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                Login
              </h2>
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
                  className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
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
        </div>
      )}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-0">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              aria-label="Close register"
            >
              <IoClose size={24} />
            </button>
            <div className="p-6 sm:p-7">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                Register
              </h2>
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
                  className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
                  onClick={handleRegisterInit}
                  type="button"
                >
                  Register
                </button>
                <p className="mt-auto font-light text-red-600 text-center">
                  {message2}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
      {isOtpOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-0">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOtpOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              aria-label="Close OTP"
            >
              <IoClose size={24} />
            </button>
            <div className="p-6 sm:p-7">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                Verify OTP
              </h2>
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
                  className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
                  onClick={handleVerifyOtp}
                >
                  {isVerifying ? "Verifying..." : "ยืนยัน"}
                </button>

                <button
                  disabled={resendWait > 0}
                  className="w-full border py-2 rounded disabled:opacity-50"
                  onClick={handleResendOtp}
                >
                  {resendWait > 0
                    ? `ส่งใหม่ได้ใน ${resendWait}s`
                    : "ส่งรหัสใหม่"}
                </button>

                <p className="mt-2 text-center text-sm text-gray-600">
                  {otpMsg}
                </p>
                <p className="text-[11px] text-center text-gray-400 break-all">
                  RequestId: {requestId}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCartRendered && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsCartOpen(false);
          }}
          className={`fixed inset-0 bg-black/50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out ${
            isCartVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`bg-white dark:bg-neutral-900 dark:text-neutral-100 rounded-lg shadow-xl w-96 relative flex flex-col transform transition-transform duration-300 ease-in-out ${
              isCartVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-black/10 dark:border-white/10">
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              >
                <IoClose size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center">Cart</h2>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.items.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-neutral-400 py-10">
                  ตะกร้าว่าง
                </p>
              ) : (
                cart.items.map((item) => (
                  <div
                    key={item.orderItemsId}
                    className="w-full bg-gray-100/80 dark:bg-neutral-800 rounded-lg p-3 flex gap-3"
                  >
                    {/* รูปสินค้า */}
                    <div className="w-24 h-20 rounded-md overflow-hidden bg-white dark:bg-neutral-700 flex items-center justify-center shrink-0">
                      <img
                        src={getImageById(item.productId)}
                        alt={item.name || ""}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* รายละเอียด */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start">
                        <h3 className="font-semibold text-sm truncate pr-6">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.orderItemsId)}
                          className="ml-auto text-gray-400 hover:text-black dark:hover:text-white"
                        >
                          <IoClose size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-neutral-400 line-clamp-2">
                        {item.productDescription}
                      </p>

                      {/* quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decQty(item.orderItemsId, item.qty)}
                          className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-md hover:bg-gray-200 dark:hover:bg-white/10"
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => incQty(item.orderItemsId, item.qty)}
                          className="w-6 h-6 border border-gray-400 dark:border-gray-500 rounded-md hover:bg-gray-200 dark:hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-2 flex justify-end">
                        <span className="text-sm font-semibold bg-gray-200 dark:bg-neutral-700 px-3 py-1 rounded-md">
                          ฿{Number(item.subtotal).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-black/10 dark:border-white/10 bg-gray-50 dark:bg-neutral-950 rounded-b-lg flex items-center">
              <div className="text-xl font-bold">
                ฿{Number(cart.actualPrice || 0).toLocaleString()}
              </div>
              <button
                onClick={goToAddress}
                className="ml-auto w-28 h-10 bg-gray-900 text-white rounded-xl hover:bg-black transition"
              >
                Checkout
              </button>
            </div>
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
          className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex justify-end items-stretch
             transition-opacity duration-300 ease-out
             ${isFavVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`bg-white rounded-lg shadow-2xl p-6 w-96 relative
               transform transition-transform duration-300 ease-out
               ${isFavVisible ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Header: ขนาดใกล้เคียงของเดิม */}
            <div className="sticky top-0 bg-white pb-3 -mt-2 -mx-6 px-6 pt-2 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Favourite</h2>
                <button
                  onClick={() => setIsFavOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
                  aria-label="Close favourites"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {loadingFavs
                  ? "กำลังโหลด..."
                  : `ทั้งหมด ${favList.length} รายการ`}
              </div>
            </div>
            <ul
              className="mt-[14px] space-y-5 overflow-y-auto pr-1"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              {loadingFavs ? (
                <li className="text-center text-gray-500 py-10">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-transparent animate-spin mx-auto mb-3" />
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
                      <div className="w-full h-28 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition group relative flex space-x-3">
                        <div className="w-24 h-20 flex justify-center items-start mt-4 ml-4">
                          <img
                            className="w-24 h-20 object-contain"
                            src={img}
                            alt={name}
                          />
                        </div>
                        {/* ข้อมูลสินค้า */}
                        <div className="flex-1 pr-10 pt-3">
                          <div className="flex">
                            <h3 className="font-bold truncate">{name}</h3>
                            <button
                              className="absolute right-5 top-3 text-gray-500 hover:text-black p-1 rounded-md hover:bg-gray-100"
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
                              aria-label="remove favourite"
                            >
                              <IoClose size={17} />
                            </button>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2">
                            {desc}
                          </p>
                          <div className="bg-gray-200 rounded-sm w-full h-2 mt-4" />
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="bg-white text-black w/full max-w-5xl rounded-xl relative overflow-hidden"
            role="dialog"
            aria-label={openProduct.productName}
          >
            <button
              onClick={() => setOpenProduct(null)}
              className="absolute top-3 right-3 text-black/80 hover:text-black"
              aria-label="Close product"
            >
              <IoClose size={24} />
            </button>
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-2xl font-semibold">
                {openProduct.productName}
              </h2>
              <h3 className="text-sm sm:text-base text-black/80">
                {openProduct.productDescription}
              </h3>
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="relative">
                  <div className="w-full aspect-square bg-black/30 rounded-lg overflow-hidden">
                    {images.length > 0 && (
                      <img
                        src={images[currentIndex]}
                        alt={openProduct.productName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev > 0 ? prev - 1 : images.length - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) =>
                            prev < images.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {openProduct.productHeadText}
                  </h2>
                  <h3 className="mt-2 text-black/80">
                    {openProduct.productBrand}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold mt-44">
                    {" "}
                    ฿{Number(openProduct.productPrice).toLocaleString()}
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => addToCart(openProduct.productId)}
                      className="flex-1 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => addToBuy(openProduct.productId)}
                      className="flex-1 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
                    >
                      Buy
                    </button>
                  </div>
                  <p className="mt-3 text-center text-sm text-red-400">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Speakers;
