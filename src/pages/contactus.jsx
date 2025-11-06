import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar'
import { iconImages } from '../assets'
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../services/api';




function Contactus() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    

    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuRendered(true);
            setTimeout(() => setIsMenuVisible(true), 10);
        } else {
            setIsMenuVisible(false);
            setTimeout(() => setIsMenuRendered(false), 300); 
        }
    }, [isMenuOpen]);

    const navigate = useNavigate();
    const goToFAQ = () =>{
        navigate('/pages/FAQ'); 
    }
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

    const [form , setForm] = useState({
        email: '',
        passWord: '',
    });

    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            const API = await api.get('/Authen/Login',{
                params: {
                    Email: form.email,
                    PassWord: form.passWord
                }
            });
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

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };


    const [form2 , setForm2] = useState({
        email: '',
        userName: '',
        passWord: '',
    });

    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            const API = await api.post('/Authen/Register',{
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

    const handleChange2 = (e) =>{
        setForm2({
            ...form2,
            [e.target.name]:e.target.value,
        });
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!name || !email || !text) {
            alert("กรุณากรอกข้อมูลให้ครบ");
            return;
        }
        setLoading(true);
        try {
            const res = await api.post("/Contact/Send", {
                name,
                email,
                message: text
            });
            alert(res.data);
            setName("");
            setEmail("");
            setText("");
        } catch (err) {
            alert("ส่งไม่สำเร็จ: " + (err?.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Navbar onMenuClick={() => setIsMenuOpen(true)} onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)}/>
            <div className='bg-white h-screen flex items-start justify-center'>
                <div className='container text-center'>
                    <h1 className='text-4xl text-black mt-24 font-playfair font-bold'>Contact Us</h1>
                    <ul className='flex flex-row space-x-3 justify-center'>
                        <li>
                            <div className='rounded-lg border-2 h-[150px] w-[300px] mt-6 flex items-center justify-center flex-row space-x-1 hover hover:bg-gray-200'>
                                <img src={iconImages.phone} alt="" className='w-[60px] h-[60px]'/>
                                <h1 className='font-sans font-bold text-xl'>
                                    +66 934266629
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className='rounded-lg border-2 h-[150px] w-[300px] mt-6 flex items-center justify-center flex-row space-x-2 hover hover:bg-gray-200'>
                                <img src={iconImages.line} alt="" className='w-[60px] h-[60px]'/>
                                <h1 className='font-sans font-bold text-xl'>
                                    @Dontknow
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className='rounded-lg border-2 h-[150px] w-[300px] mt-6 flex items-center justify-center text-start flex-row space-x-3 hover hover:bg-gray-200'>
                                <img src={iconImages.mail} alt="" className='w-[60px] h-[60px]' />
                                <h1 className='font-sans font-bold text-xl'>
                                    support<br />example.com
                                </h1>
                            </div>
                        </li>
                        <li>
                            <div className='rounded-lg border-2 h-[470px] w-[400px] mt-6 flex items-start justify-start text-start flex-col space-y-1 hover:bg-gray-200 transition'>
                                <h1 className='font-sans font-bold text-2xl mt-7 ml-7'>ส่งข้อความ</h1>
                                <h2 className='font-sans font-light text-lg ml-7'>send a message</h2>
                                <ul className='flex flex-col space-y-3 relative'>
                                    <li>
                                        <input type="text" placeholder='Name' className='px-3 py-1 border-2 rounded-lg w-[340px] h-10 ml-7' value={name} onChange={(e) => setName(e.target.value)}/>
                                    </li>
                                    <li>
                                        <input type="email" placeholder='Email' className='px-3 py-1 border-2 rounded-lg w-[340px] h-10 ml-7' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </li>
                                    <li>
                                        <textarea placeholder='Text' className='px-3 py-1 border-2 rounded-lg w-[340px] h-36 ml-7 resize-none' value={text} onChange={(e) => setText(e.target.value)}/>
                                    </li>
                                    <li>
                                        <button onClick={handleSend} disabled={loading} className='border-2 rounded-lg ml-7 font-sans font-bold text-xl w-[340px] h-16 bg-black text-white border-black mt-2 disabled:opacity-60 hover:bg-gray-800 transition'>
                                            {loading ? "กำลังส่ง..." : "Send Message"}
                                         </button>
                                    </li>
                                </ul>
                            </div>  
                        </li>
                    </ul>
                    <ul className='flex flex-row space-x-3 justify-center ml-[178px] -mt-[320px]'>
                        <ul className='flex flex-col -ml-[177.7px]'>
                            <li>
                                <div className='rounded-lg border-2 h-[150px] w-[430px] mt-6 flex flex-row items-center justify-center space-x-2 hover hover:bg-gray-200'>
                                    <img src={iconImages.clock} alt="" className='w-[70px] h-[70px]' />
                                    <ul className='flex flex-col items-start justify-start text-start'>
                                        <li>
                                            <h1 className='font-sans font-bold text-xl'>
                                                เวลาทำการ
                                            </h1>
                                            <h2 className='font-sans font-bold text-xl'>
                                                Mon-Sun, 10:00 - 19:00
                                            </h2>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className='rounded-lg border-2 h-[300px] w-[430px] mt-6 bg-black border-black'>
                                    <h1 className='text-white font-sans font-bold text-2xl mt-6'>
                                        นัดทดลองฟัง
                                    </h1>
                                    <h2 className='text-white font-sans font-bold text-xl mt-1'>
                                        Booking Demo
                                    </h2>
                                    <h3 className='text-white font-sans font-bold text-lg mt-3'>
                                        อยากให้พวกเราแนะนำ<br />ลำโพงที่ใช่สำหรับคุณหรือไม่?
                                    </h3>
                                    <h4 className='text-white font-sans font-bold text-lg mt-1'>
                                        Would you like us to recommend<br /> the right audio system for you?
                                    </h4>
                                    <button className='text-white rounded-lg bg-black mt-9 text-xl hover hover:bg-gray-600 w-[150px] h-[40px]'>Book a Demo</button>
                                </div>
                            </li>
                        </ul>
                        <ul className='flex flex-col'>
                            <li>
                                <div className="rounded-lg border-2 h-[250px] w-[482px] mt-6 overflow-hidden">
                                    <iframe
                                    title="Infinite Technology Corporation"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps?q=13.868636,100.567703&hl=th&z=17&output=embed"
                                    />
                                </div>
                            </li>
                            <li>
                                <div onClick={goToFAQ} className='rounded-lg border-2 h-[150px] w-[482px] mt-6 grid place-items-center hover hover:bg-gray-200'>
                                    <div>
                                        <h1 className='font-sans font-bold text-xl'>
                                            คำถามที่พบบ่อย
                                        </h1>
                                        <h2 className='font-sans font-bold text-xl'>
                                            ส่งเคลมยังไง?
                                        </h2>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul className='flex flex-col'>
                            <li className='mt-[320px]'>
                                <div onClick={goToFAQ} className='rounded-lg border-2 h-[90px] w-[400px] mt-6 flex items-center justify-center hover hover:bg-gray-200'>
                                    <h1 className='font-sans font-bold text-xl'>
                                        FAQs
                                    </h1>
                                </div>
                            </li>
                        </ul>
                    </ul>      
                </div>
            </div>
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
            {isLoginOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsLoginOpen(false);}} className="modalproductbg">
                    <div onMouseDown={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
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
                        </form>
                    </div>
                </div>
            )}
            {isRegisterOpen && (
                <div onMouseDown={(e) => {if (e.target === e.currentTarget) setIsRegisterOpen(false);}} className='modalproductbg'>
                    <div onMouseDown={(e) => e.stopPropagation()} className='bg-white rounded-lg shadow-lg p-6 w-96 relative'>
                        <button onClick={() => setIsRegisterOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24}/>
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                        <form className="space-y-4">
                            <input type="email" placeholder="Email" name='email' className="w-full border p-2 rounded" value={form2.email} onChange={handleChange2}/>
                            <input type="text" placeholder='Username' name='userName' className='w-full border p-2 rounded' value={form2.userName} onChange={handleChange2}/>
                            <input type="password" placeholder="Password" name='passWord' className="w-full border p-2 rounded" value={form2.passWord} onChange={handleChange2}/>
                            <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-600" onClick={handleRegister}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Contactus