import React, { useState , useEffect} from 'react'
import Beolit20 from "/src/assets/beolit-20-001.png";
import Bo2 from "/src/assets/A9_Gold_1_Resized.webp";
import Bo3 from "/src/assets/Beosound_A5_-_PDP_-_Image_5_-_Dark_Oak.webp";
import Bo4 from "/src/assets/02_Summer-Sale-1-scaled-3.webp";
import Bo5 from "/src/assets/Packshot-Beosound-A1-3rd-Gen-Natural-Aluminium-Perspective-0003-s1200x1200px.png";
import Bo6 from "/src/assets/Beosound_A5_Weave-Image_1.png";
import Bo7 from "/src/assets/Packshot-Beosound-Explore-Grey-Mist-0034-Perspective-1200x1200.png";
import Bo8 from "/src/assets/Beosound-2-0010-1000x1000.jpg.webp";
import Bo9 from "/src/assets/Beoplay-EX-Gold-Tone-Hero.png";
import Bo10 from "/src/assets/Packshot-Beoplay-Eleven-Natural-Aluminium-Case-Earphones-Perspective-s1200x1200px.png";
import Bo11 from "/src/assets/Packshot-Beoplay-H95-Gold-Tone-0006-Perspective-1200x1200px.png";
import Bo12 from "/src/assets/Packshot-Beoplay-H100-Infinite-Black-perspective-0006-s1200x1200px.png"

import { IoClose } from 'react-icons/io5';
import Navbar from '/src/components/Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartRendered, setIsCartRendered] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const navigate = useNavigate();
    const goToSpeakers = () =>{
      navigate('/pages/Speakers'); 
    }

    const navigate2 = useNavigate();
    const goToAddress = () =>{
        navigate2('/pages/Address'); 
    }

    const navigate3 = useNavigate();
    const goToHeadphones = () =>{
        navigate3('/pages/Headphones')
    }

    const navigate10 = useNavigate();
    const goToSoundbars = () =>{
        navigate10('/pages/Soundbars')
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

    const [message2 , setMessage2] = useState();
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
                    setMessage('Login Completed')
                    window.location.reload();
                }
                else if (role === "Admin"){
                    setMessage('Login Completed')
                    window.location.reload();
                }
                else{
                    setMessage('No Role');
                }
            }
            else{
                setMessage("Login success but no token received");
            }
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                setMessage(error.response.data);
            } else 
            {
                setMessage('Login failed');
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
            setMessage2(API.data)
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                setMessage2(error.response.data);
            } else 
            {
                setMessage2('Register failed');
            }
        };
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

    return (
        <main>
            <Navbar onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)}/>
                <div className='bg-[#edeef0] text-white h-screen flex items-center justify-center'>
                    <div className='container mx-auto text-left'>
                        <h1 className='text-5xl text-[#212529] font-extrabold'>Welcome to Our Website</h1>
                        <p className='text-lg text-[#6C757D] mt-4'>Discover premium Bang & Olufsen speakers<br/>combining sleek design and exceptional sound.<br/>Perfect for any space, our collection offers top-quality audio to elevate your music experience.</p>
                        <a href="/pages/Speakers" className='bg-[#feddd2] text-white px-6 py-2 rounded-full mt-8 inline-block hover:bg-gray-500 shadow-sm'>Shop Now</a>
                    </div>
                    <img src={Bo8} alt="Bg" className='h-auto w-[420px] -ml-96'/>
                </div>
                <div className="bg-white h-screen">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mt-10">Our Product</h2>
                        <div className='myContainer'>
                            <div className='containerBox'>
                                <img src={Beolit20} alt="Beolit 20" className='imageInBox'/>
                                <h3 className='headText'>Beolit 20</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿21990</p>
                            </div>
                            <div className='containerBox'>
                                <img src={Bo6} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beosound A5</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿64700</p>
                            </div>
                            <div className='containerBox'>
                                <img src={Bo7} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beosound Explore</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿7900</p>
                            </div>
                            <div className='containerBox'>
                                <img src={Bo5} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beosound A1</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿14800</p>
                            </div>
                        </div>
                        <div className='myContainer'>
                             <div className='containerBox'>
                                <img src={Bo12} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay H100</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿14800</p>
                            </div>
                              <div className='containerBox'>
                                <img src={Bo11} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay H95</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿14800</p>
                            </div>
                              <div className='containerBox'>
                                <img src={Bo10} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay ELEVEN</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿23990</p>
                            </div>
                              <div className='containerBox'>
                                <img src={Bo9} alt="Be 20" className='imageInBox'/>
                                <h3 className='headText'>Beoplay EX</h3>
                                <p className="desText">Bang&Olufsen</p>
                                <p className="priceText">฿18800</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white h-screen'>
                    <hr className="border-black border-t-2 w-full"/>
                </div>
                <div className='bg-gray-400 h-52'>
                    <ul className='flex space-y-1 flex-col absolute mt-4 ml-4 font-semibold text-xs text-white'>
                        <li>
                            halo
                        </li>
                        <li>
                            haloooooqwdwqd
                        </li>
                        <li>
                            wsawasdwww wii werweeiiwe. owef wdwe.    efwefwe
                        </li>
                        <li>
                            dqwdqwdqw
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
                            <hr className="border-black border-t-2 absolute bottom-28 left-7 right-7"/>
                            <button onClick={goToAddress} className='w-20 h-10 absolute bottom-5 right-4 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-800 transition'>CheckOut
                            </button>
                        </div>
                    </div>
                )}
                {isMenuRendered && (
                    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start items-stretch z-50 transition-opacity duration-300 ease-in-out ${isMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className={`bg-white shadow-lg p-6 w-72 relative transform transition-transform duration-300 ease-in-out ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                            <button onClick={() => setIsMenuOpen(false)} className='absolute top-6 left-9 text-gray-600 hover:text-black'>
                                <IoClose size={24}/>
                            </button>
                            <ul className='flex space-y-3 flex-col mt-16 ml-2 font-semibold text-xl'>
                                <li>
                                    <button>Homes</button>
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
        </main>
    )
}

export default Home