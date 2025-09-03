import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getImageById } from "/Styles/product-images";
import { jwtDecode } from 'jwt-decode';
import { IoClose } from 'react-icons/io5';


import Sb1 from "/src/assets/Theatre_Alu_Hero.png"
import Sb2 from "/src/assets/Devialet_Dione_Opera_12.png.webp"
import Sb3 from "/src/assets/Devialet_Dione_1.png.webp"
import Sb4 from "/src/assets/Packshot-Beosound-Stage-Gold-Tone-0228-Perspective-1200x1200px.png"
import Sb5 from "/src/assets/1.HK_Citation_Multibeam_1100_Product Image_Black_Hero.png"
import Sb6 from "/src/assets/01.HK_Enchant_900_Black_Hero.png"
import Sb7 from "/src/assets/HK-Citation-Sub-Hero-GRAY-1605x1605px.png"
import Sb8 from "/src/assets/HK-Citation-Bar-Hero-GRAY-1605x1605px.png"
import Sb9 from "/src/assets/Panorama-Black_Image_1.webp"
import Sb10 from "/src/assets/pdt-xio-stn-pks-01_1024x1024.png"
import Sb11 from "/src/assets/พื้นหลัง _sonos_arc_ultra_soundbar ถูกเอาออก.png"
import Sb12 from "/src/assets/sennheiser-ambeo-mini.webp"
import Sb13 from "/src/assets/packshot_ha_soundbar_300.png"
import Sb14 from "/src/assets/พื้นหลัง th-q-series-soundbar-hw-qs700f-hw-qs700f-xt-545515627 ถูกเอาออก.png"
import Sb15 from "/src/assets/พื้นหลัง th-b-series-soundbar-hw-b650f-hw-b650f-xt-546175922 ถูกเอาออก.png"
import Sb16 from "/src/assets/พื้นหลัง th-q-series-soundbar-hw-q600f-hw-q600f-xt-546175706 ถูกเอาออก.png"


