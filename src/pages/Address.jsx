import Navbar from '../components/Navbar'
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { getImageById } from "/Styles/product-images"; 
import axios from 'axios';


function Address() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isAddressOpen , setIsAddressOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState();
    const [activeIndex2, setActiveIndex2] = useState();

    

    const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });


    
    const navigate = useNavigate();
    const goToHome = () =>{
      navigate('/pages/Home'); 
    }

    const navigate2 = useNavigate();
    const goToSpeakers = () =>{
        navigate2('/pages/Speakers'); 
    }

    const navigate3 = useNavigate();
    const goToHeadphones = () =>{
        navigate3('/pages/Headphones')
    }

    const navigate11 = useNavigate();
    const goToSoundbars = () =>{
          navigate11('/pages/Soundbars')
    }
    

    const [address, setAddress] = useState({ addressId: 0, items: []});
    const [selectedAddressId, setSelectedAddressId] = useState(null);


    useEffect(() => {
        const saved = localStorage.getItem("selectedAddressId");
        if (saved) setSelectedAddressId(Number(saved));
    }, []);

    useEffect(() => {
        if (selectedAddressId) localStorage.setItem("selectedAddressId", String(selectedAddressId));
    }, [selectedAddressId]);


    /////////////////////////////// api แสดงที่อยู่. /////////////////////////////////

    async function refreshAddress() {
        try{
            const { data } = await axios.get(`http://localhost:5283/api/Address/UiAddress2`, { headers: auth() });
            const items = Array.isArray(data?.items) ? data.items : [];
            const apiDefaultId = Number(data?.addressId) || 0;
            const fallbackId   = items[0]?.addressId ?? 0;

            setAddress({ addressId: apiDefaultId || fallbackId, items });

            setSelectedAddressId(prev => {
                if (prev && items.some(a => a.addressId === prev)) return prev; 
                return apiDefaultId || fallbackId;                               
            });
        } catch (err) {
            console.log("[UiAddress2][ERR]", err?.response || err);
            setAddress({ addressId: 0, items: [] });
            setSelectedAddressId(0);
        }
    }
    useEffect(() => { refreshAddress(); }, []);


    const [form , setForm] = useState({
        FirstName: '',
        LastName: '',
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


    /////////////////////////////// api เพิ่มที่อยู่. /////////////////////////////////

    const handleAddress = async(e) =>{
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const API = await axios.post(`http://localhost:5283/api/Address/FillAddress`,{    

                FirstName: form.FirstName,
                LastName: form.LastName,
                AddressName: form.AddressName,
                Province: form.Province,
                District: form.District,
                PostalCode: form.PostalCode,
                PhoneNumber: form.PhoneNumber
            },
            {
                headers: { Authorization:`Bearer ${token}` }
            });
            refreshAddress();
            setIsAddressOpen(false);
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


    /////////////////////////////// api จ่ายเงิน. /////////////////////////////////

    const Purchase = async () => {
        try {
            const token = localStorage.getItem("token");
            const orderId = Number(localStorage.getItem("currentOrderId"));

            console.log("[PURCHASE] token?", !!token, "orderId=", orderId);

            const API = await axios.put("http://localhost:5283/api/OrderItem/EditStatus",
                null,
            {   
                params: { OrderId: orderId, AddressId: selectedAddressId },
                headers: { Authorization: `Bearer ${token}` }
            });
    
            setMessage(API.data)
            console.log("[PURCHASE][OK]", API.status, API.data)
            alert("ชำระเงินสำเร็จ");
            navigate("/pages/Home")
            
        } catch(error){
            const status = error?.response?.status;
            const raw = error?.response?.data;
            const msg = typeof raw === "string" ? raw : raw?.message || raw?.title || raw?.detail || error?.message;
            alert("ไม่มีของไอ้ควาย ใส่ตะกร้าก่อนไอเวร");

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [cart, setCart] = useState({ orderId: 0, items: [], actualPrice: 0 });
    useEffect(() => { refreshCart()},[])


/////////////////////////////// refresh cartitem. /////////////////////////////////

    async function refreshCart() {
        const { data } = await axios.get(`http://localhost:5283/api/OrderItem/Current`, { headers: auth() });
        setCart({
            orderId: data?.orderId ?? 0,
            items: data?.items ?? [],
            actualPrice: data?.actualPrice ?? 0
        });
    }

/////////////////////////////// ลบ cartitem. /////////////////////////////////

    async function removeItem(rowId) {
    await axios.delete(`http://localhost:5283/api/OrderItem/DropItem`,  
        { 
            params: { OrderItemsId: rowId }, headers: auth() 
        });
         refreshCart();
    }   

/////////////////////////////// เพิ่ม Quantity. /////////////////////////////////

    async function incQty(rowId, qty) {
    await axios.put(`http://localhost:5283/api/OrderItem/EditQuantity`,
        { quantity: qty + 1 },
        { 
            params: { OrderItemsId: rowId },
            headers: { "Content-Type": "application/json", ...auth() } 
        });
        refreshCart();
    }

/////////////////////////////// ลด Quantity. /////////////////////////////////

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

    return (
        <main>
            <Navbar onMenuClick={() => setIsMenuOpen(true)}/>
            <div className='bg-[#edeef0] h-[840px] flex items-start justify-center'>
                <div className='container mx-auto ml-10'>
                    <h1 className='text-2xl text-[#212529] text-left font-extrabold mt-24'>ที่อยู่</h1>
                    <ul className='flex flex-row space-x-28'>
                        <li>
                            <div className="relative border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 mt-7 w-[800px] h-[200px]">
                                <ul className='flex flex-row space-x-10 items-center'>
                                    <li>
                                        <h2 className="text-left text-black text-base">ที่อยู่จัดส่งสินค้า</h2>
                                    </li>
                                    <li>
                                        <button onClick={() => setIsAddressOpen(true)} className="text-sm h-[30px] w-[80px] rounded-lg bg-gray-200 hover:bg-gray-300">
                                            เพิ่มที่อยู่
                                        </button>
                                    </li>
                                </ul>
                                <div className="mt-3 absolute left-6 right-6 bottom-6 top-16 overflow-y-auto">
                                    {address.items.length === 0 ? (
                                        <button >

                                        </button>
                                    ) : (
                                        <ul className="flex flex-wrap gap-3">
                                            {address.items.map((it) => (
                                                <li key={it.addressId} className={`p-3 rounded-lg border ${ selectedAddressId === it.addressId
                                                        ? 'border-rose-400 bg-rose-50'
                                                        : 'border-gray-200 bg-white'
                                                    } max-w-full`}>
                                                    <label className="flex items-start gap-3 cursor-pointer">
                                                        <input type="radio" name="selectedAddress" className="mt-1" checked={selectedAddressId === it.addressId} onChange={() => setSelectedAddressId(it.addressId)}/>
                                                        <div className="min-w-0">
                                                            <div className="font-medium break-words">
                                                                {it.firstname} {it.lastname} {it.phoneNumber}
                                                            </div>
                                                            <div className="text-sm text-gray-600 break-words">
                                                                {it.name} {it.district} {it.province} {it.postalCode}
                                                            </div>
                                                        </div>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <h1 className='text-xl text-[#212529] text-left font-extrabold mt-7'>รูปแบบการจัดส่ง</h1>
                            <ul className='flex flex-row space-x-4'>
                                <li>
                                    <div onClick={() => setActiveIndex(0)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-gray-500 transition p-6 mt-7 w-[256px] h-[150px] text-center flex items-center justify-center ${activeIndex === 0 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                        <h2 className='text-left text-black text-base absolute left-[60px] top-[460px]'>ส่งด้วย.....</h2>
                                        <h2 className='text-left text-black text-base absolute left-64 top-[460px]'>0฿</h2>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setActiveIndex(1)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-gray-500 transition p-6 mt-7 w-[256px] h-[150px] text-center flex items-center justify-center ${activeIndex === 1 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                        <h2 className='text-left text-black text-base absolute left-[333px] top-[460px]'>ส่งด้วย.....</h2>
                                        <h2 className='text-left text-black text-base absolute left-64 top-[460px]'>0฿</h2>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setActiveIndex(2)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-gray-500 transition p-6 mt-7 w-[256px] h-[150px] text-center flex items-center justify-center ${activeIndex === 2 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                        <h2 className='text-left text-black text-base absolute left-[606px] top-[460px]'>ส่งด้วย.....</h2>
                                        <h2 className='text-left text-black text-base absolute left-64 top-[460px]'>0฿</h2>
                                    </div>
                                </li>
                            </ul>
                            <h1 className='text-xl text-[#212529] text-left font-extrabold mt-7'>ช่องทางการจ่ายเงิน</h1>
                            <ul className='flex flex-row space-x-5'>
                                <li>
                                    <div onClick={() => setActiveIndex2(0)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-gray-500 transition p-6 mt-7 w-[390px] h-[130px] text-center flex items-center justify-center flex-row ${activeIndex2 === 0 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => setActiveIndex2(1)} className= {`border border-gray-300 rounded-lg shadow hover:shadow-lg hover:shadow-gray-500 transition p-6 mt-7 w-[390px] h-[130px] text-center flex items-center justify-center flex-row ${activeIndex2 === 1 ? 'bg-[#feddd2]' : 'bg-[#edeef0]'}`}>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 mt-7 w-[470px] h-[600px] text-center flex items-center justify-center'>
                                <div className='w-full h-[490px] -mt-10 flex justify-center items-start'>
                                    <ul className='flex flex-col space-y-12'>
                                        {cart.items.length === 0 ? (
                                            <li className="text-center text-gray-500 py-10">
                                                ตะกร้าว่าง
                                            </li> 
                                            ) : cart.items.map(items => (
                                            <li key={items.orderItemsId}>
                                                <div className='flex items-start justify-start w-[420px] h-20 bg-gray-300 rounded-t-lg'>
                                                    <img className=' w-24 h-20 ml-4' src= {getImageById(items.productId)} alt={items.name || ""} />
                                                        <ul className='flex flex-col items-start justify-start'>
                                                            <li className='flex flex-row'>
                                                                <h3 className='mt-3 font-bold'>{items.name}</h3>
                                                                <button className=' absolute right-20 mt-2' onClick={() => removeItem(items.orderItemsId)}>
                                                                    <IoClose size={17}/>
                                                                </button>  
                                                            </li>
                                                            <li>
                                                                <h3 className='text-xs font-sans'>{items.productDescription}</h3>
                                                            </li>
                                                            <li className='flex flex-row space-x-3'>
                                                                <h3 className='absolute right-36 text-xs font-semibold mt-1'>Quantity :</h3>
                                                                <button className='absolute right-32' onClick={() => decQty(items.orderItemsId, items.qty)}> 
                                                                    ‹ 
                                                                </button>
                                                                <div className='bg-white w-5 h-4 absolute right-[103.2px] mt-[5px]'>
                                                                    <h2 className='flex justify-center items-center absolute  ml-[7px] text-xs'>{items.qty}</h2>
                                                                </div>
                                                                <button className='absolute right-[92px]' onClick={() => incQty(items.orderItemsId, items.qty)}> 
                                                                    › 
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <div className='bg-gray-300 rounded-sm w-full h-4'>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='bg-gray-400 rounded-b-lg w-[419.7px] h-7 mt-3 absolute right-[73.1px]'>
                                                                    <h2 className='absolute right-5 mt-[4.2px] text-sm font-semibold '>฿{Number(items.subtotal).toLocaleString()}</h2>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <hr className="border-black border-t-2 absolute bottom-24 w-[418px] top-[680px]"/>
                                                        <ul className='flex flex-row items-start'>
                                                            <li>
                                                                <h1 className='absolute bottom-[109px] left-[990px] text-xl font-bold'>฿{Number(cart.actualPrice || 0).toLocaleString()}</h1>
                                                            </li>
                                                            <li>
                                                                <button type="button" onClick={Purchase} disabled={!selectedAddressId} title={!selectedAddressId ? "กรุณาเลือกที่อยู่ก่อน" : ""} className="w-24 bg-gray-500 rounded-lg hover:bg-gray-400 absolute left-[1290px] bottom-[110px] text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500">
                                                                    ชำระเงิน
                                                                </button>
                                                            </li>
                                                        </ul>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
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
            {isAddressOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[800px] h-fit relative">
                        <button onClick={() => setIsAddressOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">Add Address</h2>
                        <form className='space-y-4 flex items-center justify-center flex-col'>
                            <input type="text" placeholder="FirstName" name='FirstName' className="w-[500px] border p-2 rounded" value={form.FirstName} onChange={handleChange}/>
                            <input type="text" placeholder="LastName" name='LastName' className="w-[500px] border p-2 rounded" value={form.LastName} onChange={handleChange}/>
                            <input type="text" placeholder="AddressName" name='AddressName' className="w-[500px] border p-2 rounded" value={form.AddressName} onChange={handleChange}/>
                            <input type="text" placeholder='Province' name='Province' className='w-[500px] border p-2 rounded' value={form.Province} onChange={handleChange}/>
                            <input type="text" placeholder="District" name='District' className="w-[500px] border p-2 rounded" value={form.District} onChange={handleChange}/>
                            <input type="text" pattern="[0-9]{5}" maxLength='5' placeholder="PostalCode" name='PostalCode' className="w-[500px] border p-2 rounded" value={form.PostalCode} onChange={handleChange}/>
                            <input type="text" pattern="[0-9]{10}" maxLength='10' placeholder="PhoneNumber" name='PhoneNumber' className="w-[500px] border p-2 rounded" value={form.PhoneNumber} onChange={handleChange}/>
                            <button className="w-[180px] bg-gray-600 text-white py-2 rounded hover:bg-blue-600 ml-80 mt-96" onClick={handleAddress}>
                                Add
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