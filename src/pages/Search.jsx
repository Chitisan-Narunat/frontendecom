import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductCard";
import { api } from "../../services/api";
import { IoClose } from "react-icons/io5";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // modal states
  const [openProduct, setOpenProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  // absolute URL helper
  const normUrl = (url) => {
    const u = url || "";
    if (!u) return "/placeholder.png";
    if (/^https?:\/\//i.test(u)) return u;
    const base = (api.defaults.baseURL || "").replace(/\/+$/, "");
    return base + (u.startsWith("/") ? u : `/${u}`);
  };

  const readQuery = () => {
    const p = new URLSearchParams(location.search);
    return (p.get("q") || "").trim();
  };

  // โหลดรายการสินค้าตาม keyword
  const load = async (keyword) => {
    try {
      setLoading(true);
      const { data } = await api.get("/Product/Search", {
        params: { q: keyword, page: 1, pageSize: 48 },
      });

      const rawItems = Array.isArray(data?.items) ? data.items : [];
      const normalized = rawItems.map((p) => {
        const raw = p.primaryImageUrl ?? p.PrimaryImageUrl ?? "";
        return { ...p, primaryImageUrl: normUrl(raw) };
      });

      setItems(normalized);
      setTotal(Number(data?.total || 0));
    } catch (e) {
      console.error("[Search][ERR]", e?.response || e);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keyword = readQuery();
    setQ(keyword);
    load(keyword);
  }, [location.search]);

  // โหลดรายละเอียดสินค้าจาก /Product/GetProduct (ใช้ตอนเปิด modal)
  const loadProductDetail = async (productId) => {
    try {
      const { data } = await api.get("/Product/GetProduct");
      const list = Array.isArray(data) ? data : [];
      const found = list.find(
        (p) => p.productId === productId || p.ProductId === productId
      );
      return found || null;
    } catch (err) {
      console.error("[LoadProductDetail][ERR]", err);
      return null;
    }
  };

  // โหลดรูปทั้งหมดของสินค้า
  const loadImagesForProduct = async (product) => {
    const pid = product.productId ?? product.ProductId;
    try {
      const { data } = await api.get(`/products/${pid}/images-blob`);
      const list = Array.isArray(data) ? data : [];

      list.sort(
        (a, b) =>
          (b.isPrimary === true) - (a.isPrimary === true) ||
          (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );

      const urls = list.map((x) =>
        normUrl(
          `/products/${pid}/images-blob/${x.id}?v=${
            Date.parse(x.createdAt || "") || Date.now()
          }`
        )
      );

      setImages(
        urls.length
          ? urls
          : [normUrl(product.primaryImageUrl ?? product.PrimaryImageUrl ?? "/placeholder.png")]
      );
      setCurrentIndex(0);
    } catch (err) {
      console.log("[LoadImages][ERR]", err?.response || err);
      const fallback = product.primaryImageUrl ?? product.PrimaryImageUrl ?? "/placeholder.png";
      setImages([normUrl(fallback)]);
      setCurrentIndex(0);
    }
  };

  // เมื่อคลิกสินค้า -> โหลดข้อมูลละเอียดก่อนเปิด modal
  const handleSelect = async (p) => {
    const detail = await loadProductDetail(p.productId ?? p.ProductId);
    const merged = { ...p, ...(detail || {}) };
    setOpenProduct(merged);
    await loadImagesForProduct(merged);
  };

  // ปิด modal ด้วย Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenProduct(null);
    if (openProduct) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [openProduct]);

  const addToCart = async (productId) => {
    try {
      await api.post("/OrderItem/Add", null, {
        params: { ProductId: productId, Quantity: 1 },
      });
      setMessage("เพิ่มลงตะกร้าแล้ว");
      setTimeout(() => setMessage(""), 1500);
    } catch (err) {
      setMessage(String(err?.response?.data || "เพิ่มตะกร้าไม่สำเร็จ"));
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const addToBuy = async (productId) => {
    try {
      await api.post("/OrderItem/Add", null, {
        params: { ProductId: productId, Quantity: 1 },
      });
      navigate("/pages/Address");
    } catch (err) {
      setMessage(String(err?.response?.data || "เพิ่มตะกร้าไม่สำเร็จ"));
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const getField = (obj, ...keys) => {
    for (const k of keys) {
      if (obj?.[k] != null && obj[k] !== "") return obj[k];
    }
    return "";
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] pt-24 pb-16">
      <Navbar />
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold">
            ผลการค้นหา: <span className="text-gray-600">{q || "ทั้งหมด"}</span>
          </h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-1">พบ {total} รายการ</p>
          )}
        </header>

        {loading && <div className="text-gray-600">กำลังโหลด...</div>}

        {!loading && items.length === 0 && (
          <div className="rounded-xl bg-white border border-dashed border-gray-300 p-10 text-center">
            ไม่พบสินค้า
          </div>
        )}

        {!loading && items.length > 0 && (
          <ProductGrid
            title=""
            items={items}
            token={localStorage.getItem("token")}
            onSelect={handleSelect}
            onFavChange={() => {}}
          />
        )}
      </div>

      {/* ======= MODAL ======= */}
      {openProduct && (
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpenProduct(null);
          }}
          className="modalproductbg"
        >
          <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
            <button onClick={() => setOpenProduct(null)} className="closebutton">
              <IoClose size={24} />
            </button>

            <h2 className="h2product">
              {getField(openProduct, "productName", "ProductName")}
            </h2>
            <h3 className="h3product">
              {getField(openProduct, "productDescription", "ProductDescription")}
            </h3>

            <ul className="flex flex-row space-x-32">
              <li>
                <div className="divproduct">
                  {images.length > 0 && (
                    <img
                      src={images[currentIndex]}
                      alt={getField(openProduct, "productName", "ProductName")}
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
                <h2 className="text-black dark:text-white text-2xl font-semibold">
                  {getField(openProduct, "productHeadText", "ProductHeadText")}
                </h2>
                <h3 className="mt-2 text-black dark:text-neutral-200">
                  {getField(openProduct, "productBrand", "ProductBrand")}
                </h3>
              </li>
            </ul>

            <h1 className="h1price">
              ฿
              {Number(
                getField(openProduct, "productPrice", "ProductPrice") || 0
              ).toLocaleString()}
            </h1>

            <ul className="ulabbutton">
              <li>
                <button
                  onClick={() =>
                    addToCart(openProduct.productId ?? openProduct.ProductId)
                  }
                  className="abbutton"
                >
                  Add
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    addToBuy(openProduct.productId ?? openProduct.ProductId)
                  }
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