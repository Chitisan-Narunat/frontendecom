import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { getImageById } from "/Styles/product-images"; 
import { jwtDecode } from 'jwt-decode';
import { api } from '../../services/api';
import ProductGrid from '../components/ProductCard';
import Endbar from '../components/Endbar';


function Speakers() {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartRendered, setIsCartRendered] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isFavOpen, setIsFavOpen] = useState(false);
    const [isFavRendered, setIsFavRendered] = useState(false);
    const [isFavVisible, setIsFavVisible] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [openProduct, setOpenProduct] = useState(null);
    const [images, setImages] = useState([]);     
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setLoadingImgs] = useState(false);

    const API = "http://localhost:5283/api";
    const [products, setProducts] = useState([]);

    


    const navigate = useNavigate();
    const goToHome = () =>{
        navigate('/pages/Home'); 
    }
    const goToSpeakers = () =>{
        navigate('/pages/Speakers'); 
    }
    const goToHeadphones = () =>{
        navigate('/pages/Headphones')
    }
    const goToSoundbars = () =>{
        navigate('/pages/Soundbars')
    }
    const goToAddress = () =>{
        navigate('/pages/Address')
    }


//////////////////////////////Form////////////////////////////////

    const [form , setForm] = useState({
        email: '',
        passWord: '',
    });

    const [form2 , setForm2] = useState({
        email: '',
        userName: '',
        passWord: '',
    });

//////////////////////////////Form////////////////////////////////


//////////////////////////////Message////////////////////////////////

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

//////////////////////////////Message////////////////////////////////


//////////////////////////////Login////////////////////////////////

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

//////////////////////////////Login////////////////////////////////


//////////////////////////////Register////////////////////////////////

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

 //////////////////////////////Register////////////////////////////////


 //////////////////////////////UseEffect////////////////////////////////

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

    useEffect(() => { if (isCartVisible) refreshCart(); }, [isCartVisible]);

 //////////////////////////////UseEffect////////////////////////////////


//////////////////////////////Cart////////////////////////////////

    const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
    const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });

    async function refreshCart() { //re cart
        const { data } = await axios.get(`http://localhost:5283/api/OrderItem/Current`, { headers: auth() });
        setCart({
            orderId: data?.orderId ?? 0,
            items: data?.items ?? [],
            actualPrice: data?.actualPrice ?? 0
        });
    }

/////////////DelProduct/////////////////
    async function removeItem(rowId) { 
    await axios.delete(`http://localhost:5283/api/OrderItem/DropItem`,  
        { 
            params: { OrderItemsId: rowId }, headers: auth() 
        });
         refreshCart();
    }   

/////////////+Quantity/////////////////
    async function incQty(rowId, qty) {
    await axios.put(`http://localhost:5283/api/OrderItem/EditQuantity`,
        { quantity: qty + 1 },
        { 
            params: { OrderItemsId: rowId },
            headers: { "Content-Type": "application/json", ...auth() } 
        });
        refreshCart();
    }

/////////////-Quantity/////////////////
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

//////////////////////////////Cart////////////////////////////////

    const closeAllModals = () => {
        setIsBeoLit20Open(false);
        setIsBeoA5Open(false);
        setIsBeoExOpen(false);
        setIsBeoA1Open(false);
        setIsOnyx8Open(false);
        setIsGoPlayOpen(false);
        setIsAura3Open(false);
        setIsOnyx9Open(false);
        setIsFlip7ExOpen(false);
        setIsPulse5Open(false);
        setIsXtremeOpen(false);
        setIsBoomOpen(false);
        setIsEmberOpen(false);
        setIsMiddleOpen(false);
        setIsKilburnOpen(false);
        setIsWillenOpen(false);
    };
