import React, { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";

export default function ChatWidget({ user }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.userName || "",
    email: user?.email || "",
    message: ""
  });

  const [sentOk, setSentOk] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSend = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("กรุณากรอกชื่อ อีเมล และข้อความให้ครบ");
      return;
    }

    setLoading(true);
    setSentOk(false);

    await toast.promise(
      api.post("/Contact/Send", {
        name: form.name,
        email: form.email,
        message: form.message
      }),
      {
        loading: "กำลังส่งข้อความ...",
        success: "ส่งข้อความเรียบร้อย! เราจะตอบกลับทางอีเมลครับ",
        error: (err) =>
          "ส่งไม่สำเร็จ: " + (err?.response?.data || err.message || "unknown error"),
      }
    ).then(() => {
      setForm((f) => ({ ...f, message: "" }));
      setSentOk(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      {/* ปุ่มลอย (Floating Chat Button) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat"
        className="fixed bottom-5 right-5 z-50 rounded-full w-14 h-14 shadow-lg bg-black text-white grid place-items-center hover:scale-105 transition"
      >
        💬
      </button>
      {/* กล่องแชท */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-semibold text-gray-800">ช่วยเหลือ / แชทกับเรา</div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="ชื่อ"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="อีเมล"
              className="w-full border rounded-lg px-3 py-2"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="พิมพ์ข้อความ…"
              rows={4}
              className="w-full border rounded-lg px-3 py-2 resize-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full bg-black text-white rounded-lg py-2 font-medium disabled:opacity-50"
            >
              {loading ? "กำลังส่ง…" : "ส่งข้อความ"}
            </button>
            {sentOk && (
              <p className="text-green-600 text-sm text-center">
                ✅ ส่งข้อความเรียบร้อยแล้ว
              </p>
            )}
            {/* ลิงก์เสริม */}
            <div className="pt-3 border-t text-sm text-gray-600">
              <div className="font-medium mb-1">ดูเพิ่มเติม</div>
              <ul className="list-disc ml-5 space-y-1">
                <li><a href="/pages/FAQ" className="hover:underline">คำถามที่พบบ่อย (FAQ)</a></li>
                <li><a href="/pages/Contactus" className="hover:underline">ติดต่อเรา</a></li>
                <li><a href="/pages/Track" className="hover:underline">ติดตามพัสดุ</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}