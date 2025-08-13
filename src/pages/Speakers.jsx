import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

import Beolit20 from "/src/assets/beolit-20-001.png";
import Bo5 from "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Perspective-0003-s1200x1200px.png";
import Bo6 from "/src/assets/Beosound_A5_Weave-Image_1.png";
import Bo7 from "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0034-Perspective-1200x1200.png";
import Bo13 from "/src/assets/SLRPII_CC_015_RGB.webp";
import Bo14 from "/src/assets/1_HK_ONYX_STUDIO_8_CHAMPAGNE_HERO_0154_x3.png"
import Bo15 from "/src/assets/HK_GO_AND_PLAY_3_HERO_BLACK_43488_x7.png"
import Bo16 from "/src/assets/HK_AURA_STUDIO3_320_HERO_x4.png"
import Bo17 from "/src/assets/HK_AURA_STUDIO_4_BLACK_HERO_CLOUD_41834_x7.png"
import Bo18 from "/src/assets/JBL_Flip_7_Tomorrowland_Hero_1605x1605px_1024x1024.webp"
import Bo19 from "/src/assets/2_JBL_PULSE_5_FRONT_535x535px_600x600.webp"
import Bo20 from "/src/assets/JBL_XTREME_3_HERO_535x535px_1024x1024.png"
import Bo21 from "/src/assets/JBL_BOOMBOX3_WIFI_HERO_535x535px_1024x1024.png"
import Bo22 from "/src/assets/4.JBL_BOOMBOX3_WIFI_FRONT_2_535x535px_1024x1024.png.webp"
import Bo23 from "/src/assets/พื้นหลัง emberton-iii-front-desktop-7 ถูกเอาออก.png"
import Bo24 from "/src/assets/พื้นหลัง Gallery-Desktop-Middleton-II-Cream-01 ถูกเอาออก.png"
import Bo25 from "/src/assets/พื้นหลัง gallery-assets-desktop-6 ถูกเอาออก.png"
import Bo26 from "/src/assets/พื้นหลัง willen-ii-front-desktop-1 ถูกเอาออก.png"
import Bo27 from "/src/assets/พื้นหลัง a3e6efc4-8cca-b630-ce13-685a8e3813fb ถูกเอาออก.png"


