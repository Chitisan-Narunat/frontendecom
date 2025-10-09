import React from 'react'
import { iconImages } from '../assets'

function Endbar() {
  return (
    <div className='bg-gray-400 h-52'>
        <ul className='flex space-x-12 flex-row backdrop:font-semibold text-xs text-white mt-4 ml-4 absolute'>
            <li className='flex flex-col space-y-2'>
                <h1 className='text-2xl'>Dontknow</h1>
                <h2>ร้าน Dontknow เป็นร้านขายเครืื่องเสียง โดยนำเข้า Marshall Devialet Bang&Olufsen และแบรนด์ชั้นนำต่างๆมาวางขายในประเทศไทย
                    <br/>มีสาขาหลากหลายและมีเว็ปไซท์ที่สามารถนัดทดองมาฟังจริงๆได้ไำด่ไรำด่ไรำด่ไำรนด่ไรำนด่ไำน่ดนนนนไำ
                    <br/>ฟหกห่กืฟา่หกืฟ่าหืกา่ฟหืก่าืหก่าืห่าำได่ไำรด่นไำ่ดนรไำ่ดไำดไำด้ไำรีดดดดดดนนนไนำ้ำไดำไดรนำไร่นรนำ่
                    <br/>
                </h2>
            </li>
            <li className='flex flex-col space-y-2'>
                <h1 className='text-xl'>Quick Link</h1>
                <a href="/pages/AboutUs">About Us</a>
                <a href="/pages/contactus">Contact Us</a>
                <a href="/pages/FAQ">FAQs</a>
                <a href="">Privacy policy</a>
            </li>
            <li className='flex flex-col space-y-2'>
                <h1 className='text-xl'>Follow Us</h1>
                <ul>
                    <li className='flex flex-row space-x-2 justify-center'>
                        <img src={iconImages.tiktok} alt="tiktokicon" className='w-7 h-7 -mt-1' onClick={() => window.open('https://www.tiktok.com/@wishusbetter', '_blank', 'noopener,noreferrer')}/>
                        <img src={iconImages.ig} alt="" className='w-7 h-7 -mt-1' onClick={() => window.open('https://www.instagram.com/wishusbetter/', '_blank', 'noopener,noreferrer')}/>
                        <img src={iconImages.x} alt="" className='w-7 h-7 -mt-1' onClick={() => window.open('https://x.com/renebaee06', '_blank', 'noopener,noreferrer')}/>
                    </li>
                </ul>
            </li>
            <li className='flex flex-col space-y-2'>
                <h1 className='text-xl'>Language</h1>
                <select name="Roles" className="w-fit bg-gray-400 rounded-lg text-center justify-center">
                    <option>Thai</option>
                    <option>English</option>
                </select>
            </li>
        </ul>
    </div>
    )
}

export default Endbar