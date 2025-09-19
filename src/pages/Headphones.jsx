import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { getImageById } from "/Styles/product-images"; 
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { headphoneImages } from '../assets';


function Headphones({onMonitor3Click, onMajorVClick, onMotifClick, onMinorClick, onBeoH100Click, onBeoH95Click, onBeoElevenClick, onBeoExClick, onGeminiClick, onGeminiLuxClick, onBeoH4Click, onBeoHXClick, onBeoEQClick, onBeoE8Click, onMajorIVClick, onAirpodsClick}) {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartRendered, setIsCartRendered] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
    const [isAirpodsOpen, setIsAirpodsOpen] = useState(false);



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
    onAirpodsClick = (() => setIsAirpodsOpen(true));



    const images = [
        "/src/assets/พื้นหลัง monitor-iii-anc-front-desktop-01 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง monitor-iii-anc-side-desktop-07 ถูกเอาออก.png",
        "/src/assets/monitor-iii-anc-hand-desktop-06-removebg-preview.png"
    ];

    const images2 = [
        "/src/assets/พื้นหลัง 1-major-v-cream-front-desktop ถูกเอาออก.png",
        "/src/assets/พื้นหลัง 6-major-v-cream-front-desktop ถูกเอาออก.png",
        "/src/assets/3-major-v-cream-side-desktop-removebg-preview.png"
    ];

    const images3 = [
        "/src/assets/Motif-II-front-desktop-1-removebg-preview.png",
        "/src/assets/พื้นหลัง Motif-II-above-desktop-6 ถูกเอาออก.png",
        "/src/assets/Motif-II-zoom-desktop-4-removebg-preview.png"
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
        "/src/assets/พื้นหลัง Visual_Packshot_Saphir_Black_75268 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Visual_Packshot_Saphir_Black_75065 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Visual_Packshot_Saphir_Black_75556-75571 ถูกเอาออก.png"
    ];
    
    const images10 = [
        "/src/assets/พื้นหลัง PALAST-230531-90365_copie ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Copie_de_Visual_Packshots_Saphir_ODP_90509-90514 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง PALAST-230531-90204_copie ถูกเอาออก.png"
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
        "/src/assets/AirPods_Max_Starlight_3-square_medium-removebg-preview.png",
        "/src/assets/AirPods_Max_Starlight_1-square_medium-removebg-preview.png",
        "/src/assets/AirPods_Max_Starlight_2-square_medium-removebg-preview.png"
    ];

    const images16 = [
        "/src/assets/พื้นหลัง major-iv-black-front-desktop-1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง major-iv-black-front_standing-desktop-5 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง major-iv-black-hand-desktop-6 ถูกเอาออก.png"
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const navigate = useNavigate();
    const goToHome = () =>{
      navigate('/pages/Home'); 
    }

    const Navigate = useNavigate();
    const goToSpeakers = () =>{
      Navigate('/pages/Speakers'); 
    }

    const navigate11 = useNavigate();
    const goToSoundbars = () =>{
      navigate11('/pages/Soundbars')
    }

    const navigate14 = useNavigate();
        const goToAddress = () =>{
            navigate14('/pages/Address')
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

    const [message2] = useState();
    const handleChange2 = (e) =>{
        setForm2({
            ...form2,
            [e.target.name]:e.target.value,
        });
    };

    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            const API = await axios.get('http://localhost:5283/api/Authen/Login',{
                params: {
                    Email: form.email,
                    PassWord: form.passWord
                }
            });

            setMessage(API.data)
            console.log("API Response:", API.data);

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
                else{
                    alert('No Role');
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
            alert(API.data)
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                alert(error.response.data);
            } else 
            {
                alert('Register failed');
            }
        };
    };


    useEffect(() => { if (isCartVisible) refreshCart(); }, [isCartVisible]);

    const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
    const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });

    async function refreshCart() {
        const { data } = await axios.get(`http://localhost:5283/api/OrderItem/Current`, { headers: auth() });
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

    const closeallmodal = () =>{

        setIsMonitor3Open(false);
        setIsMajorVOpen(false);
        setIsMotifOpen(false);
        setIsMinorOpen(false);
        setIsBeoH100Open(false);
        setIsBeoH95Open(false);
        setIsBeoElevenOpen(false);
        setIsBeoExOpen(false);
        setIsGeminiOpen(false);
        setIsGeminiLuxOpen(false);
        setIsBeoH4Open(false);
        setIsBeoHXOpen(false);
        setIsBeoEQOpen(false);
        setIsBeoE8Open(false);
        setIsMajorIVOpen(false);
        setIsAirpodsOpen(false);
    };

    const addToCart = async (ProductId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("กรุณาเข้าสู่ระบบก่อน");
                
                closeallmodal();
                setIsLoginOpen(true)      
                return;
            }

            const API =  await axios.post("http://localhost:5283/api/OrderItem/AddItem",
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

    
    return (
        <main>
            <Navbar onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)}/>
            <div className='bg-[#edeef0] h-[1800px] flex items-start justify-center'>
                <div className='container text-center mx-auto'>
                    <h1 className='text-3xl text-[#212529] text-left font-extrabold -ml-11 mt-28 font-playfair'>Headphones</h1>
                    <div className='myContainer'>
                        <div onClick={onMonitor3Click} className='containerBox relative'>
                            <img src={headphoneImages.Hp1} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>MONITOR III A.N.C.</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿12990</p>
                        </div>
                        <div onClick={onMajorVClick} className='containerBox'>
                            <img src={headphoneImages.Hp2} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MAJOR V</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿5990</p>
                        </div>
                        <div onClick={onMotifClick} className='containerBox'>
                            <img src={headphoneImages.Hp3} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MOTIF II A.N.C.</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿7490</p>
                        </div>
                        <div onClick={onMinorClick} className='containerBox'>
                            <img src={headphoneImages.Hp4} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MINOR IV</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿4990</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onBeoH100Click} className='containerBox'>
                            <img src={headphoneImages.Hp6} alt="Beolit 20" className='imageInBox'/>
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
                        <div onClick={onBeoExClick} className='containerBox'>
                            <img src={headphoneImages.Hp9} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay EX</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿9790</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onGeminiClick} className='containerBox'>
                            <img src={headphoneImages.Hp10} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Gemini II</h3>
                            <p className="desText">Devialet</p>
                            <p className="priceText">฿14990</p>
                        </div>
                        <div onClick={onGeminiLuxClick} className='containerBox'>
                            <img src={headphoneImages.Hp11} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Gemini II Opéra de Paris</h3>
                            <p className="desText">Devialet</p>
                            <p className="priceText">฿22490</p>
                        </div>
                        <div onClick={onBeoH4Click} className='containerBox'>
                            <img src={headphoneImages.Hp13} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay H4</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿9790</p>
                        </div>
                        <div onClick={onBeoHXClick} className='containerBox'>
                            <img src={headphoneImages.Hp12} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay HX</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿27900</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onBeoEQClick} className='containerBox'>
                            <img src={headphoneImages.Hp15} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay EQ</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿12900</p>
                        </div>
                        <div onClick={onBeoE8Click} className='containerBox'>
                            <img src={headphoneImages.Hp14} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beoplay E8</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿9900</p>
                        </div>
                        <div onClick={onMajorIVClick} className='containerBox'>
                            <img src={headphoneImages.Hp17} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>MAJOR IV</h3>
                            <p className="desText">Marshall</p>
                            <p className="priceText">฿4890</p>
                        </div>
                        <div onClick={onAirpodsClick} className='containerBox'>
                            <img src={headphoneImages.Hp16} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Airpods Max</h3>
                            <p className="desText">Apple</p>
                            <p className="priceText">฿19900</p>
                        </div>
                    </div>
                </div>
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
                            <p className='mt-auto font-light text-red-600 text-center'>{message}</p>
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
                            <p className='mt-auto font-light text-red-600 text-center'>{message2}</p>
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
                        <h2 className='text-2xl font-bold mb-4 text-center'>Cart</h2>
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
                                                    <button className='absolute right-20' onClick={() => decQty(items.orderItemsId, items.qty)}> 
                                                        ‹ 
                                                    </button>
                                                    <div className='bg-white w-5 h-4 absolute right-[53px] mt-[5px]'>
                                                        <h2 className='flex justify-center items-center absolute  ml-[7px] text-xs'>{items.qty}</h2>
                                                    </div>
                                                    <button className='absolute right-10' onClick={() => incQty(items.orderItemsId, items.qty)}>
                                                        › 
                                                    </button>
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
                                ))}
                        </ul>
                        <hr className="border-black border-t-2 absolute bottom-24 left-7 right-7"/>
                        <ul>
                            <li>
                                <h1 className='absolute bottom-8 text-xl font-bold'>฿{Number(cart.actualPrice || 0).toLocaleString()}</h1>
                            </li>
                            <li>
                                <button onClick={goToAddress} className='w-20 h-10 absolute bottom-7 right-4 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-800 transition'>
                                    CheckOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMenuRendered &&(
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMenuOpen(false);}} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start items-stretch z-50 transition-opacity duration-300 ease-in-out ${isMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div onMouseDown={(e) => e.stopPropagation()} className={`bg-white shadow-lg p-6 w-72 relative transform transition-transform duration-300 ease-in-out ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'}`}>
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
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMajorVOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsMajorVOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">MAJOR V</h2>
                        <h3 className='h3product'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images2[currentIndex]} alt="Major V" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>100+ HOURS OF WIRELESS PLAYTIME</h2>
                                <h3 className='mt-2'>Packing 100+ hours of wireless playtime, you can be gone for days and never be left without a soundtrack. Major V can be charged using the quick charge option, so you’ll dive back into the session in no time.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿5,990</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(18)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(18)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                        <p className='mt-auto font-light text-red-600 text-center'>{message}</p>
                    </div>
                </div>
            )}
            {isMonitor3Open && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMonitor3Open(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsMonitor3Open(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">MONITOR III A.N.C.</h2>
                        <h3 className='h3product'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images[currentIndex]} alt="Monitor III" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>MARSHALL SIGNATURE SOUND</h2>
                                <h3 className='mt-2'>Monitor III A.N.C. is your sensational sound guarantee. Featuring Dynamic Loudness, these headphones adjust the treble, mids and bass for the most optimal sound at every volume.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿12,990</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(17)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(17)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMotifOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMotifOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsMotifOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">MOTIF II A.N.C.</h2>
                        <h3 className='h3product'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images3[currentIndex]} alt="Motif II" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>ANC & TRANSPARENCY MODE</h2>
                                <h3 className='mt-2'>Get locked into the sounds of your choice with improved active noise cancelling technology and use the app to amplify your playlist. Savour the music that matters to you, uninterrupted. For a quick conversation, switch seamlessly into transparency mode to let the outside back in and stay in tune with your surroundings. </h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿7,490</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(19)}className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(19)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMinorOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMinorOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsMinorOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">MINOR IV</h2>
                        <h3 className='h3product'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images4[currentIndex]} alt="Minor IV" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>DESIGNED FOR COMFORT</h2>
                                <h3 className='mt-2'>To keep the session going, Minor IV features a re-designed earbud and stem, angled to create a truer fit inside the ear canal. They're also water-resistant so the music doesn’t have to stop when it rains.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿4,990</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(20)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(20)} className='abbutton'>Buy
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
                                    <img src={images5[currentIndex]} alt="Beoplay H100" className="productpic"/>
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
                                    <img src={images6[currentIndex]} alt="Beoplay H95" className="productpic"/>
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
                                    <img src={images7[currentIndex]} alt="Beoplay Eleven" className="productpic"/>
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
                                <button onClick={() => addToCart(23)}className='abbutton'>Add
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
            {isBeoExOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoExOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsBeoExOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Beoplay EX</h2>
                        <h3 className='h3product'>Bang&Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images8[currentIndex]} alt="Beoplay Ex" className="productpic"/>
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
                        <h1 className='h1price'>฿9,790</h1>
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
            {isGeminiOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsGeminiOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsGeminiOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Gemini II</h2>
                        <h3 className='h3product'>Devialet</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images9[currentIndex]} alt="Gemini II" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>Devialet signature sound on-the-go.</h2>
                                <h3 className='mt-2'>Next-generation earbuds, next-level sound. Devialet Gemini II packs a suite of enhanced tech to take you even deeper into pure sound. With Devialet Adaptive Noise Cancellation™, you are protected from the ambient chaos and transported to a place that’s harmonious and pure.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿14,990</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(25)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(25)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isGeminiLuxOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsGeminiLuxOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsGeminiLuxOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Gemini II Opéra de Paris</h2>
                        <h3 className='h3product'>Devialet</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images10[currentIndex]} alt="Gemini II Lux" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>Nomadic Sound. Gilded to Perfection.</h2>
                                <h3 className='mt-2'>Our second-generation earbuds get the gold treatment. With a majestic 24-carat gold finish, this spectacularly compact case features proprietary acoustic innovations by Devialet, enhanced connectivity and improved ergonomics.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿22,490</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(26)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(26)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoH4Open && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoH4Open(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsBeoH4Open(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Beoplay H4</h2>
                        <h3 className='h3product'>Bang&Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images11[currentIndex]} alt="Beoplay H4" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>Pure expression. Superior sound.</h2>
                                <h3 className='mt-2'>Contemporary over-ear headphones with long-lasting comfort, superior sound and voice assistant.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿9,790</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(27)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(27)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoHXOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoHXOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsBeoHXOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Beoplay HX</h2>
                        <h3 className='h3product'>Bang&Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images12[currentIndex]} alt="Beoplay Hx" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>Comfortable, do-it-all headphones</h2>
                                <h3 className='mt-2'>Wireless over ear headphones. Listen in comfort whether you're on a call, working from home or taking a moment for yourself.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿27,900</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(28)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(28)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoEQOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoEQOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsBeoEQOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Beoplay EQ</h2>
                        <h3 className='h3product'>Bang&Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images13[currentIndex]} alt="Beoplay Eq" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>Adaptive noise cancelling wireless earphones</h2>
                                <h3 className='mt-2'>Immerse yourself in pure sound. Noise cancelling earphones with 6 built-in microphones, for clear calls and authentic audio.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿12,900</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(29)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(29)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBeoE8Open && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsBeoE8Open(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsBeoE8Open(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Beoplay E8</h2>
                        <h3 className='h3product'>Bang&Olufsen</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images14[currentIndex]} alt="Beoplay E8" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>More compact. More powerful.</h2>
                                <h3 className='mt-2'>Our truly wireless in-ear earphones with an improved battery life of up to 35 hours, a QI-certified wireless charging case and Bluetooth 5.1 connectivity ensure a seamless and powerful listening experience.</h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿9,900</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(32)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(32)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMajorIVOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsMajorIVOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsMajorIVOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Major IV</h2>
                        <h3 className='h3product'>Marshall</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images16[currentIndex]} alt="Major IV" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>ICONIC & FOLDABLE DESIGN</h2>
                                <h3 className='mt-2'>Major IV combines enhanced usability with classic Marshall elements for a design that is both iconic and innovative. The new fold clip means that Major IV folds away into an even more compact size, and the ear caps are protected from excessive wear and tear. It features the tactile and efficient control knob, textured black vinyl and Marshall script, as well as the rugged durability that’s necessary for the anarchy of everyday life. </h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿4,890</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(30)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(30)} className='abbutton'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isAirpodsOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsAirpodsOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setIsAirpodsOpen(false)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">Airpods Max</h2>
                        <h3 className='h3product'>Apple</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="divproduct">
                                    <img src={images15[currentIndex]} alt="Airpods Max" className="productpic"/>
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
                                <h2 className='text-black text-2xl font-semibold'>ICONIC & FOLDABLE DESIGN</h2>
                                <h3 className='mt-2'>Major IV combines enhanced usability with classic Marshall elements for a design that is both iconic and innovative. The new fold clip means that Major IV folds away into an even more compact size, and the ear caps are protected from excessive wear and tear. It features the tactile and efficient control knob, textured black vinyl and Marshall script, as well as the rugged durability that’s necessary for the anarchy of everyday life. </h3>
                            </li>
                        </ul>
                        <h1 className='h1price'>฿19,990</h1>
                        <ul className='ulabbutton'>
                            <li>
                                <button onClick={() => addToCart(31)} className='abbutton'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(31)} className='abbutton'>Buy
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