//////////////////////////////Add Modal////////////////////////////////

    const addToCart = async (ProductId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("กรุณาเข้าสู่ระบบก่อน");

                closeAllModals();
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
                navigate("/pages/Address"); 
                return;
            }

            const oid = Number(API.data?.orderId ?? API.data?.OrderId); 
            if (Number.isFinite(oid) && oid > 0) {
                localStorage.setItem("currentOrderId", String(oid));
            }
    
            closeAllModals();
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

            closeAllModals();
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





        const [favList, setFavList] = useState([]);
        const [loadingFavs, setLoadingFavs] = useState(false);
            
            
        // เปิด/ปิด drawer แบบมีแอนิเมชัน (เหมือน cart)
        useEffect(() => {
            if (isFavOpen) {
                setIsFavRendered(true);
                setTimeout(() => setIsFavVisible(true), 10);
            } else {
                setIsFavVisible(false);
                setTimeout(() => setIsFavRendered(false), 300);
            }
        }, [isFavOpen]);
            
        // โหลด fav จากเซิร์ฟเวอร์ (ดึง GetProduct แล้วกรอง isFavourite)
        async function refreshFavs() {
            try {
                setLoadingFavs(true);
                const { data } = await api.get("/Product/GetProduct", { params: { _t: Date.now() } });
                const favOnly = (data || []).filter(p => !!(p.isFavourite ?? p.IsFavourite));
                setFavList(favOnly);
            } catch (e) {
                console.error("load favs failed", e?.response?.status, e?.response?.data || e.message);
                setFavList([]);
            } finally {
                setLoadingFavs(false);
            }
        }
        
        const token = localStorage.getItem("token");


        // เปิดแผงเมื่อมองเห็น → ดึงรายการล่าสุดทุกครั้ง
        useEffect(() => { if (isFavVisible) refreshFavs(); }, [isFavVisible]);
            
        useEffect(() => {
            if (!token) {
                setFavList([]); 
                return;
            }
              refreshFavs();     
        }, [token]);
    
        const cartCount = Array.isArray(cart?.items) ? cart.items.length : 0;
    
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) refreshCart();        // โหลดครั้งแรกเมื่อมี token
        }, []);
    
        useEffect(() => {
            // ถ้า token เปลี่ยน (login/logout) ก็รีเฟรช
            const token = localStorage.getItem("token");
            if (token) refreshCart();
            else setCart({ orderId: 0, items: [], actualPrice: 0 });
        }, [isLoginOpen]); // หรือจะผูกกับสถานะอื่นที่เปลี่ยนตอน login สำเร็จ

        const cat1 = Array.isArray(products) ? products : [];

         useEffect(() => {
                fetch(`${API}/Product/GetProduct`)
                .then((r) => {
                    if (!r.ok) throw new Error("HTTP " + r.status);
                    return r.json();
                })
                .then(setProducts)
                .catch((err) => console.error(err));
            }, []);

    useEffect(() => {
            if (!openProduct) return;
            let alive = true;
            setLoadingImgs(true);
            fetch(`${API}/products/${openProduct.productId}/images-blob`)
            .then(r => r.json())
            .then(list => {
                if (!alive) return;
                const urls = list
                .sort((a,b) => (b.isPrimary - a.isPrimary) || (a.sortOrder - b.sortOrder))
                .map(x => `${API}/products/${openProduct.productId}/images-blob/${x.id}?v=${x.createdAt}`);
                setImages(urls);
                setCurrentIndex(0);
            })
            .catch(console.error)
            .finally(() => setLoadingImgs(false));
            return () => { alive = false; };
        }, [openProduct]);
        





    return (
        <main>
            <Navbar onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} onFavClick={() => setIsFavOpen(true)} favCount={favList.length} cartCount={cartCount}/>
            <div className='bg-[#edeef0] h-fit flex items-start justify-center'>
                <ProductGrid title="All Product" items={cat1} token={token} hasRemove={true} onSelect={(p) => setOpenProduct(p)}
                    onFavChange={(pid, next, meta) => {
                        if (meta?.requireLogin) { setIsLoginOpen(true); return; }
                        // 1) อัปเดตสถานะหัวใจในชุดรายการหลัก
                        setProducts(prev =>
                            prev.map(x =>
                                (x.productId ?? x.ProductId) === pid
                                ? { ...x, isFavourite: next }
                                : x
                            )
                        );
                                    // 2) อัปเดตลิสต์ในแผง Favourite ทันที
                                    setFavList(prev => {
                                        const exists = prev.some(x => (x.productId ?? x.ProductId) === pid);
                                        if (next) {
                                            if (!exists) {
                                                // หา item ตัวเต็มจาก cat1 ก่อน ไม่มีก็หาจาก products
                                                const full = (cat1 || []).find(x => (x.productId ?? x.ProductId) === pid) || (products || []).find(x => (x.productId ?? x.ProductId) === pid);
                                                return full ? [full, ...prev] : prev;
                                            }
                                            return prev;
                                        } else {
                                            return prev.filter(x => (x.productId ?? x.ProductId) !== pid);
                                        }
                                    });
                                }}/>
                
            </div>
            <div className='bg-[#edeef0] h-20'>
            </div>
            <Endbar></Endbar>
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
                            <IoClose size={24}/>
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
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out${isCartVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`bg-white rounded-lg shadow-lg p-6 w-96 relative transform transition-transform duration-300 ease-in-out${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}>
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
                                <button onClick={goToSoundbars}>Soundbars
                                </button>
                            </li>
                        </ul>  
                    </div>
                </div>
            )}
            {isFavRendered && (
                <div onMouseDown={(e) => { if (e.target === e.currentTarget) setIsFavOpen(false); }} className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-50 transition-opacity duration-300 ease-in-out ${isFavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div onMouseDown={(e) => e.stopPropagation()} className={`bg-white rounded-lg shadow-lg p-6 w-96 relative transform transition-transform duration-300 ease-in-out ${isFavVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                        <button onClick={() => setIsFavOpen(false)} className='absolute top-3 right-3 text-gray-600 hover:text-black'>
                            <IoClose size={24}/>
                        </button>
                        <h2 className='text-2xl font-bold mb-4 text-center'>Favourite</h2>
                        <hr className="border-black border-t-2 w-full"/>
                        <ul className='mt-[14px] space-y-5'>
                            {loadingFavs ? (
                                <li className="text-center text-gray-500 py-10">
                                    กำลังโหลด...
                                </li>
                                ) : favList.length === 0 ? (
                                    <li className="text-center text-gray-500 py-10">ยังไม่มีสินค้าที่ชอบ</li>
                                ) : (
                                    favList.map(item => {
                                        const pid = item.productId ?? item.ProductId;
                                        const name = item.productName ?? item.ProductName ?? "";
                                        const desc = item.productDescription ?? item.ProductDescription ?? "";
                                        const img  = (item.primaryImageUrl ?? item.PrimaryImageUrl) || "/placeholder.png";
                                        return (
                                            <li key={pid}>
                                                <div className='w-full h-28 rounded-lg bg-gray-100 flex space-x-3'>
                                                    <div className='w-24 h-20 flex justify-center items-start'>
                                                        <img className='w-24 h-20 ml-4 object-contain' src={img} alt={name} />
                                                    </div>
                                                    <ul className='flex flex-col flex-1 pr-10'>
                                                        <li className='flex flex-row'>
                                                            <h3 className='mt-3 font-bold truncate'>{name}</h3>
                                                            <button
                                                                className='absolute right-9 mt-2'
                                                                onClick={async () => {
                                                                    try {
                                                                        await api.delete('/Favourite/RemoveFavourite', { params: { ProductId: pid } });
                                                                    } finally {
                                                                        // เอาออกจากแผง
                                                                        setFavList(prev => prev.filter(x => (x.productId ?? x.ProductId) !== pid));
                                                                        // sync กับ products หลัก
                                                                        setProducts(prev => prev.map(p => (p.productId ?? p.ProductId) === pid ? { ...p, isFavourite: false } : p));
                                                                    }
                                                                }}>
                                                                    <IoClose size={17}/>
                                                            </button>
                                                        </li>
                                                        <li>
                                                                <h3 className='text-xs font-sans line-clamp-2'>{desc}</h3>
                                                        </li>
                                                        <li>
                                                                        <div className='bg-gray-200 rounded-sm w-full h-4'/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        );
                                    })
                                )
                            }
                        </ul>
                    </div>
                </div>
            )}
            {openProduct && (
                <div onMouseDown={(e) => { if (e.target === e.currentTarget) setOpenProduct(null);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="modalProduct">
                        <button onClick={() => setOpenProduct(null)} className="closebutton">
                            <IoClose size={24} />
                        </button>
                        <h2 className="h2product">{openProduct.productName}</h2>
                        <h3 className="h3product">{openProduct.productDescription}</h3>
                        <ul className="flex flex-row space-x-32">
                            <li>
                                <div className="divproduct"> {
                                    images.length > 0 && ( 
                                        <img src={images[currentIndex]} alt={openProduct.productName} className="productpic"/>
                                    )}
                                    {images.length > 1 && (
                                        <ul className="ulsbpicbutton">
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => prev > 0 ? prev - 1 : images.length - 1)} className="picbutton">
                                                    ‹
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentIndex((prev) => prev < images.length - 1 ? prev + 1 : 0)} className="picbutton">
                                                    ›
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </li>
                            <li className="mt-11">
                                <h2 className="text-black text-2xl font-semibold">{openProduct.productHeadText}</h2>
                                <h3 className="mt-2">{openProduct.productBrand}</h3>
                            </li>
                        </ul>
                        <h1 className="h1price">฿{Number(openProduct.productPrice).toLocaleString()}</h1>
                        <ul className="ulabbutton">
                            <li>
                                <button onClick={() => addToCart(openProduct.productId)} className="abbutton">
                                    Add
                                </button>
                            </li>
                            <li>
                                <button onClick={() => addToBuy(openProduct.productId)} className="abbutton">
                                    Buy
                                </button>
                            </li>
                        </ul>
                        <p className="mt-auto font-light text-white text-center">{message}</p>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Speakers