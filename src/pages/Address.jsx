import Navbar from '../components/Navbar'
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

function Address({onAddressClick}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isAddressOpen , setIsAddressOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState();
    

    onAddressClick = (() => setIsAddressOpen(true));

    const navigate = useNavigate();
    const goToHome = () =>{
      navigate('/'); 
    }

    const navigate2 = useNavigate();
    const goToSpeakers = () =>{
        navigate2('/pages/Speakers'); 
    }

    const [form , setForm] = useState({
        AddressName: '',
        Province: '',
        District: '',
        PostalCode: '',
        PhoneNumber: ''
    });

    const [message , setMessage] = useState();
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };

    const handleAddress = async(e) =>{
        e.preventDefault();
        try{

            const token = localStorage.getItem("token");
            const API = await axios.post('http://localhost:5283/api/Address/FillAddress',{
                
                AddressName: form.AddressName,
                Province: form.Province,
                District: form.District,
                PostalCode: form.PostalCode,
                PhoneNumber: form.PhoneNumber
            },
            {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            }
            );
            setMessage(API.data)
            console.log("API Response:", API.data);
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                setMessage(error.response.data);
            } else 
            {
                setMessage('failed');
            }
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

    return (
        <main>
            <Navbar onMenuClick={() => setIsMenuOpen(true)}/>
            <div className='bg-[#edeef0] h-[840px] flex items-start justify-center'>
                <div className='container mx-auto ml-10'>
                    <h1 className='text-2xl text-[#212529] text-left font-extrabold mt-24'>ที่อยู่</h1>
                    <ul className='flex flex-row space-x-28'>
                        <li>
                            <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 mt-7 w-[800px] h-[200px] text-center flex items-center justify-center'>
                                <h2 className='text-left text-black text-base absolute left-14 top-44'>ที่อยู่จัดส่งสินค้า</h2>
                                <ul className='flex space-y-3 flex-col'>
                                    <li>
                                        <h2 className='text-gray-400 text-lg hover:bg-gray-300 w-auto h-auto mt-7'> ไม่มีที่อยู่จัดส่งสินค้า</h2>
                                    </li>
                                    <li>
                                        <button onClick={onAddressClick} className='text-black text-sm hover:bg-gray-300 w-auto h-auto rounded-lg'>เพิ่มที่อยู่</button>
                                    </li>
                                </ul>
                            </div>
                            <h1 className='text-xl text-[#212529] text-left font-extrabold mt-7'>รูปแบบการจัดส่ง</h1>
                            <ul className='flex flex-row space-x-4'>
                                <li>
                                    <div onClick={() => setActiveIndex(0)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-pink-200 transition p-6 mt-7 w-[256px] h-[150px] text-center flex items-center justify-center ${activeIndex === 0 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                        <h2 className='text-left text-black text-base absolute left-[60px] top-[460px]'>ส่งด้วย.....</h2>
                                        <h2 className='text-left text-black text-base absolute left-64 top-[460px]'>0฿</h2>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setActiveIndex(1)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-pink-200 transition p-6 mt-7 w-[256px] h-[150px] text-center flex items-center justify-center ${activeIndex === 1 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                        <h2 className='text-left text-black text-base absolute left-[333px] top-[460px]'>ส่งด้วย.....</h2>
                                        <h2 className='text-left text-black text-base absolute left-64 top-[460px]'>0฿</h2>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setActiveIndex(2)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-pink-200 transition p-6 mt-7 w-[256px] h-[150px] text-center flex items-center justify-center ${activeIndex === 2 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                        <h2 className='text-left text-black text-base absolute left-[606px] top-[460px]'>ส่งด้วย.....</h2>
                                        <h2 className='text-left text-black text-base absolute left-64 top-[460px]'>0฿</h2>
                                    </div>
                                </li>
                            </ul>
                            <h1 className='text-xl text-[#212529] text-left font-extrabold mt-7'>ช่องทางการจ่ายเงิน</h1>
                            <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-blue-500 transition p-6 mt-7 w-[390px] h-[130px] text-center flex items-center justify-center flex-row'>
                            </div>
                        </li>
                        <li>
                            <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 mt-7 w-[470px] h-[600px] text-center flex items-center justify-center'>
                                <hr className="border-black border-t-2 w-full mt-[450px] bottom-56"/>
                                <button className='w-24 bg-gray-500 rounded-lg hover:bg-gray-400 absolute left-[1290px] bottom-[110px] text-white'>ชำระเงิน</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='bg-gray-400 h-[200px]'>

            </div>
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
                                <button>Soundbars
                                </button>
                            </li>
                        </ul>  
                    </div>
                </div>
            )}
            {isAddressOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[800px] h-[480px] relative">
                        <button onClick={() => setIsAddressOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">Add Address</h2>
                        <form className='space-y-4 flex items-center justify-center flex-col'>
                            <input type="text" placeholder="AddressName" name='AddressName' className="w-[500px] border p-2 rounded" value={form.AddressName} onChange={handleChange}/>
                            <input type="text" placeholder='Province' name='Province' className='w-[500px] border p-2 rounded' value={form.Province} onChange={handleChange}/>
                            <input type="text" placeholder="District" name='District' className="w-[500px] border p-2 rounded" value={form.District} onChange={handleChange}/>
                            <input type="text" pattern="[0-9]{5}" maxLength='5' placeholder="PostalCode" name='PostalCode' className="w-[500px] border p-2 rounded" value={form.PostalCode} onChange={handleChange}/>
                            <input type="text" pattern="[0-9]{10}" maxLength='10' placeholder="PhoneNumber" name='PhoneNumber' className="w-[500px] border p-2 rounded" value={form.PhoneNumber} onChange={handleChange}/>
                            <button className="w-[180px] bg-gray-600 text-white py-2 rounded hover:bg-blue-600 ml-80 mt-96" onClick={handleAddress}>Add
                            </button>
                            <p className='mt-auto font-light text-red-600 text-center'>{message}</p>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Address