// src/components/Navbar.jsx
import ShoppingCart from "/src/assets/icons8-cart-24.png";
import Menu from "/src/assets/icons8-menu.svg";
import React, { useState, useEffect } from "react";
import { api } from "../../services/api"; // <-- ใช้เรียก /Products/Suggest

function Navbar({
  onLoginClick,
  onRegisterClick,
  onCartClick,
  onMenuClick,
  onFavClick,
  favCount = 0,
  cartCount = 0,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ----- Search states -----
  const [search, setSearch] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [typingTimer, setTypingTimer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/pages/Home";
  };

  // ไปหน้าค้นหา
  const goSearch = () => {
    const q = (search || "").trim();
    window.location.href = `/pages/Search?q=${encodeURIComponent(q)}`;
  };

  // debounce suggest ขณะพิมพ์
  useEffect(() => {
    if (!search) {
      setSuggest([]);
      return;
    }
    if (typingTimer) clearTimeout(typingTimer);
    const t = setTimeout(async () => {
      try {
        const { data } = await api.get("/Product/Suggest", {
          params: { q: search },
        });
        setSuggest(Array.isArray(data) ? data : []);
        setShowSuggest(true);
      } catch {
        setSuggest([]);
      }
    }, 200);
    setTypingTimer(t);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    // ไม่มีข้อความ -> ล้างรายการ/ปิดกล่อง
    if (!search?.trim()) {
      setSuggest([]);
      return;
    }

    // debounce เรียก API
    if (typingTimer) clearTimeout(typingTimer);
    const t = setTimeout(async () => {
      try {
        const { data } = await api.get("/Product/Suggest", {
          params: { q: search, take: 8 },
        });
        // ต้องเป็น array ของชื่อสินค้า
        setSuggest(Array.isArray(data) ? data : []);
        setShowSuggest(true);
      } catch (err) {
        console.log("[Suggest][ERR]", err?.response || err);
        // ถ้า API พัง ให้ยังคงแสดงกล่องพร้อมข้อความ “ไม่พบ/กด Enter…”
        setSuggest([]);
        setShowSuggest(true);
      }
    }, 200);
    setTypingTimer(t);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#38393a] p-4 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
        <button onClick={onMenuClick} className="ml-0 md:-ml-14">
          <img src={Menu} alt="white Menu" />
        </button>

        <a
          href="/pages/Home"
          className="text-white text-2xl font-semibold font-playfair ml-0 md:-ml-[200px]"
        >
          Dontknow
        </a>

        {/* Search + Suggest (เดสก์ท็อป) */}
        <div className="hidden md:flex items-center md:ml-28 relative">
          <input
            type="text"
            placeholder="Search:"
            className="px-3 py-1 rounded-l-md border border-gray-300 focus:outline-none w-96"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggest(!!e.target.value); // เปิดกล่องทันทีเมื่อมีตัวอักษร
            }}
            onFocus={() => search && setShowSuggest(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goSearch();
              if (e.key === "Escape") setShowSuggest(false);
            }}
            onBlur={() => {
              // หน่วงเพื่อให้คลิกเลือกในดรอปดาวน์ได้
              setTimeout(() => setShowSuggest(false), 120);
            }}
          />
          <button
            className="bg-white text-[#222222] px-4 py-1 rounded-r-md border border-gray-300 hover:bg-gray-100 transition font-playfair"
            onClick={goSearch}
          >
            Search
          </button>

          {/* Suggest dropdown */}
          {showSuggest && (
            <div className="absolute top-[110%] left-0 w-96 z-[60]">
              <div className="rounded-md shadow-lg border bg-white overflow-hidden">
                {/* แถบสถานะโหลด/ผลลัพธ์ */}
                <div className="px-3 py-2 text-xs text-gray-500 border-b">
                  {search ? "ผลลัพธ์การค้นหา" : "พิมพ์เพื่อค้นหา"}
                </div>

                {/* รายการที่ได้จาก API */}
                {suggest.length > 0 ? (
                  <ul>
                    {suggest.map((name, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 truncate"
                          title={name}
                          onMouseDown={(e) => e.preventDefault()} // กัน blur
                          onClick={() => {
                            setSearch(name);
                            setShowSuggest(false);
                            window.location.href = `/pages/Search?q=${encodeURIComponent(
                              name
                            )}`;
                          }}
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  // กรณีว่าง: โชว์ “กำลังค้นหา..” หรือ “ไม่พบ”
                  <div className="px-3 py-3 text-sm text-gray-600">
                    {search
                      ? "ไม่พบสินค้า กด Enter เพื่อค้นหาทั้งหมด"
                      : "พิมพ์ชื่อสินค้าเพื่อค้นหา"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <ul className="flex space-x-4">
          <button
            onClick={onFavClick}
            className="text-white hover:text-gray-300 relative"
            aria-label="Favourites"
            title="Favourites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center leading-none">
                {favCount > 99 ? "99+" : favCount}
              </span>
            )}
          </button>

          <button
            onClick={onCartClick}
            className="text-white hover:text-gray-300 relative"
            aria-label="Shopping Cart"
          >
            <img src={ShoppingCart} alt="Shopping Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold leading-none flex items-center justify-center pointer-events-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <>
              <li>
                <a
                  href="/pages/Profile"
                  className="text-white hover:text-gray-300 font-playfair"
                >
                  Profile
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 font-playfair"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={onLoginClick}
                  className="text-white hover:text-gray-300 font-playfair"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={onRegisterClick}
                  className="text-white hover:text-gray-300 font-playfair"
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
