import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar"; 
import { IoClose } from "react-icons/io5";

const currency = (n) => `฿${Number(n || 0).toLocaleString()}`;

const formatDT = (iso) => {
  try {
    return new Date(iso).toLocaleString("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

const findCurrentIndex = (timeline) => {
  if (!Array.isArray(timeline) || timeline.length === 0) return -1;
  const now = Date.now();
  for (let i = 0; i < timeline.length; i++) {
    const t = new Date(timeline[i].at).getTime();
    const next = timeline[i + 1] ? new Date(timeline[i + 1].at).getTime() : null;
    const isActive = next ? now >= t && now < next : now >= t;
    if (isActive) return i;
  }
  if (now >= new Date(timeline[timeline.length - 1].at).getTime()) return timeline.length - 1;
  return -1;
};

const StatusDot = ({ state }) => {
  const cls =
    state === "active"
      ? "bg-green-600 text-white"
      : state === "done"
      ? "bg-gray-400 text-white"
      : "bg-gray-200 text-gray-200";
  const symbol = state === "active" ? "✓" : "•";
  return (
    <span
      className={
        "absolute -start-2.5 flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white " +
        cls
      }
    >
      {symbol}
    </span>
  );
};

const VerticalTrack = ({ total, activeIndex }) => (
  <div className="absolute left-[6px] top-0 bottom-0 w-[2px]">
    <div className="absolute inset-0 bg-gray-200 rounded-full" />
    {activeIndex >= 0 && total > 0 && (
      <div
        className="absolute left-0 w-full rounded-full"
        style={{
          top: 0,
          height:
            total > 1
              ? `calc(${(activeIndex / (total - 1)) * 100}% + 12px)`
              : "12px",
          background:
            "linear-gradient(180deg, rgba(16,185,129,1) 0%, rgba(16,185,129,1) 70%, rgba(229,231,235,1) 100%)",
        }}
      />
    )}
  </div>
);

const Timeline = ({ timeline }) => {
  const data = Array.isArray(timeline) ? timeline : [];
  const activeIndex = useMemo(() => findCurrentIndex(data), [data]);

  if (data.length === 0) {
    return <div className="text-xs text-gray-400">ยังไม่มีข้อมูลไทม์ไลน์การขนส่ง</div>;
  }

  return (
    <div className="relative pl-5">
      <VerticalTrack total={data.length} activeIndex={activeIndex} />
      <ol className="relative">
        {data.map((t, i) => {
          let state = "future";
          if (i === activeIndex) state = "active";
          else if (i < activeIndex) state = "done";
          return (
            <li key={i} className="mb-6 ms-4 relative">
              <StatusDot state={state} />
              <time className="block text-xs text-gray-500">{formatDT(t.at)}</time>
              <h4
                className={
                  "text-sm sm:text-base transition-colors " +
                  (state === "active"
                    ? "text-green-700 font-semibold"
                    : state === "done"
                    ? "text-gray-600"
                    : "text-gray-400")
                }
              >
                {t.label}
              </h4>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const StatusBadge = ({ text }) => {
  const map = {
    กำลังจัดเตรียมสินค้า: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    อยู่ระหว่างขนส่ง: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    กำลังนำจ่าย: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
    จัดส่งสำเร็จแล้ว: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  };
  const cls = map[text] || "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{text}</span>;
};

const OrderCard = ({ order, onView }) => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">ออเดอร์ #{order.orderHistoryId}</div>
        <StatusBadge text={order.trackingStatus} />
      </div>
      <div className="text-sm text-gray-500">{formatDT(order.orderDate)}</div>
      <div className="text-xl font-bold">{currency(order.actualPrice)}</div>
      <div className="mt-2">
        <Timeline timeline={order.trackingTimeline || []} />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => onView(order)}
          className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  </div>
);

const DetailModal = ({ open, onClose, order }) => {
  if (!open || !order) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold">รายละเอียดการจัดส่ง</h3>
          <button className="text-gray-500 hover:text-black" onClick={onClose} aria-label="close">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">หมายเลขออเดอร์</div>
              <div className="font-medium">#{order.orderHistoryId}</div>
            </div>
            <div>
              <div className="text-gray-500">วันที่สั่งซื้อ</div>
              <div className="font-medium">{formatDT(order.orderDate)}</div>
            </div>
            <div>
              <div className="text-gray-500">ยอดชำระ</div>
              <div className="font-medium">{currency(order.actualPrice)}</div>
            </div>
            <div>
              <div className="text-gray-500">สถานะปัจจุบัน</div>
              <div className="font-medium">{order.trackingStatus}</div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Timeline timeline={order.trackingTimeline || []} />
          </div>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border hover:bg-gray-100">
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 animate-pulse">
    <div className="h-6 w-40 bg-gray-200 rounded mb-3" />
    <div className="h-4 w-56 bg-gray-200 rounded mb-3" />
    <div className="h-6 w-28 bg-gray-200 rounded mb-4" />
    <div className="space-y-4 pl-5 relative">
      <div className="absolute left-[6px] top-0 bottom-0 w-[2px] bg-gray-200" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="ms-4">
          <div className="absolute -start-2.5 w-5 h-5 rounded-full bg-gray-200 ring-4 ring-white" />
          <div className="h-3 w-40 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-60 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  </div>
);

const Track = () => {
  // ---------- เมนู Drawer State (จะถูกควบคุมจาก Navbar ผ่าน prop) ----------
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // เปิดเมนูจาก Navbar
  const openMenu = () => setIsMenuOpen(true);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuRendered(true);
      const t = setTimeout(() => setIsMenuVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setIsMenuVisible(false);
      const t = setTimeout(() => setIsMenuRendered(false), 300);
      return () => clearTimeout(t);
    }
  }, [isMenuOpen]);

  // ---------- Tracking data ----------
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/Tracking/MyOrders", { params: { _t: Date.now() } });
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data || e.message || "โหลดรายการติดตามไม่สำเร็จ");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const empty = !loading && orders.length === 0;

  // เนวิเกตปุ่มในเมนู (ใส่ลิงก์ตามจริงของโปรเจ็กต์)
  const goTo = (path) => (window.location.href = path);

  return (
    <main className="min-h-screen bg-[#f6f7f9] pt-24 pb-16">
      {/* ส่ง handler ให้ Navbar เรียกเปิดเมนู */}
      <Navbar onMenuClick={openMenu} />

      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">ติดตามสถานะพัสดุ</h1>
          <p className="text-gray-600 mt-1">ดูความคืบหน้าการจัดส่งของคำสั่งซื้อของคุณแบบเรียลไทม์</p>
        </header>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {empty && (
          <div className="rounded-2xl bg-white border border-dashed border-gray-300 p-10 text-center">
            <div className="text-2xl font-semibold mb-2">ยังไม่มีรายการติดตาม</div>
            <div className="text-gray-600">ไปเลือกช้อปสินค้า แล้วกลับมาติดตามสถานะที่นี่ได้เลย</div>
            <a
              href="/pages/All"
              className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800"
            >
              ไปหน้าสินค้าทั้งหมด
            </a>
          </div>
        )}

        {!loading && !empty && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((o) => (
              <OrderCard key={o.orderHistoryId} order={o} onView={setViewing} />
            ))}
          </div>
        )}
      </div>

      <DetailModal open={!!viewing} order={viewing} onClose={() => setViewing(null)} />

      {/* ---------- Menu Drawer Modal (เรียกใช้จาก Navbar) ---------- */}
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
                      <button onClick={() => goTo("/pages/Homes")}>Homes</button>
                    </li>
                    <li>
                      <button onClick={() => goTo("/pages/Speakers")}>Speakers</button>
                    </li>
                    <li>
                      <button onClick={() => goTo("/pages/Headphones")}>Headphones</button>
                    </li>
                    <li>
                      <button onClick={() => goTo("/pages/Soundbars")}>Soundbars</button>
                    </li>
                    <li>
                      <button onClick={() => goTo("/pages/Track")}>Tracking</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
    </main>
  );
};

export default Track;