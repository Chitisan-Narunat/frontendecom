import React from 'react'
import Navbar from '../components/Navbar'
import { iconImages } from '../assets'
import { useNavigate } from 'react-router-dom';

function FAQ() {

    const navigate = useNavigate();
    const goTocontactus = () =>{
      navigate('/pages/contactus'); 
    }

    const navigate2 = useNavigate();
    const goToAboutUs = () =>{
        navigate2('/pages/AboutUs');
    }

  return (
    <main>
        <Navbar/>
        <div className='bg-white h-screen flex items-start justify-center'>
            <div className='container text-center'>
                <h1 className='text-4xl text-black mt-24 font-playfair font-bold'>FAQs</h1>
                <div className='border-2 rounded-full h-[40px] w-[170px] mx-auto flex items-center justify-center mt-4'>

                </div>
                <ul className='flex flex-row space-x-7 justify-center'>
                    <li>
                        <div className="relative mt-4 w-[820px]">
                            <img src={iconImages.search2} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"/>
                            <input type="text" placeholder="Search" className="h-[50px] w-full border-2 rounded-3xl py-1 pl-10 pr-4"/>
                        </div>
                    </li>
                    <li>
                        <div className='border-2 rounded-3xl h-[310px] w-[270px] mt-4'>
                            <h1 className='text-2xl font-bold font-sans py-4'>
                                Need Help?
                            </h1>
                            <ul className='flex flex-col space-y-3'>
                                <li>
                                    <button onClick={goTocontactus} className='border-2 rounded-2xl border-gray-600 w-[200px] h-[100px] hover hover:bg-gray-500 hover:text-white'>
                                        ติดต่อเรา<br />Contact Us
                                    </button>
                                </li>
                                <li>
                                    <button onClick={goToAboutUs} className='border-2 rounded-2xl border-gray-600 w-[200px] h-[100px] hover:bg-gray-500 hover:text-white'>
                                        เกี่ยวกับเรา<br />About Us
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul className='flex flex-row space-x-7'>
                    <li>
                        <div className='border-2 rounded-3xl h-fit w-[820px] -mt-[243px] ml-[81px]'>
                            <div className="p-6 text-left">
                                <h2 className="text-xl font-bold mb-4">คำถามยอดฮิต / Top FAQs</h2>
                                <div className="divide-y">
                                    <details className="group py-3" open>
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>เช็คสถานะคำสั่งซื้อยังไง? / How do I track my order?</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            ไปที่ <b>Profile &gt; คำสั่งซื้อ</b> หรือใส่ <b>Order No.</b> + อีเมลที่หน้า Track Order.
                                            ถ้าหาไม่เจอ ทัก <em>Contact Us</em> พร้อมหมายเลขสั่งซื้อได้เลย
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>จัดส่งใช้เวลากี่วัน? / Shipping times & options</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            กทม./ปริมณฑล ~1–2 วันทำการ, ต่างจังหวัด ~2–3 วันทำการ (มีด่วนพิเศษบางพื้นที่).
                                            ได้เลขพัสดุทางอีเมล/บัญชีผู้ใช้เมื่อแพ็กของเสร็จ
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>รับของที่หน้าร้านได้ไหม? / In-store pickup</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            ได้ เลือก <b>Pick up in-store</b> ตอนชำระเงิน เราแจ้งพร้อมรับภายใน ~2 ชม.
                                            นำ <b>Order No.</b> + บัตรประชาชน/บัตรบริษัทมาแสดง
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>เคลมประกันต้องใช้อะไรบ้าง? / Warranty claim</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            หลักฐานซื้อ, หมายเลขซีเรียล, อาการ/รูป/วิดีโอ ติดต่อผ่าน <em>Contact Us</em>.
                                            ทีมงานจะตรวจรับและแจ้งขั้นตอน/ระยะเวลา (ปกติ 7–14 วันทำการ)
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>คืน/เปลี่ยนสินค้าได้ไหม? / Returns & exchange</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            ภายใน 7 วันสำหรับสินค้าที่ไม่ได้เปิดใช้งาน/ครบกล่อง (ยกเว้นสิ่งที่สัมผัสร่างกายบางประเภท).
                                            DOA ภายใน 7 วัน เปลี่ยนตัวใหม่ตามเงื่อนไขแบรนด์
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>นัดทดลองฟังยังไง? / How to book a demo?</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            กด <b>Book a Demo</b> เลือกสาขา/วัน/เวลา ระบุรุ่นที่สนใจและขนาดห้อง
                                            เราส่งอีเมลยืนยัน + เพิ่มลงปฏิทินให้
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>ช่วยเลือกชุดเสียงตามห้อง/งบได้ไหม? / Help me choose</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            ส่ง <b>ขนาดห้อง, การใช้งาน (เพลง/หนัง/เกม), งบประมาณ</b> และแนวเสียงที่ชอบ
                                            ทีม Audio Specialist จะเสนอ 2–3 ตัวเลือกให้
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>Bluetooth/HDMI ARC ไม่ติด แก้ยังไง? / Troubleshooting</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            <b>BT:</b> ลบอุปกรณ์เดิม, รีสตาร์ท, อัปเดตเฟิร์มแวร์, จับคู่อีกครั้งใกล้อุปกรณ์. <br/>
                                            <b>ARC/eARC:</b> เปิด CEC/eARC บนทีวี, ใช้สาย HDMI คุณภาพ, ปิด-เปิดปลั๊ก 30 วินาที.
                                            ยังไม่ได้ ติดต่อเรา
                                        </div>
                                    </details>
                                    <details className="group py-3">
                                        <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                                            <span>อัปเดตเฟิร์มแวร์ยังไง? / Firmware update</span>
                                            <span className="ml-3 text-xl leading-none transition-transform group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="mt-2 text-sm text-neutral-700">
                                            ผ่านแอปของแบรนด์ (เช่น B&O, JBL, HK), ชาร์จแบต &gt; 50% และอยู่ใกล้ Wi-Fi/มือถือ
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </main>
  )
}

export default FAQ