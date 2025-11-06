import React from "react";
import Navbar from "../components/Navbar";
import {
  IoIosCheckmarkCircle
} from "react-icons/io";
import {
  IoTimeOutline,
  IoSparklesOutline,
  IoRocketOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoChatbubblesOutline,
  IoStorefrontOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline
} from "react-icons/io5";
import meena from '/src/assets/563386224_18374261965150416_5706055306884998264_n.jpg';


const Stat = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 text-center">
    <div className="text-3xl font-semibold tracking-tight text-black">{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

const ValueCard = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 hover:shadow transition">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
        <Icon size={18} />
      </div>
      <h4 className="text-base font-medium text-black">{title}</h4>
    </div>
    <p className="text-sm text-gray-600 mt-3 leading-6">{desc}</p>
  </div>
);

const Step = ({ year, title, desc }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-black" />
    <div className="text-xs text-gray-500">{year}</div>
    <div className="text-base font-medium text-black mt-0.5">{title}</div>
    <div className="text-sm text-gray-600 mt-1 leading-6">{desc}</div>
  </div>
);

const members = [
  { name: "Chitisan Narunat", role: "Founder / Developer", img: meena },
  { name: "Mina Sasane", role: "Brand / Content", img: meena },
  { name: "Naru Tan", role: "Audio Specialist", img: meena },
  { name: "Wish Us Better", role: "UX / Visual", img: meena },
];