function Speakers({onBeoLit20Click, onBeoA5Click, onBeoExClick, onBeoA1Click, onOnyx8Click, onGoPlayClick, onAura3Click, onOnyx9Click, onFlip7ExClick, onPulse5Click, onXtremeClick, onBoomClick, onEmberClick, onMiddleClick, onKilburnClick, onWillenClick}) {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartRendered, setIsCartRendered] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isBeoLit20Open, setIsBeoLit20Open] = useState(false);
    const [isBeoA5Open, setIsBeoA5Open] = useState(false);
    const [isBeoExOpen, setIsBeoExOpen] = useState(false);
    const [isBeoA1Open, setIsBeoA1Open] = useState(false);
    const [isOnyx8Open, setIsOnyx8Open] = useState(false);
    const [isGoPlayOpen, setIsGoPlayOpen] = useState(false);
    const [isAura3Open, setIsAura3Open] = useState(false);
    const [isOnyx9Open, setIsOnyx9Open] = useState(false);
    const [isFlip7ExOpen, setIsFlip7ExOpen] = useState(false);
    const [isPulse5Open, setIsPulse5Open] = useState(false);
    const [isXtremeOpen, setIsXtremeOpen] = useState(false);
    const [isBoomOpen, setIsBoomOpen] = useState(false);
    const [isEmberOpen, setIsEmberOpen] = useState(false);
    const [isMiddleOpen, setIsMiddleOpen] = useState(false);
    const [isKilburnOpen, setIsKilburnOpen] = useState(false);
    const [isWillenOpen, setIsWillenOpen] = useState(false);


    { ("onClick")
    onBeoLit20Click = (() => setIsBeoLit20Open(true));
    onBeoA5Click = (() => setIsBeoA5Open(true));
    onBeoExClick = (() => setIsBeoExOpen(true));
    onBeoA1Click = (() => setIsBeoA1Open(true));
    onOnyx8Click = (() => setIsOnyx8Open(true));
    onGoPlayClick = (() => setIsGoPlayOpen(true));
    onAura3Click = (() => setIsAura3Open(true));
    onOnyx9Click = (() => setIsOnyx9Open(true));
    onFlip7ExClick = (() => setIsFlip7ExOpen(true));
    onPulse5Click = (() => setIsPulse5Open(true));
    onXtremeClick = (() => setIsXtremeOpen(true));
    onBoomClick = (() => setIsBoomOpen(true));
    onEmberClick = (() => setIsEmberOpen(true));
    onMiddleClick = (() => setIsMiddleOpen(true));
    onKilburnClick = (() => setIsKilburnOpen(true));
    onWillenClick = (() => setIsWillenOpen(true));

    
    }    
    
    const images = [
        "/src/assets/beolit-20-001.png",
        "/src/assets/BL20_greey_front_2.png",
        "/src/assets/BL20_grey_side2.png"
    ];

    const images2 =[
        "/src/assets/Beosound_A5_Weave-Image_1.png",
        "/src/assets/Beosound_A5_-_PDP_-_Image_7.png",
        "/src/assets/Beosound_A5_-_PDP_-_Image_9.png",
        "/src/assets/Beosound_A5_-_PDP_-_Image_4.png",
    ];

    const images3 =[
        "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0034-Perspective-1200x1200.png",
        "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0040-Perspective-1200x1200.png",
        "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0037-Perspective-1200x1200.png"
    ];

    const images4 =[
        "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Perspective-0003-s1200x1200px.png",
        "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Front-0001-s1200x1200px.png",
        "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Perspective-0005-s1200x1200px.png"
    ];

    const images5 =[
        "/src/assets/1_HK_ONYX_STUDIO_8_CHAMPAGNE_HERO_0154_x3.png",
        "/src/assets/HK_ONYX_STUDIO_8_CHAMPAGNE_FRONT_0155_x4.png",
        "/src/assets/3_HK_ONYX_STUDIO_8_CHAMPAGNE_LEFT_36153_x3.png"
    ];

    const images6 =[
        "/src/assets/HK_GO_AND_PLAY_3_HERO_BLACK_43488_x7.png",
        "/src/assets/HK_GO_AND_PLAY_3_LEFT_BLACK_43477_x1.png",
        "/src/assets/HK_GO_AND_PLAY_3_FRONT_BLACK_43494_x1.png",
    ];

    const images7 =[
        "/src/assets/HK_AURA_STUDIO_4_BLACK_HERO_GALAXY_41834_x5.png",
        "/src/assets/HK_AURA_STUDIO_4_BLACK_LEFT_41851_x3.png",
        "/src/assets/HK_AURA_STUDIO_4_TOP_MAIN_GALAXY_x2.png"
    ];

    const images8 =[
        "/src/assets/HK_ONYX_STUDIO_9_GREY_FRONT_072_x1_(1).png",
        "/src/assets/HK_ONYX_STUDIO_9_GREY_HERO_070_x1_(1).png",
        "/src/assets/HK_ONYX_STUDIO_9_GREY_RIGHT_024_x2_(1).png"
    ];

    const images9 =[
        "/src/assets/LS_JBL_FLIP_7_Tomorrowland_Front_1605x1605px_1024x1024.webp.png",
        "/src/assets/JBL_Flip_7_Tomorrowland_Hero_1605x1605px_1024x1024.webp",
        "/src/assets/LS_JBL_FLIP_7_Tomorrowland_Left_1605x1605px_1024x1024.webp.png"
    ];

    const images10 =[
        "/src/assets/2_JBL_PULSE_5_FRONT_535x535px_600x600.webp",
        "/src/assets/3_JBL_PULSE_5_BACK_535x535px_600x600.png",
        "/src/assets/7_JBL_PULSE_5_BOTTOM_HERO_535x535px_600x600.png"
    ];

    const images11 =[
        "/src/assets/2.JBL_XTREME_3_FRONT_535x535px_1024x1024.png",
        "/src/assets/JBL_XTREME_3_HERO_535x535px_1024x1024.png",
        "/src/assets/4.JBL_XTREME_3_LEFT_RIGHT_535x535px_1024x1024.png"
    ];

    const images12 =[
        "/src/assets/JBL_BOOMBOX3_WIFI_HERO_535x535px_1024x1024.png",
        "/src/assets/4.JBL_BOOMBOX3_WIFI_FRONT_2_535x535px_1024x1024.png",
        "/src/assets/6.JBL_BOOMBOX3_WIFI_LEFT_4_535x535px_1024x1024.png"
    ];

    const images13 =[
        "/src/assets/พื้นหลัง emberton-iii-front-desktop-7 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง emberton-iii-side-desktop-1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง emberton-iii-above-desktop-4 ถูกเอาออก.png"
    ];

    const images14 =[
        "/src/assets/พื้นหลัง Gallery-Desktop-Middleton-II-Cream-01 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Gallery-Desktop-Middleton-II-Cream-06 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Gallery-Desktop-Middleton-II-Cream-04 ถูกเอาออก.png"
    ];

    const images15 =[
        "/src/assets/พื้นหลัง gallery-assets-desktop-6 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง gallery-assets-desktop ถูกเอาออก.png",
        "/src/assets/พื้นหลัง gallery-assets-desktop-3 ถูกเอาออก.png"
    ];

    const images16 =[
        "/src/assets/พื้นหลัง willen-ii-front-desktop-1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง willen-ii-above-desktop-3 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง willen-ii-hand-desktop-6 ถูกเอาออก.png"
    ];


    const [currentIndex, setCurrentIndex] = useState(0);
    
    const navigate = useNavigate();
    const goToHome = () =>{
      navigate('/'); 
    }

    const Navigate = useNavigate();
    const goToSpeakers = () =>{
      Navigate('/pages/Speakers'); 
    }

    const navigate4 = useNavigate();
    const goToHeadphones = () =>{
        navigate4('/pages/Headphones')
    }

    const navigate12 = useNavigate();
    const goToSoundbars = () =>{
        navigate12('/pages/Soundbars')
    }

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

    const addToCart = async (ProductId, Quantity = 1) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5283//api/OrderItem/AddItem",
      { ProductId, Quantity },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsCartRendered(true);
    alert("เพิ่มลงตะกร้าแล้ว");
  } catch (error) {
    console.error(error);
    alert(error?.response?.data ?? "ไม่สามารถเพิ่มลงตะกร้าได้");
  }
};

    
    return (
        <main>
            <Navbar onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
            <div className='bg-[#edeef0] h-[1800px] flex items-start justify-center'>
                <div className='container text-center mx-auto'>
                    <h1 className='text-2xl text-[#212529] text-left font-extrabold -ml-11 mt-28'>Speakers</h1>
                    <div className='myContainer'>
                        <div onClick={onBeoLit20Click} className='containerBox relative'>
                            <img src={Beolit20} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Beolit 20</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿21990</p>
                        </div>
                        <div onClick={onBeoA5Click} className='containerBox'>
                            <img src={Bo6} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beosound A5</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿64700</p>
                        </div>
                        <div onClick={onBeoExClick} className='containerBox'>
                            <img src={Bo7} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beosound Explore</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿7900</p>
                        </div>
                        <div onClick={onBeoA1Click} className='containerBox'>
                            <img src={Bo5} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beosound A1</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿14800</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onOnyx8Click} className='containerBox'>
                            <img src={Bo14} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Onyx Studio 8</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿5290</p>
                        </div>
                        <div onClick={onGoPlayClick} className='containerBox'>
                            <img src={Bo15} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Go + Play 3</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿14900</p>
                        </div>
                        <div onClick={onAura3Click} className='containerBox'>
                            <img src={Bo16} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Aura Studio 3</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿12900</p>
                        </div>
                        <div onClick={onOnyx9Click} className='containerBox'>
                            <img src={Bo27} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Onyx Studio 9</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿11900</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onFlip7ExClick} className='containerBox'>
                            <img src={Bo18} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Flip 7 TOMORROWLAND</h3>
                            <p className="desText">JBL</p>
                            <p className="priceText">฿5990</p>
                        </div>
                        <div onClick={onPulse5Click} className='containerBox'>
                            <img src={Bo19} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Pulse 5</h3>
                            <p className="desText">JBL</p>
                            <p className="priceText">฿11900</p>
                        </div>
                        <div onClick={onXtremeClick} className='containerBox'>
                            <img src={Bo20} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Xtreme 3</h3>
                            <p className="desText">JBL</p>
                            <p className="priceText">฿12900</p>
                        </div>
                        <div onClick={onBoomClick} className='containerBox'>
                            <img src={Bo21} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Boombox 3 WIFI</h3>
                            <p className="desText">JBL</p>
                            <p className="priceText">฿24900</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onEmberClick} className='containerBox'>
                            <img src={Bo23} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>EMBERTON III</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿7690</p>
                        </div>
                        <div onClick={onMiddleClick} className='containerBox'>
                            <img src={Bo24} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MIDDLETON II</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿12900</p>
                        </div>
                        <div onClick={onKilburnClick} className='containerBox'>
                            <img src={Bo25} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>KILBURN III</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿14990</p>
                        </div>
                        <div onClick={onWillenClick} className='containerBox'>
                            <img src={Bo26} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>WILLEN II</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿4290</p>
                        </div>
                    </div>
                </div>
            </div> 
            {isCartRendered && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out ${isCartVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`bg-white rounded-lg shadow-lg p-6 w-96 relative transform transition-transform duration-300 ease-in-out ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                        <button onClick={() => setIsCartOpen(false)} className='absolute top-3 right-3 text-gray-600 hover:text-black'>
                            <IoClose size={24}/>
                        </button>
                        <h2 className='text-2xl font-bold mb-4 text-center'>Cart</h2>
                        <hr className="border-black border-t-2 w-full"/>
                        <hr className="border-black border-t-2 absolute bottom-28 left-7 right-7"/>
                        <button className='w-20 h-10 absolute bottom-5 right-4 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition'>CheckOut
                        </button>
                    </div>
                </div>                        
            )}
            {isMenuRendered &&(
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start items-stretch z-50 transition-opacity duration-300 ease-in-out ${isMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`bg-white shadow-lg p-6 w-72 relative transform transition-transform duration-300 ease-in-out ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                        <button onClick={() => setIsMenuOpen(false)} className='absolute top-6 left-9 text-gray-600 hover:text-black'>
                            <IoClose size={24}/>
                        </button>
                        <ul className='flex space-y-3 flex-col mt-16 ml-2 font-semibold text-xl'>
                            <li>
                                <button onClick={goToHome}>Homes
                                </button>
                            </li>       
                            <li>
                                <button onClick={goToSpeakers}>Speakers
                                </button>
                            </li>
                            <li>
                                <button onClick={goToHeadphones}>Headphones
                                </button>
                            </li>
                            <li>
                                <button onClick={goToSoundbars}>Soundbars
                                </button>
                            </li>
                        </ul>  
                    </div>
                </div>
            )}
            {isBeoLit20Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoLit20Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beolit 20</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang & Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>This is 240 watts you can feel.</h2>
                                <h3 className='mt-2'>Beolit 20 may be portable, but it packs a punch that rivals much bigger speakers. A combo of powerful amplifiers and drivers – including a wideband woofer for rumbling lows – gives your music the presence it deserves. And with 360-degree sound dispersion, everyone can enjoy it.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿21,990</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(1,1)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoA5Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoA5Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay A5</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang & Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images2[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>Brings the bass. Reads the room.</h2>
                                <h3 className='mt-2'>A two-way setup with four drivers. The most powerful woofer in any of our portable speakers. You won’t just hear Beosound A5 – you’ll feel it. We pack all of our latest acoustic advancements in one compact package. RoomSense adapts playback based on your space, so you always get the finest fidelity.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿64,700</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoExOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoExOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beosound Explore</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang & Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images3[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>Made to last.</h2>
                                <h3 className='mt-2'>Breaking new ground or walking the beaten path? It’s all the same to the sturdy Beosound Explore. Inside the scratch-resistant, anodised aluminium shell, a vertical rib structure provides serious protection from bumps. We design and build the aluminum shell of the speaker in Denmark as this is the only way we can ensure that it meets our strict requirements.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿7,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoA1Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoA1Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beosound A1</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang & Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images4[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>Small size. Serious sound.</h2>
                                <h3 className='mt-2'>With the largest woofer in its class, Beosound A1 delivers dramatically deep bass. Not to mention clarity that lingers in the air, and a presence that fills any space – all wrapped up in a pack-friendly form.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿14,800</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isOnyx8Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsOnyx8Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Onyx Studio 8</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images5[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>SUPERIOR SOUND PERFORMANCE</h2>
                                <h3 className='mt-2'>Harman Kardon's unrivaled acoustic engineering delivers rich, room-filling sound in any setting, whether you're listening to your favorite music or making crystal clear conference calls.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿5,290</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isGoPlayOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsGoPlayOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Go + Play 3</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images6[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>SUPERIOR SOUND PERFORMANCE</h2>
                                <h3 className='mt-2'>The Harman Kardon Go + Play 3's three-way speaker design provides a detailed, clear stereo soundstage. Its down-firing 5” subwoofer delivers thunderous, accurate bass. Dual tweeters and mid-range drivers provide flawless vocal and instrument reproduction, while an additional front-mounted passive radiator kicks out the punch.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿14,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isAura3Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsAura3Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Aura Studio 4</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images7[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>SUPERIOR SOUND PERFORMANCE</h2>
                                <h3 className='mt-2'>Listen to music the way it was meant to be heard. Your music is reproduced with pinpoint accuracy, thanks to the speaker's distinct channels and dedicated amplifiers, reproducing every sonic detail with breathtaking clarity. Feel every beat from a 5.2" down-firing subwoofer powering deep, rich bass tones. And the wide soundstage of the 6-speaker array is the next best thing to experiencing your favorite songs live.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿12,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isOnyx9Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsOnyx9Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Onyx Studio 9</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images8[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>SUPERIOR SOUND PERFORMANCE WITH A WIDER SOUNDSTAGE</h2>
                                <h3 className='mt-2'>Get lost in your music with our new Constant Sound Field technology. The three-channel system, featuring a dedicated center channel for crystal-clear vocals surrounded by two specially designed tweeters, delivers a wider soundstage. This immersive experience brings your favorite songs to life all around you.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿11,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isFlip7ExOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsFlip7ExOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Flip 7 Tomorrowland </h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>JBL</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images9[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>พลังเสียงจัดเต็ม พร้อมลุยไปทุกที่</h2>
                                <h3 className='mt-2'>ลำโพงพกพาที่ให้เสียงดังกระหึ่มด้วย AI Sound Boost กันน้ำ กันฝุ่น กันตกระดับ IP68 เล่นได้นานถึง 16 ชั่วโมง เชื่อมต่อลำโพง JBL อื่น ๆ ผ่าน Auracast™ ได้ง่าย ไม่ว่าที่ไหน Flip 7 ก็พร้อมสร้างบรรยากาศเสียงทรงพลังในขนาดกะทัดรัดให้ทุกโมเมนต์ของคุณ</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿5,990</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isPulse5Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsPulse5Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Pulse 5</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>JBL</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images10[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>เสียงที่สัมผัสได้ด้วยตา</h2>
                                <h3 className='mt-2'>พลังเสียงที่มาพร้อมกับแสงไฟสีนวลหลากสี สวยงามจนต้องหยุดมอง JBL Pulse 5 ลำโพงที่มาพร้อมกับแสงไฟสีสันสวยงามรอบลำโพง สามารถขยับไปตามจังหวะเพลงโปรด และปรับแต่งสีของแสงไฟได้ตามที่คุณพอใจ</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿11,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isXtremeOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsXtremeOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Xtreme 3</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>JBL</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images11[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>ปลดปล่อยพลังเสียงได้ทุกที่</h2>
                                <h3 className='mt-2'>JBL Xtreme 3 ปล่อยพลังเสียงได้ครอบคลุมทุกพื้นที่ ให้เสียงเบสทุ้มลึกและแน่นทุกรายละเอียด ให้คุณอยู่ในโลกของเพลงโปรดที่คุณหลงใหลอย่างไม่มีขีดจำกัด ไม่ว่าจะที่สระว่ายน้ำ สวนหย่อม หรือแค่นั่งคุยกัน ด้วยพลังจากลำโพง 4 ตัว และ JBL Bass radiators 2 ตัว จะให้พลังเสียงที่ทำให้ทุกคนต้องเดินเข้ามาสนุกด้วยกัน และยังสามารถเชื่อมต่อลำโพงที่รองรับระบบ PartyBoost เข้าด้วยกัน เพื่อให้พลังเสียงที่เหนือกว่าอีกระดับ อีกทั้งยังสามารถสนุกได้ต่อเนื่องถึงแม้ว่าฝนจะตก ด้วยโครงสร้างที่กันน้ำกันฝุ่น JBL Xtreme 3 ยังมาพร้อมกับสายสะพายที่สะดวกในการขนย้าย และที่เปิดขวดบนสายสะพาย ทำให้คุณสามารถจัดปาร์ตี้ได้ทุกที่ และย้ายสถานที่ได้ทุกเวลา</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿12,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBoomOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBoomOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Boombox 3 WIFI</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>JBL</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images12[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>เสียงกระหึ่มยาวต่อเนื่องทั้งวัน</h2>
                                <h3 className='mt-2'>อัดแน่นด้วยเสียง JBL Original Pro Sound สร้างเสียงที่หนักแน่นพร้อมเสียงเบสที่นุ่มลึกทรงพลังของลำโพงแบบพกพา JBL Boombox 3 Wi-Fi และ Bluetooth สตรีมเพลงความละเอียดสูงได้ทุกสถานการณ์ </h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿24,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isEmberOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsEmberOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Emberton III</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images13[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>MARSHALL SIGNATURE SOUND</h2>
                                <h3 className='mt-2'>Emberton III features more bass than its predecessor. Dynamic Loudness adjusts the tonal balance as you change the volume. Discover a rich, full sound that'll never let you down.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿7,690</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMiddleOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMiddleOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Middleton II</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images14[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>TRUE STEREOPHONIC</h2>
                                <h3 className='mt-2'>360° True Stereophonic sound is a form of multidirectional audio that makes your music hit from all angles. Designed to sound strong from wherever you’re standing, with Middleton II, there’s nowhere to hide.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿12,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isKilburnOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsKilburnOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Kilburn III</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images15[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>TRUE STEREOPHONIC</h2>
                                <h3 className='mt-2'>360° sound finds you wherever you're standing thanks to a stereo arrangement with no blind spot. Take in well-rounded mids, crisp highs, and bass that digs deep with improved tuning and wide band drivers.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿14,990</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isWillenOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsWillenOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Willen II</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images16[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[355px] absolute left-3 top-1/2 -translate-y-1/2'>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ‹
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="bg-gray-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600">
                                                ›
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='mt-11'>
                                <h2 className='text-black text-2xl font-semibold'>MARSHALL SIGNATURE SOUND</h2>
                                <h3 className='mt-2'>Take any setting from quiet to loud. Willen II's slightly larger frame maximises bass. Its improved drivers also give every frequency its time to shine, so you’ll hear a balanced sound at any volume.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿4,290</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Speakers