import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  Line,
} from "recharts";

const COLORS = [
  "#10b981",
  "#6366f1",
  "#f97316",
  "#ef4444",
  "#14b8a6",
  "#a855f7",
];

const TH_MONTHS_ABBR = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function thaiLabel(date) {
  const m = TH_MONTHS_ABBR[date.getMonth()];
  const beYY = (date.getFullYear() + 543) % 100; // 2 หลัก
  return `${m} ${beYY.toString().padStart(2, "0")}`;
}
function padFromAugBE2568(raw) {
  // raw มาจาก API เดิม (year, month, label, revenue) — ไม่เชื่อ label ใช้ year/month เป็นหลัก
  const index = new Map(
    raw.map((x) => [`${x.year}-${x.month}`, Number(x.revenue || 0)])
  );
  const startBE = 2568,
    startMonth = 8; // สิงหา 68
  const start = new Date(startBE - 543, startMonth - 1, 1); // CE
  const months = 12; // แสดง 12 แท่ง (ส.ค.68 → ก.ค.69)
  const out = [];
  for (let i = 0; i < months; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    out.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      label: thaiLabel(d),
      revenue: index.get(key) ?? 0,
    });
  }
  return out;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [thisMonth, setThisMonth] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [categoryRevenue, setCategoryRevenue] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const [s, m, tm, tp, tc, cr, ro] = await Promise.all([
          api.get("/Dashboard/Summary"),
          api.get("/Dashboard/MonthlyRevenue"),
          api.get("/Dashboard/ThisMonthRevenue"),
          api.get("/Dashboard/TopProducts?top=5"),
          api.get("/Dashboard/TopCustomers?top=5"),
          api.get("/Dashboard/CategoryRevenue"),
          api.get("/Dashboard/RecentOrders?take=10"),
        ]);

        setSummary(s.data);
        const padded = padFromAugBE2568(Array.isArray(m.data) ? m.data : []);
        setMonthly(padded);

        setThisMonth(tm.data || null);
        setTopProducts(Array.isArray(tp.data) ? tp.data : []);
        setTopCustomers(Array.isArray(tc.data) ? tc.data : []);
        setCategoryRevenue(Array.isArray(cr.data) ? cr.data : []);
        setRecentOrders(Array.isArray(ro.data) ? ro.data : []);
      } catch (e) {
        console.error("Dashboard load error:", e);
        setErr(e?.response?.data || e.message || "โหลดข้อมูลล้มเหลว");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalCategoryRevenue = useMemo(
    () => categoryRevenue.reduce((acc, x) => acc + Number(x.revenue || 0), 0),
    [categoryRevenue]
  );

  if (loading)
    return <div className="min-h-screen bg-[#f7f8fa] p-8">Loading…</div>;

  if (err)
    return (
      <div className="min-h-screen bg-[#f7f8fa] p-8 text-red-600">
        เกิดข้อผิดพลาด: {String(err)}
      </div>
    );

  if (!summary)
    return <div className="min-h-screen bg-[#f7f8fa] p-8">ไม่มีข้อมูล</div>;

  return (
    <main className="min-h-screen bg-[#f7f8fa] p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card
          label="ยอดขายรวม"
          value={`฿${n(summary.totalRevenue)}`}
          sub="(เฉพาะที่ชำระแล้ว)"
        />
        <Card label="ออเดอร์ทั้งหมด" value={n(summary.totalOrders)} />
        <Card label="ผู้ใช้ทั้งหมด" value={n(summary.totalUsers)} />
        <Card label="สินค้าในระบบ" value={n(summary.totalProducts)} />
        <Card
          label="รายได้เดือนนี้"
          value={`฿${n(thisMonth?.revenue || 0)}`}
          sub={thisMonth?.label}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">รายได้รายเดือน</h2>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis tickFormatter={(v) => `฿${short(v)}`} />
              <Tooltip formatter={(v) => `฿${n(v)}`} />
              <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0f766e"
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">รายได้ตามหมวดหมู่</h2>
          {categoryRevenue.length === 0 ? (
            <p className="text-gray-500 text-center">ยังไม่มีข้อมูล</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryRevenue}
                    dataKey="revenue"
                    nameKey="categoryName"
                    outerRadius={110}
                    innerRadius={60}
                    paddingAngle={3}
                  >
                    {categoryRevenue.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `฿${n(v)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 text-sm text-gray-600 text-center">
                รวมทั้งหมด:{" "}
                <span className="font-semibold">
                  ฿{n(totalCategoryRevenue)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Panel title="สินค้าขายดี (Top 5)">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">สินค้า</th>
                <th className="py-2">จำนวน</th>
                <th className="py-2 text-right">รายได้</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.length === 0 ? (
                <tr>
                  <td className="py-4 text-gray-500" colSpan={3}>
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                topProducts.map((p) => (
                  <tr key={p.productId} className="border-b last:border-0">
                    <td className="py-2">{p.productName}</td>
                    <td className="py-2">{n(p.totalQty)}</td>
                    <td className="py-2 text-right">฿{n(p.revenue)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Panel>
        <Panel title="ลูกค้าที่มียอดสั่งซื้อสูงสุด (Top 5)">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">ลูกค้า</th>
                <th className="py-2">ออเดอร์</th>
                <th className="py-2 text-right">รายได้</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.length === 0 ? (
                <tr>
                  <td className="py-4 text-gray-500" colSpan={3}>
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                topCustomers.map((c) => (
                  <tr key={c.userId} className="border-b last:border-0">
                    <td className="py-2">
                      {c.userName}{" "}
                      <span className="text-gray-400">({c.email})</span>
                    </td>
                    <td className="py-2">{n(c.totalOrders)}</td>
                    <td className="py-2 text-right">฿{n(c.revenue)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Panel>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">ออเดอร์ล่าสุด</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">เลขออเดอร์</th>
                <th className="py-2">ลูกค้า</th>
                <th className="py-2">วันที่</th>
                <th className="py-2">สถานะ</th>
                <th className="py-2 text-right">ยอดชำระ</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td className="py-4 text-gray-500" colSpan={5}>
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                recentOrders.map((o) => (
                  <tr key={o.orderHistoryId} className="border-b last:border-0">
                    <td className="py-2">#{o.orderHistoryId}</td>
                    <td className="py-2">
                      {o.userName}{" "}
                      <span className="text-gray-400">({o.email})</span>
                    </td>
                    <td className="py-2">{fmtDate(o.orderDate)}</td>
                    <td className="py-2">
                      <Badge status={o.status} />
                    </td>
                    <td className="py-2 text-right">฿{n(o.actualPrice)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

/* Components */
function Card({ label, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}
function Panel({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
function Badge({ status }) {
  const color = useMemo(() => {
    const s = String(status).toLowerCase();
    if (s.includes("paid")) return "bg-emerald-100 text-emerald-700";
    if (s.includes("pending")) return "bg-yellow-100 text-yellow-700";
    if (s.includes("cancel")) return "bg-rose-100 text-rose-700";
    return "bg-gray-100 text-gray-700";
  }, [status]);
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}

/* Utils */
function n(x) {
  return Number(x || 0).toLocaleString();
}
function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString("th-TH");
  } catch {
    return iso;
  }
}
function short(v) {
  const n = Number(v || 0);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  return n.toString();
}