const AboutUs = () => {

  return (
    <main className="min-h-screen bg-[#f6f7f9]">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-black">
                เราเชื่อในเสียงที่ดี <br className="hidden md:block" />
                และประสบการณ์ที่ตั้งใจออกแบบ
              </h1>
              <p className="text-gray-600 mt-4 leading-7">
                ร้านออดิโอพรีเมียมที่คัดเฉพาะสินค้าที่ “ดีจริง” มาพร้อมบริการหลังการขายที่เข้าใจผู้ใช้
                ทุกการตัดสินใจของเราขับเคลื่อนด้วยคุณภาพ ความซื่อสัตย์ และรายละเอียดเล็กๆ ที่ทำให้คุณยิ้มได้เมื่อกดเล่นเพลงโปรด
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <IoIosCheckmarkCircle className="text-black" /> สินค้าของแท้ รับประกันศูนย์
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <IoIosCheckmarkCircle className="text-black" /> คัดรุ่นฮิต เสียงเป็นธรรมชาติ
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <IoIosCheckmarkCircle className="text-black" /> ส่งเร็ว แพ็คดี มีบริการช่วยเหลือ
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-3xl border border-gray-200 bg-white/80 backdrop-blur overflow-hidden flex items-center justify-center">
                <div className="w-full h-full grid grid-cols-3 gap-2 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="rounded-2xl bg-gray-100 border border-gray-200" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <Stat label="ลูกค้าพึงพอใจ" value="98%" />
            <Stat label="แบรนด์พรีเมียม" value="12+" />
            <Stat label="การจัดส่งสำเร็จ" value="10k+" />
            <Stat label="รีวิวเฉลี่ย" value="4.9/5" />
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-8 lg:p-12">
            <h2 className="text-2xl font-semibold text-black tracking-tight">พันธกิจของเรา</h2>
            <p className="text-gray-600 mt-3 leading-7">
              ทำให้ทุกคนเข้าถึง “คุณภาพเสียงที่ใช่” โดยไม่ต้องเดาเองทั้งหมด เราฟังและทดสอบก่อนเพื่อแนะนำตรงไปตรงมา
              ตั้งแต่หูฟังตัวแรกจนถึงลำโพงคู่ใจชุดใหญ่ เราจะอยู่ข้างๆ ในทุกขั้นตอน
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <ValueCard
                icon={IoSparklesOutline}
                title="เลือกสิ่งที่ดีที่สุด"
                desc="คัดสินค้ารุ่น/สเปคที่คุ้มค่าสำหรับการใช้งานจริง ไม่ใช่แค่สเปคบนกระดาษ"
              />
              <ValueCard
                icon={IoShieldCheckmarkOutline}
                title="โปร่งใสและจริงใจ"
                desc="ราคา/การรับประกันชัดเจน แนะนำรุ่นที่เหมาะกับคุณ ไม่ยัดเยียด"
              />
              <ValueCard
                icon={IoChatbubblesOutline}
                title="บริการที่เข้าถึงง่าย"
                desc="แชทตอบไว คู่มือใช้งาน/ทริคการจูนเสียง สอนตั้งค่าให้ฟังได้เพลิน"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-semibold text-black tracking-tight">เส้นทางของเรา</h3>
              <p className="text-gray-600 mt-3 leading-7">
                จากงานอดิเรกสู่แบรนด์ที่ใส่ใจในรายละเอียด ทุกก้าวเติบโตเกิดจากเสียงของลูกค้า
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
                <div className="inline-flex items-center gap-2">
                  <IoTimeOutline /> เริ่มต้นจากรีวิวเล็ก ๆ
                </div>
                <div className="inline-flex items-center gap-2">
                  <IoRocketOutline /> เติบโตด้วยคุณภาพ
                </div>
                <div className="inline-flex items-center gap-2">
                  <IoPeopleOutline /> สร้างคอมมูนิตี้คนรักเสียง
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-8">
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200" />
                  <div className="space-y-6">
                    <Step year="2022" title="เปิดเพจรีวิวอุปกรณ์เสียง"
                      desc="แชร์ประสบการณ์การฟังจริง ช่วยคนหาแนวเสียงที่ชอบ"
                    />
                    <Step year="2023" title="เปิดร้านออนไลน์เต็มรูปแบบ"
                      desc="เริ่มคัดสินค้าพรีเมียม รับประกันศูนย์ ส่งไว"
                    />
                    <Step year="2024" title="เพิ่มบริการปรึกษา & จูนเสียง"
                      desc="ทีมงานช่วยเลือกอุปกรณ์ให้เข้ากับไลฟ์สไตล์/เพลงที่ฟัง"
                    />
                    <Step year="2025" title="เปิด Pop-up Listening Space"
                      desc="มุมลองฟังแบบส่วนตัวและเวิร์กช็อปเล็ก ๆ สำหรับคอมมูนิตี้"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-8 lg:p-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-2xl font-semibold text-black tracking-tight">ทีมเล็กที่จริงจัง</h3>
              <p className="text-sm text-gray-500">เรารักเสียงเพลงและรักการแก้ปัญหาให้ลูกค้า</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {members.map((m, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white/80 p-5">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="aspect-square rounded-xl object-cover border border-gray-200"
                  />
                  <div className="mt-4">
                    <div className="text-black font-medium">{m.name}</div>
                    <div className="text-sm text-gray-500">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-8">
              <h3 className="text-2xl font-semibold text-black tracking-tight">ลองฟังได้ที่หน้าร้าน (Pop-up)</h3>
              <p className="text-gray-600 mt-2 leading-7">
                นัดหมายลองฟังล่วงหน้าเพื่อจัดชุดอุปกรณ์ให้เหมาะกับเพลงที่คุณฟัง
                เรามีทั้ง in-ear/on-ear/over-ear และลำโพงหลายแนวเสียงให้ทดสอบ
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 text-black font-medium">
                    <IoLocationOutline /> สถานที่
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    CentralWorld Pop-up Space ชั้น 3 (เสาร์-อาทิตย์)
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 text-black font-medium">
                    <IoCallOutline /> โทร
                  </div>
                  <div className="text-sm text-gray-600 mt-1">02-123-4567</div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 text-black font-medium">
                    <IoMailOutline /> อีเมล
                  </div>
                  <div className="text-sm text-gray-600 mt-1">support@yourstore.com</div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/pages/Contact"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-black text-white hover:bg-gray-800"
                >
                  <IoStorefrontOutline className="mr-2" /> นัดลองฟัง / ติดต่อเรา
                </a>
              </div>
            </div>

            <div className="lg:col-span-1 rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-8">
              <h4 className="text-lg font-medium text-black">เหตุผลที่ลูกค้ากลับมาซื้อซ้ำ</h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center mt-0.5">
                    <IoSparklesOutline size={14} />
                  </span>
                  รีวิวตรงไปตรงมา—ไม่อวยท่วม
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center mt-0.5">
                    <IoShieldCheckmarkOutline size={14} />
                  </span>
                  สินค้าของแท้ รับประกันศูนย์ และช่วยเคลม
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center mt-0.5">
                    <IoPeopleOutline size={14} />
                  </span>
                  บริการหลังการขาย—ช่วยตั้งค่า/จูนเสียงให้เข้าที่
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-gray-200 p-5">
                <div className="text-sm text-gray-600 leading-6">
                  “ซื้อหูฟังตามที่ร้านแนะนำ เสียงออกมาถูกใจมาก สาย R&B ฟังเพลินสุด ๆ
                  ทีมงานช่วยสอนตั้งค่า EQ ให้ด้วย ประทับใจ”
                </div>
                <div className="text-sm text-black font-medium mt-3">— คุณพีท, ลูกค้าประจำ</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-gray-200 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <div>© {new Date().getFullYear()} YourStore. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="/pages/Home" className="hover:text-black">Home</a>
              <a href="/pages/Speakers" className="hover:text-black">Speakers</a>
              <a href="/pages/Headphones" className="hover:text-black">Headphones</a>
              <a href="/pages/Soundbars" className="hover:text-black">Soundbars</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default AboutUs;