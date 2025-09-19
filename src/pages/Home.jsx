import React, { useState , useEffect} from 'react'
import { IoClose } from 'react-icons/io5';
import Navbar from '/src/components/Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getImageById } from "/Styles/product-images"; 
import { speakerImages } from '../assets';
import { headphoneImages } from '../assets';
import { iconImages } from '../assets';


function Home({onBeoLit20Click, onBeoA5Click, onBeoExClick, onBeoA1Click, onBeoH100Click, onBeoH95Click, onBeoElevenClick, onBeoPlayExClick}) {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
    const [isBeoH100Open, setIsBeoH100Open] = useState(false);
    const [isBeoH95Open, setIsBeoH95Open] = useState(false);
    const [isBeoElevenOpen, setIsBeoElevenOpen] = useState(false);
    const [isBeoPlayExOpen, setIsBeoPlayExOpen] = useState(false);
    
    
    onBeoLit20Click = (() => setIsBeoLit20Open(true));
    onBeoA5Click = (() => setIsBeoA5Open(true));
    onBeoExClick = (() => setIsBeoExOpen(true));
    onBeoA1Click = (() => setIsBeoA1Open(true));
    onBeoH100Click = (() => setIsBeoH100Open(true));
    onBeoH95Click = (() => setIsBeoH95Open(true));
    onBeoElevenClick = (() => setIsBeoElevenOpen(true));   
    onBeoPlayExClick = (() => setIsBeoPlayExOpen(true));



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

    const [currentIndex, setCurrentIndex] = useState(0);
    

    const navigate = useNavigate();
    const goToSpeakers = () =>{
      navigate('/pages/Speakers'); 
    }

    const navigate2 = useNavigate();
    const goToAddress = () =>{
        navigate2('/pages/Address');
        refreshCart();
    }

    const navigate3 = useNavigate();
    const goToHeadphones = () =>{
        navigate3('/pages/Headphones')
    }

    const navigate10 = useNavigate();
    const goToSoundbars = () =>{
        navigate10('/pages/Soundbars')
    }

    const navigatE = useNavigate();
    const goToAboutUs = () =>{
        navigatE('/pages/AboutUs'); 
    }

    const [form , setForm] = useState({
        email: '',
        passWord: '',
    });

    const [form2 , setForm2] = useState({
        email: '',
        userName: '',
        passWord: '',
    });

    const [message , setMessage] = useState();
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };

    const handleChange2 = (e) =>{
        setForm2({
            ...form2,
            [e.target.name]:e.target.value,
        });
    };

    const handleLogin = async(e) =>{
        e.preventDefault(); //กันไม่ให้ฟอร์ม refresh ตอนกดsubmit
        try{
            const API = await axios.get('http://localhost:5283/api/Authen/Login',{
                params: {
                    Email: form.email,
                    PassWord: form.passWord
                }
            });

            setMessage(API.data)
            setIsLoginOpen(false);

            if (API.data.token) {
                localStorage.setItem("token", API.data.token);
                const decoded = jwtDecode(API.data.token);
                const role = decoded.Roles
                if (role === "Member"){
                    alert('Login Completed')
                    window.location.reload();
                }
                else if (role === "Admin"){
                    alert('Login Completed')
                    navigate("/pages/Admin")
                    window.location.reload();
                }
            }
            else{
                alert("Login success but no token received");
            }
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                alert(error.response.data);
            } else 
            {
                alert('Login failed');
            }
        };
    };

    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            const API = await axios.post('http://localhost:5283/api/Authen/Register',{
                Email: form2.email,
                UserName: form2.userName,
                PassWord: form2.passWord
            });
            alert("Register Completed");
            setIsRegisterOpen(false);
            
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                alert("Email used")
            } else 
            {
                alert("Register failed")
            }
        };
    };

    const closeallmodal = () => {
        setIsBeoLit20Open(false);
        setIsBeoA5Open(false);
        setIsBeoExOpen(false);
        setIsBeoA1Open(false);
        setIsBeoH100Open(false);
        setIsBeoH95Open(false);
        setIsBeoElevenOpen(false);
        setIsBeoPlayExOpen(false);
    };
    
    const addToCart = async (ProductId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("กรุณาเข้าสู่ระบบก่อน");
                navigate('/pages/Home')
                return;
            }
            const API = await axios.post("http://localhost:5283/api/OrderItem/AddItem",
            {   
                ProductId,  
                Quantity: 1
            
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    ...auth()
                },
            });

            const d = API.data;
            const message = typeof d === "string" ? d : (d?.message || "");
            const needAddress = message === "No Address" || (typeof d !== "string" && d?.needAddress === true);

            if (needAddress) {
                alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
                navigate("/pages/Address"); 
                return;
            }

            const oid = Number(API.data?.orderId ?? API.data?.OrderId); 
            if (Number.isFinite(oid) && oid > 0) {
                localStorage.setItem("currentOrderId", String(oid));
            }

            await refreshCart();

            closeallmodal();
            setIsCartOpen(true);
            alert("เพิ่มลงตะกร้าแล้ว");

        } catch(error){
            const status = error?.response?.status;
            const raw = error?.response?.data;
            const msg = typeof raw === "string" ? raw : raw?.message;

            if (status === 404 && msg === "No Address") {
                alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
                navigate("/pages/Address");
                return;
            }
            setMessage(typeof raw === "string" ? raw : "failed");
        }
    };

    const addToBuy = async (ProductId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("กรุณาเข้าสู่ระบบก่อน");
                navigate('/pages/Home')
                return;
            }
            const API = await axios.post("http://localhost:5283/api/OrderItem/AddItem",
            {   
                ProductId,  
                Quantity: 1
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            
            });
            
            const d = API.data;
            const message = typeof d === "string" ? d : (d?.message || "");
            const needAddress = message === "No Address" || (typeof d !== "string" && d?.needAddress === true);

            if (needAddress) {
                alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
                navigate("/pages/Address"); 
                return;
            }

            const oid = Number(API.data?.orderId ?? API.data?.OrderId); 
            if (Number.isFinite(oid) && oid > 0) {
                localStorage.setItem("currentOrderId", String(oid));
            }
            
            closeallmodal();
           
            navigate("/pages/Address");
            

        } catch(error){
            const status = error?.response?.status;
            const raw = error?.response?.data;
            const msg = typeof raw === "string" ? raw : raw?.message;
             alert("ไม่มีที่อยู่");

            if (status === 404 && msg === "No Address") {
                alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
                navigate("/pages/Address");
                return;
            }
            setMessage(typeof raw === "string" ? raw : "failed");

        }
    };

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

    const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
    const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });

    async function refreshCart() {
        const { data } = await axios.get(`http://localhost:5283/api/OrderItem/Current`, 
        { headers: auth() });
        setCart({
            orderId: data?.orderId ?? 0,
            items: data?.items ?? [],
            actualPrice: data?.actualPrice ?? 0
        });
    }


    async function removeItem(rowId) {
    await axios.delete(`http://localhost:5283/api/OrderItem/DropItem`,  
        { 
            params: { OrderItemsId: rowId }, headers: auth() 
        });
         refreshCart();
    }   


    async function incQty(rowId, qty) {
    await axios.put(`http://localhost:5283/api/OrderItem/EditQuantity`,
        { quantity: qty + 1 },
        { 
            params: { OrderItemsId: rowId },
            headers: { "Content-Type": "application/json", ...auth() } 
        });
        refreshCart();
    }

    async function decQty(rowId, qty) {
    if (qty <= 1) return;
    await axios.put('http://localhost:5283/api/OrderItem/EditQuantity',
        { quantity: qty - 1 },
        { 
            params: { OrderItemsId: rowId },
            headers: { "Content-Type": "application/json",...auth()}
        });    
        refreshCart ();
    }   



    useEffect(() => { if (isCartVisible) refreshCart(); }, [isCartVisible]);



    return (
        <main>
            <Navbar onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)}/>
                <div className='bg-[#edeef0] text-white h-screen flex items-center justify-center'>
                    <div className='container mx-auto text-left'>
                        <h1 className='text-5xl text-[#212529] font-playfair font-bold'>Welcome to Our Website</h1>
                        <p className='text-lg text-[#6C757D] mt-4 font-playfair'>Discover premium Bang & Olufsen speakers<br/>combining sleek design and exceptional sound.<br/>Perfect for any space, our collection offers top-quality audio to elevate your music experience.</p>
                        <a href="/pages/Speakers" className='bg-[#feddd2] text-white px-6 py-2 rounded-full mt-8 inline-block hover:bg-gray-500 shadow-sm font-playfair'>Shop Now</a>
                    </div>
                    <img src={speakerImages.Bo8} alt="Bg" className='h-auto w-[420px] -ml-96'/>
                </div>
                <div className="bg-white h-screen">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mt-10 font-playfair">Our Product</h2>
                        <div className='myContainer'>
                            <div onClick={onBeoLit20Click} className='containerBox'>
                                <img src={speakerImages.Beolit20} alt="Beolit 20" className='imageInBox'/>
                                <h3 className='headText'>Beolit 20</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿21990</p>
                            </div>
                            <div onClick={onBeoA5Click} className='containerBox'>
                                <img src={speakerImages.Bo6} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beosound A5</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿64700</p>
                            </div>
                            <div onClick={onBeoExClick} className='containerBox'>
                                <img src={speakerImages.Bo7} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beosound Explore</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿7900</p>
                            </div>
                            <div onClick={onBeoA1Click} className='containerBox'>
                                <img src={speakerImages.Bo5} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beosound A1</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿14800</p>
                            </div>
                        </div>
                        <div className='myContainer'>
                             <div onClick={onBeoH100Click} className='containerBox'>
                                <img src={headphoneImages.Hp6} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay H100</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿69000</p>
                            </div>
                              <div onClick={onBeoH95Click} className='containerBox'>
                                <img src={headphoneImages.Hp7} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay H95</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿40990</p>
                            </div>
                              <div onClick={onBeoElevenClick} className='containerBox'>
                                <img src={headphoneImages.Hp8} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay ELEVEN</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿19900</p>
                            </div>
                              <div onClick={onBeoPlayExClick} className='containerBox'>
                                <img src={headphoneImages.Hp9} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay EX</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿18800</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white h-screen px-10 py-7'>
                    <h1 className='text-3xl font-bold'>Brand Story</h1>
                    <ul className='flex flex-row space-x-24 mt-[120px] ml-10'>
                        <li>    
                            <h2 className='text-5xl font-bold'>Sound that elevates</h2>
                            <h3 className='text-5xl font-bold mt-1'>the everyday</h3>
                            <h4 className='text-xl font-light mt-5'>Curated Bang & Olufsen selections with authentic<br />products, after-sales service, and expert sound<br />advice from our specialists.</h4>
                            <ul className='flex flex-col mt-3 space-y-1'>
                                <ul className='flex flex-row space-x-5'>
                                    <li className='flex flex-row space-x-1 items-center'>
                                        <img src={iconImages.clock} alt="" className='w-5 h-5' />
                                        <h1 className='text-lg font-light'>Genuine Products</h1>
                                    </li>
                                    <li className='flex flex-row space-x-1 items-center'>
                                        <img src={iconImages.shipping} alt="" className='w-6 h-6'/>
                                        <h1 className='text-lg font-light'>Free Shipping</h1>
                                    </li>
                                </ul>
                                <ul className='flex flex-row space-x-10'>
                                    <li className='flex flex-row space-x-1 items-center'>
                                        <img src={iconImages.support} alt="" className='w-5 h-5' />
                                        <h1 className='text-lg font-light'>0% installments</h1>
                                    </li>
                                    <li className='flex flex-row space-x-1 items-center'>
                                        <img src={iconImages.support} alt="" className='w-5 h-5' />
                                        <h1 className='text-lg font-light'>Expert Support</h1>
                                    </li>
                                </ul>
                            </ul>
                            <ul className='flex flex-row space-x-7 items-center mt-4'>
                                <li>
                                    <button onClick={goToSpeakers} className='bg-black border-2 border-black text-white h-[45px] w-[160px] rounded-lg'>
                                        Shop Speakers
                                    </button>
                                </li>
                                <li>
                                    <button onClick={goToAboutUs} className='bg-white border-2 text-black h-[40px] w-[140px] rounded-lg'>
                                        About Us
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <iframe
                                data-testid="embed-iframe"
                                title="Spotify player"
                                style={{ borderRadius: 12 }}
                                src="https://open.spotify.com/embed/track/3rmqiQbzPDx7A8p88IRFKg?utm_source=generator"
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        </li>
                          <li>
                            <img src={headphoneImages.homeimage} alt=""  className=' h-[700px] w-auto -mt-[170px] rounded-lg' />
                        </li>
                    </ul>
                </div>
                <div className='bg-gray-400 h-52'>
                    <ul className='flex space-x-12 flex-row backdrop:font-semibold text-xs text-white mt-4 ml-4 absolute'>
                        <li className='flex flex-col space-y-2'>
                            <h1 className='text-2xl'>Dontknow</h1>
                            <h2>ร้าน Dontknow เป็นร้านขายเครืื่องเสียง โดยนำเข้า Marshall Devialet Bang&Olufsen และแบรนด์ชั้นนำต่างๆมาวางขายในประเทศไทย
                                <br/>มีสาขาหลากหลายและมีเว็ปไซท์ที่สามารถนัดทดองมาฟังจริงๆได้ไำด่ไรำด่ไรำด่ไำรนด่ไรำนด่ไำน่ดนนนนไำ
                                <br/>ฟหกห่กืฟา่หกืฟ่าหืกา่ฟหืก่าืหก่าืห่าำได่ไำรด่นไำ่ดนรไำ่ดไำดไำด้ไำรีดดดดดดนนนไนำ
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
                            <li className='flex flex-row space-x-2 justify-center'>
                                <img src={iconImages.tiktok} alt="tiktokicon" className='w-7 h-7 -mt-1' onClick={() => window.open('https://www.tiktok.com/@wishusbetter', '_blank', 'noopener,noreferrer')}/>
                                <img src={iconImages.ig} alt="" className='w-7 h-7 -mt-1' onClick={() => window.open('https://www.instagram.com/wishusbetter/', '_blank', 'noopener,noreferrer')}/>
                                <img src={iconImages.x} alt="" className='w-7 h-7 -mt-1' onClick={() => window.open('https://x.com/renebaee06', '_blank', 'noopener,noreferrer')}/>
                            </li>
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
                {isLoginOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                            <button onClick={() => setIsLoginOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                                <IoClose size={24} />
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                            <form className="space-y-4">
                                <input type="email" placeholder="Email" name='email' className="w-full border p-2 rounded" value={form.email} onChange={handleChange}/>
                                <input type="password" placeholder="Password" name='passWord' className="w-full border p-2 rounded" value={form.passWord} onChange={handleChange}/>
                                <button type='button' className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600" onClick={handleLogin}>Login
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {isRegisterOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                        <div className='bg-white rounded-lg shadow-lg p-6 w-96 relative'>
                            <button onClick={() => setIsRegisterOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                                <IoClose size={24} />
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                            <form className="space-y-4">
                                <input type="email" placeholder="Email" name='email' className="w-full border p-2 rounded" value={form2.email} onChange={handleChange2}/>
                                <input type="text" placeholder='Username' name='userName' className='w-full border p-2 rounded' value={form2.userName} onChange={handleChange2}/>
                                <input type="password" placeholder="Password" name='passWord' className="w-full border p-2 rounded" value={form2.passWord} onChange={handleChange2}/>
                                <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600" onClick={handleRegister}>Register
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {isCartRendered && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsCartOpen(false);}} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out ${isCartVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div onMouseDown={(e) => e.stopPropagation()} className={`bg-white rounded-lg shadow-lg p-6 w-96 relative transform transition-transform duration-300 ease-in-out ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                            <button onClick={() => setIsCartOpen(false)} className='absolute top-3 right-3 text-gray-600 hover:text-black'>
                                <IoClose size={24}/>
                            </button>
                            <h2 className='text-2xl font-bold mb-4 text-center font-playfair'>Cart</h2>
                            <hr className="border-black border-t-2 w-full"/>
                            <ul className='mt-[14px] space-y-5'>
                                {cart.items.length === 0 ? (
                                    <li className="text-center text-gray-500 py-10">
                                        ตะกร้าว่าง
                                    </li> ) : cart.items.map(items => (
                                        <li key={items.orderItemsId}>
                                            <div className='w-full h-28 rounded-lg bg-gray-300 flex space-x-3'>
                                                <div className='w-24 h-20 flex justify-center items-start'>
                                                    <img className='w-24 h-20 ml-4 object-contain' src={getImageById(items.productId)} alt={items.name || ""} />
                                                </div>
                                                <ul className='flex flex-col'>
                                                    <li className='flex flex-row'>
                                                        <h3 className='mt-3 font-bold'>{items.name}</h3>
                                                        <button className='absolute right-9 mt-2' onClick={() => removeItem(items.orderItemsId)}>
                                                            <IoClose size={17}/>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <h3 className='text-xs font-sans'>{items.productDescription}</h3>
                                                    </li>
                                                    <li className='flex flex-row space-x-3'>
                                                        <h3 className='absolute right-24 text-xs font-semibold mt-1'>Quantity :</h3>
                                                        <button className='absolute right-20' onClick={() => decQty(items.orderItemsId, items.qty)}> ‹ </button>
                                                        <div className='bg-white w-5 h-4 absolute right-[53px] mt-[5px]'>
                                                            <h2 className='flex justify-center items-center absolute  ml-[7px] text-xs'>{items.qty}</h2>
                                                        </div>
                                                        <button className='absolute right-10' onClick={() => incQty(items.orderItemsId, items.qty)}> › </button>
                                                    </li>
                                                    <li>
                                                        <div className='bg-gray-300 rounded-sm w-full h-4' />
                                                    </li>
                                                    <li>
                                                        <div className='bg-gray-100 rounded-b-lg w-[336.1px] h-7 mt-4 absolute right-6'>
                                                            <h2 className='absolute right-5 mt-[4.2px] text-sm font-semibold '>
                                                                ฿{Number(items.subtotal).toLocaleString()}
                                                            </h2>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                            <hr className="border-black border-t-2 absolute bottom-24 left-7 right-7"/>
                            <ul>
                                <li>
                                    <h1 className='absolute bottom-8 text-xl font-bold'>฿{Number(cart.actualPrice || 0).toLocaleString()}</h1>
                                </li>
                                <li>
                                    <button onClick={goToAddress} className='w-20 h-10 absolute bottom-7 right-4 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-800 transition'>CheckOut
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isMenuRendered && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMenuOpen(false);}} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start items-stretch z-50 transition-opacity duration-300 ease-in-out ${isMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div onMouseDown={(e) => e.stopPropagation()} className={`bg-white shadow-lg p-6 w-72 relative transform transition-transform duration-300 ease-in-out ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                            <button onClick={() => setIsMenuOpen(false)} className='absolute top-6 left-9 text-gray-600 hover:text-black'>
                                <IoClose size={24}/>
                            </button>
                            <ul className='flex space-y-3 flex-col mt-16 ml-2 font-semibold text-xl'>
                                <li>
                                    <button>Homes</button>
                                </li>
                                <li>
                                    <button>All Product</button>
                                </li>
                                <li>
                                    <button onClick={goToSpeakers}>Speakers</button>
                                </li>
                                <li>
                                    <button onClick={goToHeadphones}>Headphones</button>
                                </li>
                                <li>
                                    <button onClick={goToSoundbars}>Soundbars</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoLit20Open && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoLit20Open(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoLit20Open(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beolit 20</h2>
                            <h3 className='h3product'>Bang & Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿21,990</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(1)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(1)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                            <p className='mt-auto font-light text-red-600 text-center'>{message}</p>
                        </div>
                    </div>
                )}
                {isBeoA5Open && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoA5Open(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoA5Open(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beoplay A5</h2>
                            <h3 className='h3product'>Bang & Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images2[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} 
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿64,700</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(2)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(2)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoExOpen && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoExOpen(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoExOpen(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beosound Explore</h2>
                            <h3 className='h3product'>Bang & Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images3[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))} 
                                                    className="picbutton">
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
                             <h1 className='h1price'>฿7,900</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(3)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(3)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoA1Open && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoA1Open(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoA1Open(false)} className="closebutton">
                                        <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beosound A1</h2>
                            <h3 className='h3product'>Bang & Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images4[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))} 
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿14,800</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(4)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(4)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoH100Open && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoH100Open(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoH100Open(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beoplay H100</h2>
                            <h3 className='h3product'>Bang&Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images5[currentIndex]} alt="" className="productpic"/>
                                         <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿69,000</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(21)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(21)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoH95Open && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoH95Open(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoH95Open(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beoplay H95</h2>
                            <h3 className='h3product'>Bang&Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images6[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿40,990</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(22)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(22)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoElevenOpen && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoElevenOpen(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoElevenOpen(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beoplay ELEVEN</h2>
                            <h3 className='h3product'>Bang&Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images7[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿19,900</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(23)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(23)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {isBeoPlayExOpen && (
                    <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoPlayExOpen(false);}} className="modalproductbg">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                            <button onClick={() => setIsBeoPlayExOpen(false)} className="closebutton">
                                <IoClose size={24} />
                            </button>
                            <h2 className="h2product">Beoplay EX</h2>
                            <h3 className='h3product'>Bang&Olufsen</h3>
                            <ul className='flex flex-row space-x-32'>
                                <li>
                                    <div className="divproduct">
                                        <img src={images8[currentIndex]} alt="" className="productpic"/>
                                        <ul className='ulpicbutton'>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                                    className="picbutton">
                                                        ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                                    className="picbutton">
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
                            <h1 className='h1price'>฿18,800</h1>
                            <ul className='ulabbutton'>
                                <li>
                                    <button onClick={() => addToCart(24)} className='abbutton'>Add
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => addToBuy(24)} className='abbutton'>Buy
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )} 
        </main>
    )
}

export default Home

