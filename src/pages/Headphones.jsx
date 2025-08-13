import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import Hp1 from "/src/assets/พื้นหลัง monitor-iii-anc-front-desktop-01 ถูกเอาออก.png"
import Hp2 from "/src/assets/พื้นหลัง 1-major-v-cream-front-desktop ถูกเอาออก.png"
import Hp3 from "/src/assets/พื้นหลัง Motif-II-front-desktop-1 ถูกเอาออก.png"
import Hp4 from "/src/assets/พื้นหลัง minor_iv_cream_gallery-assets-desktop-01 ถูกเอาออก.png"
import Hp5 from "/src/assets/พื้นหลัง 1.JBL_Tune_770NC_ProductImage_BLK_PC_535x535px_600x600 ถูกเอาออก.png"
import Hp6 from "/src/assets/Packshot-Beoplay-H100-Infinite-Black-perspective-0006-s1200x1200px.png"
import Hp7 from "/src/assets/Packshot-Beoplay-H95-Gold-Tone-0006-Perspective-1200x1200px.png";
import Hp8 from "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Case-Earphones-Perspective-s1200x1200px.png";
import Hp9 from "/src/assets/Beoplay-EX-Gold-Tone-Hero.png";
import Hp10 from "/src/assets/Visual_Packshot_Saphir_Black_75268.png.webp"
import Hp11 from "/src/assets/PALAST-230531-90365_copie.png.webp"
import Hp12 from "/src/assets/Packshot-Beoplay-HX-Gold-Tone-0188-Perspective-S1200x1200px.png"
import Hp13 from "/src/assets/h4_black1000x1000.png"
import Hp14 from "/src/assets/E8_gold_1.png"
import Hp15 from "/src/assets/EQ_black_10.png"
import Hp16 from "/src/assets/AirPods_Max_Starlight_PDP_Image_Position_3__TH-TH-square_medium.jpg"
import Hp17 from "/src/assets/พื้นหลัง major-iv-black-front-desktop-1 ถูกเอาออก.png"