function Soundbars({onHestonClick, onDioneLuxClick, onDioneClick, onStageClick, onMultibeamClick, onEnchant900Click, onSubClick, onBarClick, onPano3Click, onXIOClick, onArcUltraClick, onAmbeoMiniClick, onSB300Click, onHW700FCLick, onHW650FClick, onHW600FClick}) {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartRendered, setIsCartRendered] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [isHestonOpen, setIsHestonOpen] = useState(false);
    const [isDioneLuxOpen, setIsDioneLuxOpen] = useState(false);
    const [isDioneOpen, setIsDioneOpen] = useState(false);
    const [isStageOpen, setIsStageOpen] = useState(false);
    const [isMultibeamOpen, setIsMultibeamOpen] = useState(false);
    const [isEnchant900Open, setIsEnchant900Open] = useState(false);
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [isPano3Open, setIsPano3Open] = useState(false);
    const [isXIOOpen, setIsXIOOpen] = useState(false);
    const [isArcUltraOpen, setIsArcUltraOpen] = useState(false);
    const [isAmbeoMiniOpen, setIsAmbeoMiniOpen] = useState(false);
    const [isSB300Open, setIsSB300Open] = useState(false);
    const [isHW700FOpen, setIsHW700FOpen] = useState(false);
    const [isHW650FOpen, setIsHW650FOpen] = useState(false);
    const [isHW600FOpen, setIsHW600FOpen] = useState(false);


    onHestonClick = (() => setIsHestonOpen(true));
    onDioneLuxClick = (() => setIsDioneLuxOpen(true));
    onDioneClick = (() => setIsDioneOpen(true));
    onStageClick = (() => setIsStageOpen(true));
    onMultibeamClick = (() => setIsMultibeamOpen(true));
    onEnchant900Click = (() => setIsEnchant900Open(true));
    onSubClick = (() => setIsSubOpen(true));
    onBarClick = (() => setIsBarOpen(true));
    onPano3Click = (() => setIsPano3Open(true));
    onXIOClick = (() => setIsXIOOpen(true));
    onArcUltraClick = (() => setIsArcUltraOpen(true));
    onAmbeoMiniClick = (() => setIsAmbeoMiniOpen(true));
    onSB300Click = (() => setIsSB300Open(true));
    onHW700FCLick = (() => setIsHW700FOpen(true));
    onHW650FClick = (() => setIsHW650FOpen(true));
    onHW600FClick = (() => setIsHW600FOpen(true));


    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/src/assets/Theatre_Alu_Hero.png",
        "/src/assets/Theatre_Alu_front.png",
        "/src/assets/Beosound_Theatre_0043.png"
    ];

    const images2 = [
        "/src/assets/พื้นหลัง Devialet_Dione_Opera_12 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Devialet_Dione_Opera_03_1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Devialet_Dione_Opera_09_1 ถูกเอาออก.png"
    ];

    const images3 = [
        "/src/assets/พื้นหลัง Devialet_Dione_1 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Devialet_Dione_3 ถูกเอาออก.png",
        "/src/assets/พื้นหลัง Devialet_Dione_3_2 ถูกเอาออก.png"
    ];

    const images4 = [
        "/src/assets/Packshot-Beosound-Stage-Gold-Tone-0228-Perspective-1200x1200px.png",
        "/src/assets/Beosound-stage-front-Gold-Tone.png",
        "/src/assets/Beosound_Stage-tvfront-Gold-Tone.png"
    ];

    const images5 = [
        "/src/assets/1.HK_Citation_Multibeam_1100_Product Image_Black_Hero.png",
        "/src/assets/2.HK_Citation_Multibeam_1100_Product Image_Black_Front.png",
        "/src/assets/3.HK_Citation_Multibeam_1100_Product Image_Black_Back.png"
    ];

    const images6 = [
        "/src/assets/01.HK_Enchant_900_Black_Hero.png",
        "/src/assets/02.HK_Enchant_900_Black_Front.png",
        "/src/assets/03.HK_Enchant_900_Black_Back.png"
    ];

    const images7 = [
        "/src/assets/HK-Citation-Sub-Hero-GRAY-1605x1605px.png",
        "/src/assets/HK-Citation-Sub-Front-GRAY-1605x1605px.png",
        "/src/assets/HK-Citation-Sub-Back-GRAY-1605x1605px.png"
    ];

    const images8 = [
        "/src/assets/HK-Citation-Bar-Hero-GRAY-1605x1605px.png",
        "/src/assets/HK-Citation-Bar-Front-GRAY-1605x1605px.png",
        "/src/assets/HK-Citation-BAR-GREY-Back-1605x1605px.png"
    ];

    const images9 = [
        "/src/assets/Panorama-Black_Image_1.webp",
        "/src/assets/Panorama-Black_Image_2.png",
        "/src/assets/Panorama-Black_Image_3.png"
    ];

    const images10 = [
        "/src/assets/pdt-xio-stn-pks-06_1024x1024.png.webp",
        "/src/assets/pdt-xio-stn-pks-01_1024x1024.png",
        "/src/assets/pdt-xio-stn-pks-04_1024x1024.png"
    ];

    const images11 = [
        "/src/assets/_sonos_arc_ultra_soundbar.webp",
        "/src/assets/a49e196bcae4958f391ba2ede13b9135e530c7ff-2880x2880.png.avif",
        "/src/assets/_sonos_arc_ultra_soundbar.004.jpeg"
    ];

    const images12 = [
        "/src/assets/ambeo1.webp",
        "/src/assets/ambeo2.webp",
        "/src/assets/ambeo3.webp"
    ];

    const images13 = [
        "/src/assets/packshot_ha_soundbar_300.png",
        "/src/assets/JBLBar300_WEB_FRONT_1024x1024.png",
        "/src/assets/JBLBar300_WEB_BACK_1024x1024.png"
    ];

    const images14 = [
        "/src/assets/th-q-series-soundbar-hw-qs700f-hw-qs700f-xt-545515627.avif",
        "/src/assets/th-q-series-soundbar-hw-qs700f-hw-qs700f-xt-545515628.avif",
        "/src/assets/th-q-series-soundbar-hw-qs700f-hw-qs700f-xt-545515620.avif"
    ];

    const images15 = [
        "/src/assets/พื้นหลัง th-b-series-soundbar-hw-b650f-hw-b650f-xt-546175922 ถูกเอาออก.png",
        "/src/assets/th-b-series-soundbar-hw-b650f-hw-b650f-xt-546175923.jpeg",
        "/src/assets/th-b-series-soundbar-hw-b650f-hw-b650f-xt-546175931.jpeg"
    ];

    const images16 = [
        "/src/assets/พื้นหลัง th-q-series-soundbar-hw-q600f-hw-q600f-xt-546175706 ถูกเอาออก.png",
        "/src/assets/th-q-series-soundbar-hw-q600f-hw-q600f-xt-546175707.avif",
        "/src/assets/th-q-series-soundbar-hw-q600f-hw-q600f-xt-546175701.jpeg"
    ];

    const navigatE = useNavigate();
    const goToHome = () =>{
      navigatE('/pages/Home'); 
    }

    const Navigate2 = useNavigate();
    const goToSpeakers = () =>{
      Navigate2('/pages/Speakers'); 
    }

    const navigate5 = useNavigate();
    const goToHeadphones = () =>{
        navigate5('/pages/Headphones')
    }

    const navigate7 = useNavigate();
    const goToAddress = () =>{
        navigate7('/pages/Address')
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

    const addToCart = async (ProductId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("กรุณาเข้าสู่ระบบก่อน");

                setIsHestonOpen(false);
                setIsDioneLuxOpen(false);
                setIsDioneOpen(false);
                setIsStageOpen(false);
                setIsMultibeamOpen(false);
                setIsEnchant900Open(false);
                setIsSubOpen(false);
                setIsBarOpen(false);
                setIsPano3Open(false);
                setIsXIOOpen(false);
                setIsArcUltraOpen(false);
                setIsAmbeoMiniOpen(false);
                setIsSB300Open(false);
                setIsHW700FOpen(false);
                setIsHW650FOpen(false);
                setIsHW600FOpen(false);

                setIsLoginOpen(true)
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
                navigatE("/pages/Address"); 
                return;
            }

            const oid = Number(API.data?.orderId ?? API.data?.OrderId); 
            if (Number.isFinite(oid) && oid > 0) {
                localStorage.setItem("currentOrderId", String(oid));
            }
         
            
            setIsHestonOpen(false);
            setIsDioneLuxOpen(false);
            setIsDioneOpen(false);
            setIsStageOpen(false);
            setIsMultibeamOpen(false);
            setIsEnchant900Open(false);
            setIsSubOpen(false);
            setIsBarOpen(false);
            setIsPano3Open(false);
            setIsXIOOpen(false);
            setIsArcUltraOpen(false);
            setIsAmbeoMiniOpen(false);
            setIsSB300Open(false);
            setIsHW700FOpen(false);
            setIsHW650FOpen(false);
            setIsHW600FOpen(false);
            
            setIsCartOpen(true);
            alert("เพิ่มลงตะกร้าแล้ว");


        } catch(error){
            const status = error?.response?.status;
            const raw = error?.response?.data;
            const msg = typeof raw === "string" ? raw : raw?.message;

            if (status === 404 && msg === "No Address") {
                alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
                navigatE("/pages/Address");
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
                navigatE('/pages/Home')
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
                navigatE("/pages/Address"); 
                return;
            }

            const oid = Number(API.data?.orderId ?? API.data?.OrderId); 
            if (Number.isFinite(oid) && oid > 0) {
                localStorage.setItem("currentOrderId", String(oid));
            }

            setIsHestonOpen(false);
            setIsDioneLuxOpen(false);
            setIsDioneOpen(false);
            setIsStageOpen(false);
            setIsMultibeamOpen(false);
            setIsEnchant900Open(false);
            setIsSubOpen(false);
            setIsBarOpen(false);
            setIsPano3Open(false);
            setIsXIOOpen(false);
            setIsArcUltraOpen(false);
            setIsAmbeoMiniOpen(false);
            setIsSB300Open(false);
            setIsHW700FOpen(false);
            setIsHW650FOpen(false);
            setIsHW600FOpen(false);
           
            navigatE("/pages/Address");
            

        } catch(error){
            const status = error?.response?.status;
            const raw = error?.response?.data;
            const msg = typeof raw === "string" ? raw : raw?.message;
            alert("ไม่มีที่อยู่");


            if (status === 404 && msg === "No Address") {
                alert("ต้องเพิ่มที่อยู่ก่อนชำระเงิน");
                navigatE("/pages/Address");
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
                    <h1 className='text-3xl text-[#212529] text-left font-extrabold -ml-11 mt-28 font-playfair'>Soundbars</h1>
                    <div className='myContainer'>
                        <div onClick={onHestonClick} className='containerBox relative'>
                            <img src={Sb1} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Beosound Theatre</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿439000</p>
                        </div>
                        <div onClick={onDioneLuxClick} className='containerBox'>
                            <img src={Sb2} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Dione Opéra de Paris</h3>
                            <p className="desText">Devialet</p>
                            <p className="priceText">฿105000</p>
                        </div>
                        <div onClick={onDioneClick} className='containerBox'>
                            <img src={Sb3} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Dione</h3>
                            <p className="desText">Devialet</p>
                            <p className="priceText">฿75000</p>
                        </div>
                        <div onClick={onStageClick} className='containerBox'>
                            <img src={Sb4} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Beosound Stage</h3>
                            <p className="desText">Bang&Olufsen</p>
                            <p className="priceText">฿103600</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onMultibeamClick} className='containerBox'>
                            <img src={Sb5} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Citation Multibeam™ 1100</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿34500</p>
                        </div>
                        <div onClick={onEnchant900Click} className='containerBox'>
                            <img src={Sb6} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Enchant 900</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿18000</p>
                        </div>
                        <div onClick={onSubClick} className='containerBox'>
                            <img src={Sb7} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Citation Sub</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿7900</p>
                        </div>
                        <div onClick={onBarClick} className='containerBox'>
                            <img src={Sb8} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Citation Bar</h3>
                            <p className="desText">Harman Kardon</p>
                            <p className="priceText">฿14800</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onPano3Click} className='containerBox'>
                            <img src={Sb9} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Panorama 3</h3>
                            <p className="desText">Bowers&Wilkins</p>
                            <p className="priceText">฿32990</p>
                        </div>
                        <div onClick={onXIOClick} className='containerBox'>
                            <img src={Sb10} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>XIO</h3>
                            <p className="desText">KEF</p>
                            <p className="priceText">฿79900</p>
                        </div>
                        <div onClick={onArcUltraClick} className='containerBox'>
                            <img src={Sb11} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Arc Ultra</h3>
                            <p className="desText">Sonos</p>
                            <p className="priceText">฿49900</p>
                        </div>
                        <div onClick={onAmbeoMiniClick} className='containerBox'>
                            <img src={Sb12} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>Ambeo Mini</h3>
                            <p className="desText">Sennheiser</p>
                            <p className="priceText">฿22600</p>
                        </div>
                    </div>
                    <div className='myContainer'>
                        <div onClick={onSB300Click} className='containerBox'>
                            <img src={Sb13} alt="Beolit 20" className='imageInBox'/>
                            <h3 className='headText'>Soundbar 300</h3>
                            <p className="desText">JBL</p>
                            <p className="priceText">฿16900</p>
                        </div>
                        <div onClick={onHW700FCLick} className='containerBox'>
                            <img src={Sb14} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>HW-QS700F</h3>
                            <p className="desText">Samsung</p>
                            <p className="priceText">฿16490</p>
                        </div>
                        <div onClick={onHW650FClick} className='containerBox'>
                            <img src={Sb15} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>HW-B650F</h3>
                            <p className="desText">Samsung</p>
                            <p className="priceText">฿8990</p>
                        </div>
                        <div onClick={onHW600FClick} className='containerBox'>
                            <img src={Sb16} alt="Be 20" className='imageInBox'/>
                            <h3 className='headText'>HW-Q600F</h3>
                            <p className="desText">Samsung</p>
                            <p className="priceText">฿12990</p>
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
                            <button type='button' className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600" onClick={handleLogin}>
                                Login
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
                            <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600" onClick={handleRegister}>
                                Register
                            </button>
                            <p className='mt-auto font-light text-red-600 text-center'>{message2}</p>
                        </form>
                    </div>
                </div>
            )} 
            {isCartRendered && (
                <div className=
                    {`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out
                        ${isCartVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
                    }>
                        <div className=
                            {`bg-white rounded-lg shadow-lg p-6 w-96 relative transform transition-transform duration-300 ease-in-out
                                ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`
                            }>
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
                                    ))}
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
                                <button>Soundbars
                                </button>
                            </li>
                        </ul>  
                    </div>
                </div>
            )}
            {isHestonOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsHestonOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beosound Theatre</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Rule-defying, heart-racing soundbar</h2>
                                <h3 className='mt-2'>Four patent-pending acoustic innovations in one sleek soundbar. With its Dolby Atmos surround sound, twelve custom drivers and versatile TV fit, this soundbar will last for generations. The swappable covers and variety in position means it’ll evolve with your style for just as long.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿439,000</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(33)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(33)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                        <p className='mt-auto font-light text-white text-center'>{message}</p>
                    </div>
                </div>
            )}
            {isDioneLuxOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsDioneLuxOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Dione Opéra de Paris</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Devialet</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Bring the show to life.</h2>
                                <h3 className='mt-2'>Born of our ongoing partnership with the Opéra de Paris, this collector’s edition all-in-one soundbar features sleek extremities flanking a 22-carat moon gold central plate, inspired by the gilded interiors of Paris’s Opéra Garnier. Now you can tap into the emotional impact of the opera, from the privacy of your own home.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿105,000</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(34)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(34)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isDioneOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsDioneOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Dione</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Devialet</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>A true all-in-one soundbar.</h2>
                                <h3 className='mt-2'>Seventeen autonomous high-end drivers, all powered by proprietary Devialet technologies, come together to deliver deep infrabass and crystal-clear treble. A plug-and-play way to enjoy a vivid, cinematic viewing experience in a 3D, 5.1.2 configuration. Do you dare to feel the crescendo?</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿75,000</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(35)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(35)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isStageOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsStageOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Beosound Stage</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bang&Olufsen</h3>
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
                                <h2 className='text-black text-2xl font-semibold'>Powerful Dolby Atmos soundbar</h2>
                                <h3 className='mt-2'>Powerful soundbar that brings Bang & Olufsen sound to your own TV without the need of a subwoofer.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿103,600</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(36)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(36)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMultibeamOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsMultibeamOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Citation Multibeam™ 1100</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images5[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>3D SURROUND SOUND WITH DOLBY ATMOS® AND MULTIBEAM™</h2>
                                <h3 className='mt-2'>Immerse yourself in your favorite music, movies and games with Dolby Atmos® and MultiBeam™ from a beautifully crafted soundbar. Up-firing height channels create a multi-dimensional surround sound experience and MultiBeam™ technology creates a wider soundstage all around you.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿34,500</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(37)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(37)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isEnchant900Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsEnchant900Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Enchant 900</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images6[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>DISTINGUISHED DESIGN</h2>
                                <h3 className='mt-2'>The Harman Kardon Enchant 900 features more than fantastic sound. Its beautiful design makes it a joy to have in your home, blending seamlessly with nearly any style of decor. This attention to detail is evident throughout the design, from its sleek, minimalist form to the striking control panel that's wonderfully easy to use.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿18,000</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(38)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(38)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isSubOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsSubOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Citation Sub</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images7[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>SOUND QUALITY WITH SOPHISTICATION</h2>
                                <h3 className='mt-2'>For over 65 years for Harman Kardon has been dedicated to delivering luxurious audio experiences that allow the listener to feel the music and immerse them in the moment. Citation is the ultimate expression and is the worlds first truly premium product of its kind.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿7,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(39)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(39)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isBarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsBarOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Citation Bar</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Harman Kardon</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images8[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>PREMIUM INDUSTRIAL DESIGN</h2>
                                <h3 className='mt-2'>Citation Bar blends innovation in home audio entertainment with a sophisticated and beautiful design. The premium blended wool fabric, made by Kvadrat, is dirt repellent and flame retardant.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿14,800</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(40)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(40)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isPano3Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsPano3Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Panorama 3</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Bowers&Wilkins</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images9[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>Immersive sound from a single speaker</h2>
                                <h3 className='mt-2'>13 individual, painstakingly positioned drivers, including twin subwoofers. This is what allows Panorama 3 to deliver the most immersive, most convincing spatial audio ever heard from a sound bar.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿32,990</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(41)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(41)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isXIOOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsXIOOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">XIO</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>KEF</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images10[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>XIO - Much More Than Just A Soundbar</h2>
                                <h3 className='mt-2'>Discover the XIO Soundbar, designed to elevate your home cinema experience. Whether you are enjoying films, shows, or streaming music, our soundbar will transform your viewing with Dolby Atmos and 5.1.2 spatial audio, creating transcendent cinematic soundscapes that perfectly complement your television.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿79,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(42)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(42)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isArcUltraOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsArcUltraOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Arc Ultra</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Sonos</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images11[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>The soundbar, reinvented</h2>
                                <h3 className='mt-2'>Arc Ultra is the sleekest and most powerful soundbar Sonos has ever created. With an all-new acoustic architecture powered by 14 Sonos-engineered drivers and advanced technologies like Sound Motion™, Arc Ultra fills every inch of the room and precisely places sounds all around you for an entertainment experience that feels out of this world.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿49,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(43)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(43)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isAmbeoMiniOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsAmbeoMiniOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Ambeo Mini</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Sennheiser</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images12[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>Fill your room with pure sound instead of cables.</h2>
                                <h3 className='mt-2'>An unmatched immersive sound experience in its most compact form.</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿22,600</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(44)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>
                                    Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(44)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>
                                    Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isSB300Open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsSB300Open(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">Soundbar 300</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>JBL</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images13[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>เทคโนโลยีปรับแต่งเสียงสนทนา PureVoice</h2>
                                <h3 className='mt-2'>ด้วยเทคโนโลยี PureVoice ลำโพง JBL Bar 300 ใช้อัลกอริทึมพิเศษ ช่วยให้เสียงสนทนาคมชัด แม้ในยามที่เสียงเอฟเฟกต์รอบทิศทางดังกระหึ่ม รับรองว่าคุณจะไม่พลาดแม้แต่คำเดียว</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿16,900</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(45)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(45)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isHW700FOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsHW700FOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">HW-QS700F</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Samsung</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images14[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>ปรับเสียงให้เข้ากับพื้นที่ได้อย่างลงตัว</h2>
                                <h3 className='mt-2'>เพลิดเพลินไปกับเสียงที่จูนให้เข้ากับห้องของคุณโดยเฉพาะ ซาวด์บาร์จะวิเคราะห์และปรับเสียงให้เข้ากับพื้นที่ได้ ซึ่งรวมไปถึงการปรับเสียงเบสให้เหมาะสมด้วย เพื่อสร้างเสียงที่คมชัดและสมจริงในระดับสูงสุด</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿16,490</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(46)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(46)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isHW650FOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsHW650FOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">HW-B650F</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Samsung</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images15[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>ฟังได้อย่างชัดเจนและฟังบทสนทนาได้ชัดทุกถ้อยคำ</h2>
                                <h3 className='mt-2'>ฟังบทสนทนาในรายการและภาพยนตร์เรื่องโปรดของคุณได้อย่างชัดถ้อยชัดคำ โหมด Voice Enhance ช่วยเสริมเสียงพูดและปรับการตั้งค่า EQ ให้เหมาะสมได้ เพื่อประสบการณ์การรับฟังที่ชัดเจน</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿8,990</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(47)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(47)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isHW600FOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[900px] h-[700px] relative">
                        <button onClick={() => setIsHW600FOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-start ml-8 mt-3">HW-Q600F</h2>
                        <h3 className='text-xl font-sans mb-4 text-start ml-8 -mt-3'>Samsung</h3>
                        <ul className='flex flex-row space-x-32'>
                            <li>
                                <div className="w-[400px] h-[400px] flex flex-col items-center justify-center relative">
                                    <img src={images16[currentIndex]} alt="" className="w-full h-[500px] object-contain rounded-lg -mt-9 ml-10"/>
                                    <ul className='flex flex-row space-x-[383px] absolute -left-1 top-1/2 -translate-y-1/2'>
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
                                <h2 className='text-black text-2xl font-semibold'>ปรับเสียงให้เข้ากับพื้นที่ได้อย่างลงตัว</h2>
                                <h3 className='mt-2'>เพลิดเพลินไปกับเสียงอันน่าทึ่งที่ปรับให้เข้ากับห้องของคุณ ซาวด์บาร์จะวิเคราะห์พื้นที่และปรับเสียงให้เข้ากับห้องได้ รวมถึงยังปรับเสียงเบสให้เหมาะสมด้วย เพื่อให้เสียงฟังดูคมชัดและสมจริงได้อย่างสูงสุด</h3>
                            </li>
                        </ul>
                        <h1 className='font-bold text-2xl ml-11 mt-16'>฿12,990</h1>
                        <ul className='flex flex-row space-x-5 absolute bottom-[40px] left-[700px]'>
                            <li>
                                <button onClick={() => addToCart(48)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(48)} className='bg-gray-700 rounded-lg w-16 h-8 hover:bg-slate-500 text-white'>Buy
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Soundbars