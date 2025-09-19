import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import icon1 from "/src/assets/9022927_user_circle_duotone_icon.svg"
import { getImageById } from "/Styles/product-images";
import { jwtDecode } from 'jwt-decode';


function Profile() {

  const [activeIndex, setActiveIndex] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartRendered, setIsCartRendered] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        setUserName(decoded.UserName);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  
  const navigate = useNavigate();
    const goToHome = () =>{
      navigate('/pages/Home'); 
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

    const renderContent = () => {
    switch (activeIndex) {
      case 0: return <ProfileTab />;
      case 1: return <OrderHistoryTab />;
      case 2: return <CardDetailTab />;
      case 3: return <FavouriteTab />;
      case 4: return <AddressTab />
      case 5: return <LogoutTab onLogout={() => navigate('/login')} />;
      default: return null;
    }
  };


  return (
    <main>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} onCartClick={() => setIsCartOpen(true)} />
      <div className='bg-white h-screen'>
        <div className='flex'>
          <div className='bg-white w-[300px] h-[860px] mt-[66px] border-black'>
            <ul className='mt-24'>
              <ul className='flex flex-row space-x-6'>
                <li>
                  <img className='h-20 w-20 absolute top-[75px] left-3' src={icon1} alt="" />
                </li>
                <li>
                  <h1 className='absolute top-[105px] font-bold left-24 text-xl text-black font-playfair' >{userName}</h1>
                </li>
              </ul>
              <li>
                <button onClick={() => setActiveIndex(0)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 0 ? 'bg-gray-300' : 'bg-white'}`}>
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(1)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 1 ? 'bg-gray-300' : 'bg-white'}`}>
                  Order History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(2)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 2 ? 'bg-gray-300' : 'bg-white'}`}>
                  Card Detail
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(3)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 3 ? 'bg-gray-300' : 'bg-white'}`}>
                  My Favourite
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(4)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 4 ? 'bg-gray-300' : 'bg-white'}`}>
                  Address
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(5)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 5 ? 'bg-gray-300' : 'bg-white'}`}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
          <div className='flex-1 h-[860px] mt-[66px] p-8 overflow-y-auto bg-gray-200'>
            {renderContent()}
          </div>
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
                <button onClick={goToAddress} className='w-20 h-10 absolute bottom-7 right-4 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-800 transition'>
                  CheckOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

  function ProfileTab(){

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  const [userprofile, setUserprofile] = useState({ userId: 0, items: [] });
  
      async function refreshUserprofile() {
          try{
              const { data } = await axios.get(`http://localhost:5283/api/Address/UserInfo`,{
                  headers: auth()
              }
              );
              setUserprofile({
                  userId: data?.userId ?? 0,
                  items: data?.items ?? [],
              });
          }catch (err){
            console.error("โหลดข้อมูลไม่สำเร็จ", err);
            setUserprofile({ userId: 0, items: [] });
          }
      }

    useEffect(() => { refreshUserprofile(); },[]);

  
    const primary = userprofile.items?.[0] || {};

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold font-playfair">Profile</h1>
        {userprofile.items.length === 0 ? (
          <h1 className="text-gray-500">ยังไม่มีข้อมูลโปรไฟล์</h1>
        ) : (
          <div className="border border-gray-300 rounded-lg shadow p-6 w-[500px] bg-white space-y-4">
            <h1>UserId: {userprofile.userId}</h1>
            <h1>Username: {primary.userName}</h1>
            <h1>Firstname: {primary.firstName}</h1>
            <h1>Lastname: {primary.lastName}</h1>
            <h1>E-Mail: {primary.email}</h1>
            <h1>PhoneNumber: {primary.phoneNumber}</h1>
          </div>
        )}
      </div>
    );
  }

  function OrderHistoryTab(){
  
  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  const [orderhistory, setorderhistory] = useState({ addressId: [0], items: [0]});

  async function refreshOrderhistory() {
    const { data } = await axios.get(`http://localhost:5283/api/Address/OrderHistory`, { headers: auth() });
    setorderhistory({
      orderhistoryId: data?.orderhistoryId ?? [0],
      items: data?.items ?? [0],
    });
  }

  useEffect(() => {refreshOrderhistory();}, []);

    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold'>Order History</h1>
        <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 w-full h-fit text-center flex items-center justify-start bg-white flex-col space-y-4'>
        {orderhistory.items.length === 0 ? (
          <p className="text-gray-500 items-center justify-center flex">ยังไม่มีรายการ</p>
        ) : (
          orderhistory.items.map(item => (
            <div key={item.addressId} className='bg-gray-200 w-full h-[100px] rounded-lg text-left p-3'>
              <h1 className='font-medium'>
                Date: {item.orderDate} 
              </h1>
                <h1 className='font-medium'>
                Price: ฿{item.actualPrice}
              </h1>
              <h1 className='font-medium'>
                Status: {item.status}
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
    );
  }


  function CardDetailTab(){

    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold'>Card Detail</h1>
        <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 w-full h-fit text-center flex items-center justify-center bg-white'>
          <p className="text-gray-500 items-center justify-center flex">ยังไม่มีข้อมูลการชำระเงิน</p>
        </div>
      </div>
    );
  }


  function FavouriteTab(){
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold'>My Favourite</h1>
        <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 w-full h-fit text-center flex items-center justify-center bg-white'>
          <p className="text-gray-500 items-center justify-center flex">ยังไม่มีสินค้าที่ชอบ</p>
        </div>
      </div>
    );
  }

  function AddressTab(){

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  const [address, setAddress] = useState({ addressId: 0, items: []});

  const [isAddressOpen, setIsAddressOpen] = useState(false)

  const [_editingItem, setEditingItem] = useState(null);
  void _editingItem;

    async function refreshAddress() {
      const { data } = await axios.get(`http://localhost:5283/api/Address/UiAddress2`, { headers: auth() });
      setAddress({
        addressId: data?.addressId ?? [0],
        items: data?.items ?? [0],
      });
    }

    useEffect(() => {refreshAddress();}, []);

    async function removeAddress(rowId) {
    await axios.delete(`http://localhost:5283/api/Address/DelAddress`,  
      { 
        params: { AddressId: rowId }, headers: auth() 
      });
      refreshAddress();
    }

   const[editform, setEditform] = useState({
          AddressId: '',
          FirstName: '',
          LastName: '',
          AddressName: '',
          District: '',
          Province: '',
          PostalCode: '',
          PhoneNumber: ''
      });


    function openEdit(item) {
      setEditingItem(item);
      setEditform({
        AddressId: item.addressId ?? "",
        FirstName: item.firstname ?? "",
        LastName: item.lastname ?? "",
        AddressName: item.name ?? "",        
        Province: item.province ?? "",
        District: item.district ?? "",
        PostalCode: item.postalCode ?? "",
        PhoneNumber: item.phoneNumber ?? "",
      });
      setIsAddressOpen(true);
    }

    function closeModal() {
      setIsAddressOpen(false);
      setEditingItem(null);
    }

    function onChangeField(k, v) {
      setEditform(f => ({ ...f, [k]: v }));
    }

    async function handleSave(e) {
    e.preventDefault();

    if (!editform.AddressId) {
      alert("ไม่มีที่อยู่นี้");
      return;
    }

    await axios.put(
      "http://localhost:5283/api/Address/EditAddress",
      {
        FirstName: editform.FirstName,
        LastName: editform.LastName,
        AddressName: editform.AddressName,
        Province: editform.Province,
        District: editform.District,
        PostalCode: editform.PostalCode,
        PhoneNumber: editform.PhoneNumber,
      },
      {
        params: { AddressId: editform.AddressId },
        headers: auth(),
      }
    );

    await refreshAddress();
    closeModal();
  }


    return (
      <main>
        <div className='space-y-6'>
          <h1 className='text-2xl font-semibold'>My Address</h1>
          <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 w-full h-fit text-center flex items-center justify-start bg-white flex-col space-y-4'>
            {address.items.length === 0 ? (
            <p className="text-gray-500 items-center justify-center flex">ยังไม่มีที่อยู่</p>
            ) : (
              address.items.map(item => (
                <div key={item.addressId} className='bg-gray-200 w-full h-[100px] rounded-lg text-left p-3'>
                  <button onClick={() => removeAddress(item.addressId)} className='absolute right-[87px] -mt-2'>x</button>
                  <h1 className='font-medium'>
                    {item.firstname} {item.lastname}
                  </h1>
                  <h1 className='font-medium text-sm mt-[0.5px]'>
                    {item.name}, {item.district}, {item.province} {item.postalCode}
                  </h1>
                  <h1 className='font-medium text-sm'>
                    PhoneNumber: {item.phoneNumber}
                  </h1>
                  <button className='text-xs ml-[990px] rounded-lg bg-gray-300 w-10 -mt-1 absolute hover:bg-gray-400' onClick={() => openEdit(item)}>
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        {isAddressOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onMouseDown={(e) => {if (e.target === e.currentTarget) closeModal(); }}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-[800px] h-fit relative" role="dialog" aria-modal="true" aria-labelledby="edit-address-title" onMouseDown={(e) => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute top-3 right-3 text-gray-600 hover:text-black" aria-label="Close">
                <IoClose size={24} />
              </button>
              <h2 id="edit-address-title" className="text-2xl font-bold mb-4 text-center">Edit Address #{editform.AddressId}</h2>
              <form onSubmit={handleSave} className='space-y-4 flex items-center justify-center flex-col'>
                <input type="text" placeholder="FirstName" name='FirstName' className="w-[500px] border p-2 rounded" value={editform.FirstName} onChange={(e) => onChangeField("FirstName", e.target.value)} required/>
                <input type="text" placeholder="LastName" name='LastName' className="w-[500px] border p-2 rounded" value={editform.LastName} onChange={(e) => onChangeField("LastName" ,e.target.value )} required/>
                <input type="text" placeholder="AddressName" name='AddressName' className="w-[500px] border p-2 rounded" value={editform.AddressName} onChange={(e) => onChangeField("AddressName", e.target.value)} required/>
                <input type="text" placeholder='Province' name='Province' className='w-[500px] border p-2 rounded' value={editform.Province} onChange={(e) => onChangeField("Province", e.target.value)} required/>
                <input type="text" placeholder="District" name='District' className="w-[500px] border p-2 rounded" value={editform.District} onChange={(e) => onChangeField("District", e.target.value)} required/>
                <input type="text" pattern="[0-9]{5}" maxLength={5} placeholder="PostalCode" name='PostalCode' className="w-[500px] border p-2 rounded" value={editform.PostalCode} onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 5);
                    onChangeField("PostalCode", v);
                  }} required/>
                <input type="text" pattern="[0-9]{10}" maxLength={10} placeholder="PhoneNumber" name='PhoneNumber' className="w-[500px] border p-2 rounded" value={editform.PhoneNumber} onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                    onChangeField("PhoneNumber", v);
                  }} required/>
                <button className="w-[180px] bg-gray-600 text-white py-2 rounded hover:bg-blue-600 ml-80 mt-96" type='submit'>
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

export default Profile