function Headphones({onMonitor3Click, onMajorVClick, onMotifClick, onMinorClick, onBeoH100Click, onBeoH95Click, onBeoElevenClick, onBeoExClick, onGeminiClick, onGeminiLuxClick, onBeoH4Click, onBeoHXClick, onBeoEQClick, onBeoE8Click, onMajorIVClick}) {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartRendered, setIsCartRendered] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isMonitor3Open, setIsMonitor3Open] = useState(false);
    const [isMajorVOpen, setIsMajorVOpen] = useState(false);
    const [isMotifOpen, setIsMotifOpen] = useState(false);
    const [isMinorOpen, setIsMinorOpen] = useState(false);
    const [isBeoH100Open, setIsBeoH100Open] = useState(false);
    const [isBeoH95Open, setIsBeoH95Open] = useState(false);
    const [isBeoElevenOpen, setIsBeoElevenOpen] = useState(false);
    const [isBeoExOpen, setIsBeoExOpen] = useState(false);
    const [isGeminiOpen, setIsGeminiOpen] = useState(false);
    const [isGeminiLuxOpen, setIsGeminiLuxOpen] = useState(false);
    const [isBeoH4Open, setIsBeoH4Open] = useState(false);
    const [isBeoHXOpen, setIsBeoHXOpen] = useState(false);
    const [isBeoEQOpen, setIsBeoEQOpen] = useState(false);
    const [isBeoE8Open, setIsBeoE8Open] = useState(false);
    const [isMajorIVOpen, setIsMajorIVOpen] = useState(false);


    onMonitor3Click = (() => setIsMonitor3Open(true));
    onMajorVClick = (() => setIsMajorVOpen(true));
    onMotifClick = (() => setIsMotifOpen(true));
    onMinorClick = (() => setIsMinorOpen(true));
    onBeoH100Click = (() => setIsBeoH100Open(true));
    onBeoH95Click = (() => setIsBeoH95Open(true));
    onBeoElevenClick = (() => setIsBeoElevenOpen(true));
    onBeoExClick = (() => setIsBeoExOpen(true));
    onGeminiClick = (() => setIsGeminiOpen(true));
    onGeminiLuxClick = (() => setIsGeminiLuxOpen(true));
    onBeoH4Click = (() => setIsBeoH4Open(true));
    onBeoHXClick = (() => setIsBeoHXOpen(true));
    onBeoEQClick = (() => setIsBeoEQOpen(true));
    onBeoE8Click = (() => setIsBeoE8Open(true));
    onMajorIVClick = (() => setIsMajorIVOpen(true));


    const images = [
        "/src/assets/พื้นหลัง monitor-iii-anc-front-desktop-01 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง monitor-iii-anc-side-desktop-07 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง monitor-iii-anc-hand-desktop-06 ถูกเอาออก.png"
    ];

    const images2 = [
        "/src/assets/พื้นหลัง 1-major-v-cream-front-desktop ถูกเอาออก.png",
        "/src/assets/พื้นหลัง 6-major-v-cream-front-desktop ถูกเอาออก.png",
        "/src/assets/พื้นหลัง 3-major-v-cream-side-desktop ถูกเอาออก.png"
    ];

    const images3 = [
        "/src/assets/พื้นหลัง Motif-II-front-desktop-1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Motif-II-above-desktop-6 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Motif-II-zoom-desktop-4 ถูกเอาออก.png"
    ];

    const images4 = [
        "/src/assets/พื้นหลัง minor_iv_cream_gallery-assets-desktop-01 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง minor_iv_cream_gallery-assets-desktop-03 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง minor_iv_cream_gallery-assets-desktop-04 ถูกเอาออก.png",
    ];

    const images5 = [
        "/src/assets/Packshot-Beoplay-H100-Infinite-Black-perspective-0006-s1200x1200px.png",
        "/src/assets/Packshot-Beoplay-H100-Infinite-Black-Front-0007-s1200x1200px.png",
        "/src/assets/Packshot-Beoplay-H100-Infinite-Black-Perspective-0003-s1200x1200px.png",
    ];

    const images6 = [
        "/src/assets/Packshot-Beoplay-H95-Gold-Tone-0006-Perspective-1200x1200px.png",
        "/src/assets/H95_gold_fullside.png",
        "/src/assets/H95_gold_sidefullleft.png"
    ];

    const images7 = [
        "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Case-Earphones-Perspective-s1200x1200px.png",
        "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Case-earbuds-Front-s1200x1200px..png",
        "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Earphones-Logo-Front-s1200x1200px..png"
    ];

    const images8 = [
        "/src/assets/Beoplay-EX-Gold-Tone-Hero.png",
        "/src/assets/Beoplay-EX-Gold-Tone-Casewithearbuds-2.png",
        "/src/assets/Beoplay-EX-Gold-Tone-Earbuds.png"
    ];

    const images9 = [
        "/src/assets/Visual_Packshot_Saphir_Black_75268.png.webp",
        "/src/assets/Visual_Packshot_Saphir_Black_75065.png.webp",
        "/src/assets/Visual_Packshot_Saphir_Black_75556-75571.png.jpeg"
    ];
    
    const images10 = [
        "/src/assets/PALAST-230531-90365_copie.png.webp",
        "/src/assets/Copie_de_Visual_Packshots_Saphir_ODP_90509-90514.png.webp",
        "/src/assets/PALAST-230531-90204_copie.png.webp"
    ];

    const images11 = [
        "/src/assets/h4_black1000x1000.png",
        "/src/assets/H4_2ndGen_Black_1.png",
        "/src/assets/H4_2ndGen_Black_Lying.png"
    ];

    const images12 = [
        "/src/assets/Packshot-Beoplay-HX-Gold-Tone-0188-Perspective-S1200x1200px.png",
        "/src/assets/Packshot-Beoplay-HX-Gold-Tone-0194-Front-S1200x1200px.png",
        "/src/assets/Packshot-Beoplay-HX-Gold-Tone-0189-Front-S1200x1200px.png"
    ];

     const images13 = [
        "/src/assets/EQ_black_10.png",
        "/src/assets/EQ_black_9.png",
        "/src/assets/EQ_black_2.png",
    ];

    const images14 = [
        "/src/assets/E8_gold_1.png",
        "/src/assets/E8_Gold_2.png",
        "/src/assets/E8_gold_3.png"
    ];

    const images15 = [
        "/src/assets/พื้นหลัง major-iv-black-front-desktop-1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง major-iv-black-front_standing-desktop-5 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง major-iv-black-hand-desktop-6 ถูกเอาออก.png"
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

    const navigate11 = useNavigate();
    const goToSoundbars = () =>{
      navigate11('/pages/Soundbars')
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
    
    return (
        <main>
            <Navbar onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)}/>
            <div className='bg-[#edeef0] h-[1800px] flex items-start justify-center'>
                <div className='container text-center mx-auto'>
                    <h1 className='text-2xl text-[#212529] text-left font-extrabold -ml-11 mt-28'>Headphones</h1>
                    <div className='myContainer'>
                        <div onClick={onMonitor3Click} className='containerBox relative'>
                            <img src={Hp1} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>MONITOR III A.N.C.</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿12990</p>
                        </div>
                        <div onClick={onMajorVClick} className='containerBox'>
                            <img src={Hp2} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MAJOR V</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿5990</p>
                        </div>
                        <div onClick={onMotifClick} className='containerBox'>
                            <img src={Hp3} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MOTIF II A.N.C.</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿7490</p>
                        </div>
                        <div onClick={onMinorClick} className='containerBox'>
                            <img src={Hp4} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MINOR IV</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿4990</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onBeoH100Click} className='containerBox'>
                            <img src={Hp6} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay H100</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿69000</p>
                        </div>
                        <div onClick={onBeoH95Click} className='containerBox'>
                            <img src={Hp7} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay H95</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿40990</p>
                        </div>
                        <div onClick={onBeoElevenClick} className='containerBox'>
                            <img src={Hp8} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay ELEVEN</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿19900</p>
                        </div>
                        <div onClick={onBeoExClick} className='containerBox'>
                            <img src={Hp9} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay EX</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿9790</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onGeminiClick} className='containerBox'>
                            <img src={Hp10} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Gemini II</h3>
                            <p className="desText">Devialet</p>
                            <p className="priceText">฿14990</p>
                        </div>
                        <div onClick={onGeminiLuxClick} className='containerBox'>
                            <img src={Hp11} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Gemini II Opéra de Paris</h3>
                            <p className="desText">Devialet</p>
                            <p className="priceText">฿22490</p>
                        </div>
                        <div onClick={onBeoH4Click} className='containerBox'>
                            <img src={Hp13} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay H4</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿9790</p>
                        </div>
                        <div onClick={onBeoHXClick} className='containerBox'>
                            <img src={Hp12} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay HX</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿27900</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onBeoEQClick} className='containerBox'>
                            <img src={Hp15} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay EQ</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿12900</p>
                        </div>
                        <div onClick={onBeoE8Click} className='containerBox'>
                            <img src={Hp14} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay E8</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿9900</p>
                        </div>
                        <div onClick={onMajorIVClick} className='containerBox'>
                            <img src={Hp17} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MAJOR IV</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿4890</p>
                        </div>
                        <div className='containerBox'>
                            <img src={Hp16} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Airpods Max</h3>
                            <p className="desText">Apple</p>
                            <p className="priceText">฿19900</p>
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
                                <button>Headphones
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
            {isMajorVOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMajorVOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">MAJOR V</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>100+ HOURS OF WIRELESS PLAYTIME</h2>
                                <h3 className='mt-2'>Packing 100+ hours of wireless playtime, you can be gone for days and never be left without a soundtrack. Major V can be charged using the quick charge option, so you’ll dive back into the session in no time.</h3>
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
            {isMonitor3Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMonitor3Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">MONITOR III A.N.C.</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>MARSHALL SIGNATURE SOUND</h2>
                                <h3 className='mt-2'>Monitor III A.N.C. is your sensational sound guarantee. Featuring Dynamic Loudness, these headphones adjust the treble, mids and bass for the most optimal sound at every volume.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿12,990</h1>
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
            {isMotifOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMotifOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">MOTIF II A.N.C.</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>ANC & TRANSPARENCY MODE</h2>
                                <h3 className='mt-2'>Get locked into the sounds of your choice with improved active noise cancelling technology and use the app to amplify your playlist. Savour the music that matters to you, uninterrupted. For a quick conversation, switch seamlessly into transparency mode to let the outside back in and stay in tune with your surroundings. </h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿7,490</h1>
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
            {isMinorOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMinorOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">MINOR IV</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Marshall</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>DESIGNED FOR COMFORT</h2>
                                <h3 className='mt-2'>To keep the session going, Minor IV features a re-designed earbud and stem, angled to create a truer fit inside the ear canal. They're also water-resistant so the music doesn’t have to stop when it rains.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿4,990</h1>
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
            {isBeoH100Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoH100Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay H100</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Ultimate over-ear headphones</h2>
                                <h3 className='mt-2'>Beoplay H100 deliver immersive sound and a luxurious design built to stand the test of time. These advanced headphones, which are optimised for Dolby Atmos, feature titanium drivers and next-level noise cancellation. Perfect for music, work, and travel. Every purchase includes an exclusive leather pouch to protect and carry your headphones in style.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿69,000</h1>
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
            {isBeoH95Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoH95Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay H95</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Premium over-ear headphones</h2>
                                <h3 className='mt-2'>Moving. Meticulous. Mesmerising. Immerse yourself with our adjustable noise-cancelling headphones that put a spin on grab-and-go-listening.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿40,990</h1>
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
            {isBeoElevenOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoElevenOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay ELEVEN</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>High-fidelity ANC earbuds</h2>
                                <h3 className='mt-2'>Beoplay Eleven wireless earbuds boast improved noise cancellation and multipoint Bluetooth for a seamless listening experience anywhere.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿19,900</h1>
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
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay EX</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Premium wireless earbuds</h2>
                                <h3 className='mt-2'>As versatile as they are beautiful, these wireless earbuds with active noise cancellation bring deep sound and snug comfort in one sleek package.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿9,790</h1>
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
            {isGeminiOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsGeminiOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Gemini II</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Devialet</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Devialet signature sound on-the-go.</h2>
                                <h3 className='mt-2'>Next-generation earbuds, next-level sound. Devialet Gemini II packs a suite of enhanced tech to take you even deeper into pure sound. With Devialet Adaptive Noise Cancellation™, you are protected from the ambient chaos and transported to a place that’s harmonious and pure.</h3>
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
            {isGeminiLuxOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsGeminiLuxOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Gemini II Opéra de Paris</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Devialet</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Nomadic Sound. Gilded to Perfection.</h2>
                                <h3 className='mt-2'>Our second-generation earbuds get the gold treatment. With a majestic 24-carat gold finish, this spectacularly compact case features proprietary acoustic innovations by Devialet, enhanced connectivity and improved ergonomics.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿22,490</h1>
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
            {isBeoH4Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoH4Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay H4</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Pure expression. Superior sound.</h2>
                                <h3 className='mt-2'>Contemporary over-ear headphones with long-lasting comfort, superior sound and voice assistant.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿9,790</h1>
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
            {isBeoHXOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoHXOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay HX</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Comfortable, do-it-all headphones</h2>
                                <h3 className='mt-2'>Wireless over ear headphones. Listen in comfort whether you're on a call, working from home or taking a moment for yourself.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿27,900</h1>
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
            {isBeoEQOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoEQOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay EQ</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Adaptive noise cancelling wireless earphones</h2>
                                <h3 className='mt-2'>Immerse yourself in pure sound. Noise cancelling earphones with 6 built-in microphones, for clear calls and authentic audio.</h3>
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
            {isBeoE8Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBeoE8Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beoplay E8</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>More compact. More powerful.</h2>
                                <h3 className='mt-2'>Our truly wireless in-ear earphones with an improved battery life of up to 35 hours, a QI-certified wireless charging case and Bluetooth 5.1 connectivity ensure a seamless and powerful listening experience.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿9,900</h1>
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
            {isMajorIVOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMajorIVOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Major IV</h2>
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
                                <h2 className='text-black text-2xl font-semibold'>ICONIC & FOLDABLE DESIGN</h2>
                                <h3 className='mt-2'>Major IV combines enhanced usability with classic Marshall elements for a design that is both iconic and innovative. The new fold clip means that Major IV folds away into an even more compact size, and the ear caps are protected from excessive wear and tear. It features the tactile and efficient control knob, textured black vinyl and Marshall script, as well as the rugged durability that’s necessary for the anarchy of everyday life. </h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿4,890</h1>
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

export default Headphones