import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { getImageById } from "/Styles/product-images";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../services/api";

const currency = (n) => `฿${Number(n || 0).toLocaleString("th-TH")}`;

const shippingOptions = [
  { key: "standard", label: "ส่งปกติ", price: 40 },
  { key: "express", label: "ส่งด่วน", price: 60 },
  { key: "sameDay", label: "ส่งภายในวันนี้", price: 100 },
];

function Address() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(); // shipping index
  const [activeIndex2, setActiveIndex2] = useState(); // payment index (UI เท่านั้น)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const auth = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const navigate = useNavigate();
  const goToHome = () => navigate("/pages/Home");
  const navigate2 = useNavigate();
  const goToSpeakers = () => navigate2("/pages/Speakers");
  const navigate3 = useNavigate();
  const goToHeadphones = () => navigate3("/pages/Headphones");
  const navigate11 = useNavigate();
  const goToSoundbars = () => navigate11("/pages/Soundbars");

  const [address, setAddress] = useState({ addressId: 0, items: [] });
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedAddressId");
    if (saved) setSelectedAddressId(Number(saved));
  }, []);
  useEffect(() => {
    if (selectedAddressId)
      localStorage.setItem("selectedAddressId", String(selectedAddressId));
  }, [selectedAddressId]);

  async function refreshAddress() {
    try {
      const { data } = await api.get(`/Address/UiAddress2`, {
        headers: auth(),
      });
      const items = Array.isArray(data?.items) ? data.items : [];
      const apiDefaultId = Number(data?.addressId) || 0;
      const fallbackId = items[0]?.addressId ?? 0;

      setAddress({ addressId: apiDefaultId || fallbackId, items });

      setSelectedAddressId((prev) => {
        if (prev && items.some((a) => a.addressId === prev)) return prev;
        return apiDefaultId || fallbackId;
      });
    } catch (err) {
      console.log("[UiAddress2][ERR]", err?.response || err);
      setAddress({ addressId: 0, items: [] });
      setSelectedAddressId(0);
    }
  }
  useEffect(() => {
    refreshAddress();
  }, []);

  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    AddressName: "",
    Province: "",
    District: "",
    PostalCode: "",
    PhoneNumber: "",
  });

  const resetForm = () => {
    setForm({
      FirstName: "",
      LastName: "",
      AddressName: "",
      Province: "",
      District: "",
      PostalCode: "",
      PhoneNumber: "",
    });
  };

  const closeAddressModal = () => {
    resetForm();
    setIsAddressOpen(false);
  };

  const [, setMessage] = useState();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddress = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const promise = api.post(
      "/Address/FillAddress",
      {
        FirstName: form.FirstName,
        LastName: form.LastName,
        AddressName: form.AddressName,
        Province: form.Province,
        District: form.District,
        PostalCode: form.PostalCode,
        PhoneNumber: form.PhoneNumber,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.promise(promise, {
      loading: "กำลังบันทึกที่อยู่...",
      success: "เพิ่มที่อยู่สำเร็จ 🎉",
      error: "บันทึกไม่สำเร็จ กรุณาลองใหม่ ❌",
    });

    try {
      const { data } = await promise;
      await refreshAddress();
      setIsAddressOpen(false);
      setMessage(data);
      setForm({
        FirstName: "",
        LastName: "",
        AddressName: "",
        Province: "",
        District: "",
        PostalCode: "",
        PhoneNumber: "",
      });
    } catch (error) {
      console.error("Address Error:", error);
      setMessage(error.response?.data || "failed");
    }
  };

  const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });
  async function refreshCart() {
    const { data } = await api.get(`/OrderItem/Current`, {
      headers: auth(),
    });
    setCart({
      orderId: data?.orderId ?? 0,
      items: data?.items ?? [],
      actualPrice: data?.actualPrice ?? 0,
    });
  }
  useEffect(() => {
    refreshCart();
  }, []);

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
      `/OrderItem/EditQuantity`,
      { quantity: qty - 1 },
      {
        params: { OrderItemsId: rowId },
        headers: { "Content-Type": "application/json", ...auth() },
      }
    );
    refreshCart();
  }

  useEffect(() => {
    const savedIdx = localStorage.getItem("selectedShippingIndex");
    if (savedIdx !== null) setActiveIndex(Number(savedIdx));
  }, []);

  const shippingPrice =
    activeIndex != null && shippingOptions[activeIndex]
      ? Number(shippingOptions[activeIndex].price)
      : 0;

  const grandTotal = Number(cart.actualPrice || 0) + shippingPrice;

  function selectShipping(idx) {
    setActiveIndex(idx);
    localStorage.setItem("selectedShippingIndex", String(idx));
    const opt = shippingOptions[idx];
    localStorage.setItem("shippingMethod", opt.key);
    localStorage.setItem("shippingPrice", String(opt.price));
    localStorage.setItem("shippingSetAt", String(Date.now()));
  }

  const Purchase = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderId = Number(localStorage.getItem("currentOrderId"));

      const API = await api.put("/OrderItem/EditStatus", null, {
        params: {
          OrderId: orderId,
          AddressId: selectedAddressId,
          ShippingFee: shippingPrice,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsConfirmOpen(false);
      navigate("/pages/Track");
      setMessage(API.data);
      toast.success("ชำระเงินสำเร็จ");
    } catch (error) {
      const status = error?.response?.status;
      const raw = error?.response?.data;
      const msg =
        typeof raw === "string"
          ? raw
          : raw?.message || raw?.title || raw?.detail || error?.message;

      if (status === 404 && msg === "No Address") {
        toast.error("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
        navigate("/pages/Address");
        return;
      }
      toast.error("ไม่มีของ");
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

  const onlyDigits = (s) => s.replace(/\D/g, "");

  const handleChangeDigitsPostalCode = (e, max) => {
    const { name, value } = e.target;
    const v = onlyDigits(value).slice(0, max);
    setForm((prev) => ({ ...prev, [name]: v }));
  };

  const handleChangeDigitsPhoneNumber = (
    e,
    maxLen,
    opts = { mustStartZero: true }
  ) => {
    const { name } = e.target;
    let v = (e.target.value || "").replace(/\D/g, "");
    if (opts.mustStartZero && v.length > 0 && v[0] !== "0") {
      v = "0" + v;
    }
    if (v.length > maxLen) v = v.slice(0, maxLen);
    setForm((f) => ({ ...f, [name]: v }));
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9]">
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-black">
              ชำระเงินและจัดส่ง
            </h1>
            <p className="text-gray-500 mt-1">
              ยืนยันที่อยู่ เลือกวิธีจัดส่งและช่องทางชำระเงิน
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">
                <div className="p-6 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-black">
                    ที่อยู่จัดส่งสินค้า
                  </h2>
                  <button
                    onClick={() => setIsAddressOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-black text-white text-sm hover:bg-gray-800"
                  >
                    เพิ่มที่อยู่
                  </button>
                </div>
                <div className="px-6 pb-6">
                  {address.items.length === 0 ? (
                    <div className="text-gray-500 text-sm">
                      ยังไม่มีที่อยู่ โปรดเพิ่มที่อยู่ก่อน
                    </div>
                  ) : (
                    <ul className="flex flex-wrap gap-3">
                      {address.items.map((it) => (
                        <li
                          key={it.addressId}
                          className={
                            "p-4 rounded-xl border transition " +
                            (selectedAddressId === it.addressId
                              ? "border-black ring-1 ring-black/10 bg-gray-50"
                              : "border-gray-200 bg-white hover:border-gray-300")
                          }
                        >
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="selectedAddress"
                              className="mt-1 accent-black"
                              checked={selectedAddressId === it.addressId}
                              onChange={() =>
                                setSelectedAddressId(it.addressId)
                              }
                            />
                            <div className="min-w-0">
                              <div className="font-medium text-black break-words">
                                {it.firstname} {it.lastname} {it.phoneNumber}
                              </div>
                              <div className="text-sm text-gray-600 break-words">
                                {it.name} {it.district} {it.province}{" "}
                                {it.postalCode}
                              </div>
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-black mb-4">
                    รูปแบบการจัดส่ง
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {shippingOptions.map((opt, idx) => {
                      const active = activeIndex === idx;
                      return (
                        <li key={opt.key}>
                          <button
                            type="button"
                            onClick={() => selectShipping(idx)}
                            className={
                              "w-full h-[140px] rounded-2xl border transition shadow-sm hover:shadow " +
                              (active
                                ? "bg-[#f5f5f7] border-black"
                                : "bg-white border-gray-200")
                            }
                          >
                            <div className="h-full w-full flex flex-col justify-center px-5">
                              <div className="flex items-center justify-between">
                                <span className="text-base font-medium text-black">
                                  {opt.label}
                                </span>
                                <span className="text-base font-semibold text-black">
                                  {currency(opt.price)}
                                </span>
                              </div>
                              <div className="mt-3 h-[6px] w-full rounded-full bg-gray-100 overflow-hidden">
                                <div
                                  className={
                                    "h-full " +
                                    (active ? "bg-black" : "bg-gray-300")
                                  }
                                  style={{ width: active ? "100%" : "30%" }}
                                />
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-black mb-4">
                    ช่องทางการจ่ายเงิน
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        id: 0,
                        name: "ชำระผ่านบัตร/QR (จำลอง)",
                        desc: "รองรับบัตรหลักและสแกนจ่าย",
                      },
                      {
                        id: 1,
                        name: "เก็บเงินปลายทาง (COD)",
                        desc: "มีค่าธรรมเนียมตามผู้ให้บริการ",
                      },
                    ].map((m) => {
                      const active = activeIndex2 === m.id;
                      return (
                        <li key={m.id}>
                          <button
                            type="button"
                            onClick={() => setActiveIndex2(m.id)}
                            className={
                              "w-full h-[120px] rounded-2xl border text-left p-5 transition " +
                              (active
                                ? "bg-[#f5f5f7] border-black"
                                : "bg-white border-gray-200 hover:border-gray-300")
                            }
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-base font-medium text-black">
                                  {m.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {m.desc}
                                </div>
                              </div>
                              <div
                                className={
                                  "w-5 h-5 rounded-full border " +
                                  (active
                                    ? "bg-black border-black"
                                    : "border-gray-300")
                                }
                              />
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
            <aside className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-medium text-black mb-4">
                  สรุปรายการ
                </h3>

                {cart.items.length === 0 ? (
                  <div className="text-center text-gray-500 border border-dashed rounded-xl p-8">
                    ตะกร้าว่าง
                  </div>
                ) : (
                  <>
                    <ul className="space-y-4 max-h-[300px] overflow-auto pr-1">
                      {cart.items.map((it) => (
                        <li key={it.orderItemsId} className="flex gap-3">
                          <img
                            src={getImageById(it.productId)}
                            alt={it.name || ""}
                            className="w-16 h-16 rounded-xl border border-gray-200 object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="truncate">
                                <div className="text-sm font-medium text-black truncate">
                                  {it.name}
                                </div>
                                <div className="text-xs text-gray-500 line-clamp-2">
                                  {it.productDescription}
                                </div>
                              </div>
                              <button
                                className="text-gray-500 hover:text-black"
                                onClick={() => removeItem(it.orderItemsId)}
                                aria-label="remove"
                              >
                                <IoClose size={18} />
                              </button>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">
                                  จำนวน
                                </span>
                                <button
                                  className="w-6 h-6 rounded-full border border-gray-300 hover:bg-gray-100"
                                  onClick={() =>
                                    decQty(it.orderItemsId, it.qty)
                                  }
                                  aria-label="decrease"
                                >
                                  –
                                </button>
                                <span className="text-sm w-6 text-center">
                                  {it.qty}
                                </span>
                                <button
                                  className="w-6 h-6 rounded-full border border-gray-300 hover:bg-gray-100"
                                  onClick={() =>
                                    incQty(it.orderItemsId, it.qty)
                                  }
                                  aria-label="increase"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-sm font-semibold">
                                {currency(it.subtotal)}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <hr className="my-4 border-gray-200" />

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">ราคาสินค้ารวม</span>
                        <span className="font-medium">
                          {currency(cart.actualPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">ค่าจัดส่ง</span>
                        <span className="font-medium">
                          {currency(shippingPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-base">
                      <span className="font-semibold text-black">
                        ยอดรวมทั้งสิ้น
                      </span>
                      <span className="font-extrabold text-black">
                        {currency(grandTotal)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={setIsConfirmOpen}
                      disabled={!selectedAddressId || cart.items.length === 0}
                      title={!selectedAddressId ? "กรุณาเลือกที่อยู่ก่อน" : ""}
                      className="mt-5 w-full h-11 rounded-xl bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ชำระเงิน
                    </button>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
      {isMenuRendered && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
          className={
            "fixed inset-0 bg-black/50 flex justify-start items-stretch z-50 transition-opacity duration-300 ease-in-out " +
            (isMenuVisible ? "opacity-100" : "opacity-0 pointer-events-none")
          }
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className={
              "bg-white shadow-lg p-6 w-72 relative transform transition-transform duration-300 ease-in-out " +
              (isMenuVisible ? "translate-x-0" : "-translate-x-full")
            }
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 left-6 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            <ul className="flex space-y-3 flex-col mt-16 ml-2 font-medium text-lg">
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
            </ul>
          </div>
        </div>
      )}
      {isAddressOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">เพิ่มที่อยู่</h3>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setIsAddressOpen(false)}
                aria-label="close"
              >
                <IoClose size={22} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleAddress}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ชื่อ (FirstName)"
                  name="FirstName"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10"
                  value={form.FirstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="นามสกุล (LastName)"
                  name="LastName"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10"
                  value={form.LastName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="ที่อยู่ (AddressName)"
                  name="AddressName"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10 sm:col-span-2"
                  value={form.AddressName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="จังหวัด (Province)"
                  name="Province"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10"
                  value={form.Province}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="อำเภอ/เขต (District)"
                  name="District"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10"
                  value={form.District}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="รหัสไปรษณีย์ (PostalCode)"
                  name="PostalCode"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10"
                  value={form.PostalCode}
                  onChange={(e) => handleChangeDigitsPostalCode(e, 5)}
                  required
                />
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="เบอร์โทร (PhoneNumber)"
                  name="PhoneNumber"
                  className="w-full border border-gray-300 rounded-xl px-3 h-11 focus:outline-none focus:ring-2 focus:ring-black/10"
                  value={form.PhoneNumber}
                  onChange={(e) => handleChangeDigitsPhoneNumber(e, 10)}
                  required
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAddressModal}
                  className="px-4 h-11 rounded-xl border border-gray-300 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 h-11 rounded-xl bg-black text-white hover:bg-gray-800"
                >
                  บันทึกที่อยู่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsConfirmOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsConfirmOpen(false);
            if (e.key === "Enter") Purchase();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div
            className="relative w-[420px] max-w-[92vw] rounded-2xl bg-white dark:bg-neutral-900 dark:text-neutral-100 shadow-2xl border border-black/10 dark:border-white/10
                 transform transition-all duration-200 ease-out animate-[fadeIn_.2s_ease-out]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-3 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 grid place-items-center text-xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight">
                    ยืนยันการชำระเงิน
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    ตรวจสอบรายละเอียดก่อนกดยืนยัน
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="rounded-xl bg-gray-50 dark:bg-neutral-800/60 p-4 border border-gray-200 dark:border-neutral-700">
                <ul className="text-sm space-y-2">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-neutral-300">
                      ค่าสินค้า
                    </span>
                    <span className="font-semibold">
                      ฿{Number(cart?.actualPrice ?? 0).toLocaleString()}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-neutral-300">
                      ค่าจัดส่ง
                    </span>
                    <span className="font-semibold">
                      ฿{Number(shippingPrice ?? 0).toLocaleString()}
                    </span>
                  </li>
                  <li className="border-t border-dashed border-black/10 dark:border-white/10 pt-2 mt-1 flex items-center justify-between">
                    <span className="font-semibold">ยอดสุทธิ</span>
                    <span className="text-lg font-extrabold">
                      ฿
                      {Number(
                        (cart?.actualPrice ?? 0) + (shippingPrice ?? 0)
                      ).toLocaleString()}
                    </span>
                  </li>
                </ul>
              </div>
              {selectedAddressId && (
                <div className="rounded-xl bg-gray-50 dark:bg-neutral-800/60 p-4 border border-gray-200 dark:border-neutral-700">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    ที่อยู่จัดส่ง
                  </div>
                  <div className="text-sm">
                    {address?.items?.find(
                      (a) => a.addressId === selectedAddressId
                    ) ? (
                      (() => {
                        const a = address.items.find(
                          (a) => a.addressId === selectedAddressId
                        );
                        return (
                          <>
                            <div className="font-medium">
                              {a.firstname} {a.lastname} • {a.phoneNumber}
                            </div>
                            <div className="text-gray-600 dark:text-neutral-300">
                              {a.name} {a.district} {a.province} {a.postalCode}
                            </div>
                          </>
                        );
                      })()
                    ) : (
                      <div className="text-gray-500">—</div>
                    )}
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-neutral-400">
                เมื่อกดยืนยัน ระบบจะตัดยอดและสร้างคำสั่งซื้อให้คุณทันที
              </p>
            </div>
            <div className="px-6 pb-6 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="h-10 px-4 rounded-xl border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition text-sm font-medium"
              >
                ยกเลิก
              </button>
              <button
                onClick={Purchase}
                className="h-10 px-5 rounded-xl bg-black text-white hover:bg-gray-800 transition text-sm font-semibold"
              >
                ยืนยันการชำระเงิน
              </button>
            </div>
            <button
              onClick={() => setIsConfirmOpen(false)}
              aria-label="ปิด"
              className="absolute top-3 right-3 p-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Address;
