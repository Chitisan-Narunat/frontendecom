import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import icon1 from "/src/assets/9022927_user_circle_duotone_icon.svg"
import { getImageById } from "/Styles/product-images";
import { jwtDecode } from 'jwt-decode';


function Admin() {

  const [activeIndex, setActiveIndex] = useState(0);

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
    
    const navigate15 = useNavigate();
    const gotoAdmin = () =>{
        navigate15('/pages/Admin')
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
      case 0: return <ProductTab />;
      case 1: return <CategoryTab />;
      case 2: return <RoleTab />;
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
                  Product
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(1)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 1 ? 'bg-gray-300' : 'bg-white'}`}>
                  Category
                </button>
              </li>
              <li>
                <button onClick={() => setActiveIndex(2)} className={`w-full h-20 rounded-xl text-black font-serif text-lg hover:bg-gray-300 ${activeIndex === 2 ? 'bg-gray-300' : 'bg-white'}`}>
                  Roles
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
              <li>
                <button onClick={gotoAdmin}>Admin
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



  function ProductTab(){

    const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
    const [,setuserprofile] = useState({ addressId: [0], items: [0]});
    

    async function refreshUserprofile() {
        const { data } = await axios.get(`http://localhost:5283/api/Address/UserInfo`, { headers: auth() });
        setuserprofile({
            addressId: data?.addressId ?? [0],
            items: data?.items ?? [0],
        });
    }

    
    const [form , setForm] = useState({
            ProductId: '',
            CategoryId: '',
            ProductName: '',
            ProductDescription: '',
            ProductPrice: '',
        });


            const handleChange = (e) =>{
                setForm({
                    ...form,
                    [e.target.name]:e.target.value,
                });
            };

        const handleAdd = async(e) =>{
        e.preventDefault();
        try{

            const token = localStorage.getItem("token");
            const API = await axios.post(`http://localhost:5283/api/Product/AddProduct`,{    

                ProductId: form.ProductId,
                CategoryId: form.CategoryId,
                ProductName: form.ProductName,
                ProductDescription: form.ProductDescription,
                ProductPrice: form.ProductPrice,
                IsActive: true,

                ProductId2: form.ProductId,

            },
            {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            }
            );
            alert("เพิ่มสำเร็จ");

            console.log("API Response:", API.data);
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                alert("มีอยู่แล้ว");

            } else 
            {
                alert("ยังไม่ได้ใส่ข้อมูล");

            }
        }
    };

    const [productId, setProductId] = useState("");

    const handleDelete = async () => {
        if (!productId){
            alert("กรอก productid ก่อน");
            return;
        }
        try{
            await axios.delete(`http://localhost:5283/api/Product/DropProduct`,{
                headers: auth(),
                params: { ProductId: Number(productId) }
            }
            );
            alert("success")
        }catch (err) {
            if (err.response) {
                alert("delete fail")
            } else {
                alert("error")
            }
        }
    }

    useEffect(() => {refreshUserprofile();}, []);

    const[editform, setEditform] = useState({

        ProductId: '',
        CategoryId: '',
        ProductName: '',
        ProductDescription: '',
        ProductPrice: '',
        Stock: '',
        IsActive: '1'
         
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditform(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = async () =>{
        if(!editform.ProductId){
            alert("ไม่มีproduct id");
            return;
        }
        try{
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5283/api/Product/EditProduct`,{
                ProductId: Number(editform.ProductId),
                CategoryId: Number(editform.CategoryId),
                ProductName: editform.ProductName,
                ProductDescription: editform.ProductDescription,
                ProductPrice: parseFloat(editform.ProductPrice || "0"),
            },
            {
                headers:{Authorization: `Bearer ${token}`},
                params: { ProductId: Number(editform.ProductId) },
            }
            );
            alert("success");
        }catch (err) {
            if (err.response?.status === 404) alert("ไม่พบสินค้า");
            else alert(err.response?.data || "แก้ไขไม่สำเร็จ");
        }
    }

    return (
        <div className='space-y-6'>
            <ul className='flex flex-row space-x-[380px]'>
                <li>
                    <h1 className='text-2xl font-semibold'>Add Product</h1>
                </li>
                <li>
                     <h1 className='text-2xl font-semibold'>Drop Product</h1>
                </li>
            </ul>
            <ul className='flex flex-row space-x-9'>
                <li>
                    <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
                        <ul className='flex flex-row space-x-4 ml-[10px]'>
                            <li>
                                <h1 className='-ml-[116px]'>Product Id</h1>
                                <input type="number" name='ProductId' className='w-fit bg-gray-200 rounded-lg text-center' value={form.ProductId} onChange={handleChange}/>
                            </li>
                            <li className='ml-4'> 
                                <h1 className='-ml-[110px]'>Category Id</h1>
                                <input type="number" name='CategoryId' className='w-fit bg-gray-200 rounded-lg text-center' value={form.CategoryId} onChange={handleChange}/> 
                            </li>
                        </ul>
                        <ul className='space-y-4 flex flex-col'>
                            <li>
                                <h1 className='text-start ml-3'>Product Name</h1>
                                <input type="text" name='ProductName' className='w-[410px] bg-gray-200 rounded-lg' value={form.ProductName} onChange={handleChange}/> 
                            </li>
                            <li>
                                <h1 className='text-start ml-3'>Product Description</h1>
                                <input type="text" name='ProductDescription' className='w-[410px] bg-gray-200 rounded-lg' value={form.ProductDescription} onChange={handleChange}/> 
                            </li>
                        </ul>
                        <ul className='relative'>
                            <li>
                                <h1 className='text-start ml-3'>Product Price</h1>
                                <input type="number" name='ProductPrice' className='w-[103px] bg-gray-200 rounded-lg absolute left-[10px] text-center' value={form.ProductPrice} onChange={handleChange}/> 
                            </li>
                            <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[150px] absolute -bottom-[235px]' onClick={handleAdd} >save</button>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
                        <ul className='flex flex-row space-x-4 ml-[10px]'>
                            <li>
                                <h1 className='-ml-[116px]'>Product Id</h1>
                                <input type="number"className='w-fit bg-gray-200 rounded-lg text-center' value={productId} onChange={(e) => setProductId(e.target.value)}/>
                            </li>
                            <li className='relative'>
                                <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[140px] absolute -bottom-[403px]' onClick={handleDelete}>save</button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <h1 className='text-2xl font-semibold'>Edit Product</h1>
            <ul className='flex flex-row space-x-9'>
                <li>
                    <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
                        <ul className='flex flex-row space-x-4 ml-[10px]'>
                            <li>
                                <h1 className='-ml-[116px]'>Product Id</h1>
                                <input type="number" name='ProductId' className='w-fit bg-gray-200 rounded-lg text-center' value={editform.ProductId} onChange={handleEditChange}/>
                            </li>
                            <li className='ml-4'> 
                                <h1 className='-ml-[110px]'>Category Id</h1>
                                <input type="number" name='CategoryId' className='w-fit bg-gray-200 rounded-lg text-center' value={editform.CategoryId} onChange={handleEditChange}/> 
                            </li>
                        </ul>
                        <ul className='space-y-4 flex flex-col'>
                            <li>
                                <h1 className='text-start ml-3'>Product Name</h1>
                                <input type="text" name='ProductName' className='w-[410px] bg-gray-200 rounded-lg' value={editform.ProductName} onChange={handleEditChange}/> 
                            </li>
                            <li>
                                <h1 className='text-start ml-3'>Product Description</h1>
                                <input type="text" name='ProductDescription' className='w-[410px] bg-gray-200 rounded-lg' value={editform.ProductDescription} onChange={handleEditChange}/> 
                            </li>
                        </ul>
                        <ul className='relative'>
                            <li>
                                <h1 className='text-start ml-3'>Product Price</h1>
                                <input type="number" name='ProductPrice' className='w-[103px] bg-gray-200 rounded-lg absolute left-[10px] text-center' value={editform.ProductPrice} onChange={handleEditChange}/> 
                            </li>
                            <li>
                                <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[150px] absolute -bottom-[235px]' onClick={handleEdit} >save</button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
  }

  function CategoryTab(){

    const [form , setForm] = useState({
        CategoryId: '',
        CategoryName: '',
        CategoryDescription: '',
    });

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };

    const handleCategory = async(e) =>{
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const API = await axios.post(`http://localhost:5283/api/Category/AddCategory`,{    

                CategoryId: form.CategoryId,
                CategoryName: form.CategoryName,
                CategoryDescription: form.CategoryDescription,
                IsActive: true
            },
            {
                headers: { Authorization:`Bearer ${token}`,}
            }
            );
            alert("เพิ่มสำเร็จ");

            console.log("API Response:", API.data);
        }catch(error){
            if (error.response && typeof error.response.data === 'string') {
                alert("มีอยู่แล้ว");

            } else 
            {
                alert("ยังไม่ใส่ข้อมูล");

            }
        }
    };

        const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}`});

        const [categoryId, setcategoryId] = useState("");

        const handleDelete = async () => {
        if (!categoryId){
            alert("กรอก categoryid ก่อน");
            return;
        }
        try{
            await axios.delete(`http://localhost:5283/api/Category/DropCategory`,{
                headers: auth(),
                params: { CategoryId: Number(categoryId) }
            }
            );
            alert("success")
        }catch (err) {
            if (err.response) {
                alert("delete fail")
            } else {
                alert("error")
            }
        }
    }

    const[editcate, seteditCategory] = useState({
        CategoryId: '',
        CategoryName: '',
        CategoryDescription: '',
        IsActive: '1'
    })

        const handleEditChange = (e) => {
        const { name, value } = e.target;
        seteditCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleedit = async () => {
        if(!editcate.CategoryId){
            alert("ไม่มีid");
            return;
        }
        try{
            const token = localStorage.getItem("token")
            await axios.put(`http://localhost:5283/api/Category/EditCategory`,{
                CategoryName: editcate.CategoryName,
                CategoryDescription: editcate.CategoryDescription,
            },
            {
                headers:{Authorization: `Bearer ${token}`},
                params: { CategoryId: Number(editcate.CategoryId) },
            }
            );
            alert("แก้ไขสำเร็จ");

        }catch (err) {
            if (err.response?.status === 404) alert("ไม่พบสินค้า");
            else alert(err.response?.data || "แก้ไขไม่สำเร็จ");
        }
    }

    return (
        <div className='space-y-6'>
            <ul className='flex flex-row space-x-[365px]'>
                <li>
                    <h1 className='text-2xl font-semibold'>Add Category</h1>
                </li>
                <li>
                     <h1 className='text-2xl font-semibold'>Drop Category</h1>
                </li>
            </ul>
            <ul className='flex flex-row space-x-9'>
                <li>
                    <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
                        <ul className='flex flex-row space-x-4 ml-[10px]'>
                            <li>
                                <h1 className='-ml-3'>Category Id</h1>
                                <input type="number" name='CategoryId' className='w-[103px] bg-gray-200 rounded-lg text-center' value={form.CategoryId} onChange={handleChange}/>
                            </li>
                        </ul>
                        <ul className='space-y-4 flex flex-col relative'>
                            <li>
                                <h1 className='text-start ml-3'>Category Name</h1>
                                <input type="text" name='CategoryName' className='w-[410px] bg-gray-200 rounded-lg' value={form.CategoryName} onChange={handleChange}/> 
                            </li>
                            <li>
                                <h1 className='text-start ml-3'>Category Description</h1>
                                <input type="text" name='CategoryDescription' className='w-[410px] bg-gray-200 rounded-lg' value={form.CategoryDescription} onChange={handleChange}/> 
                            </li>
                            <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[365px] absolute -bottom-[275px]' onClick={handleCategory}>save</button>

                        </ul>
                    </div>
                </li>
                <li>
                    <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
                        <ul className='flex flex-row space-x-4 ml-[10px] relative'>
                            <li>
                                <h1 className='-ml-3'>Category Id</h1>
                                <input type="number"className='w-[103px] bg-gray-200 rounded-lg text-center' value={categoryId} onChange={(e) => setcategoryId(e.target.value)}/>
                            </li>
                            <li>
                                <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[235px] absolute -bottom-[403px]' onClick={handleDelete}>save</button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <h1 className='text-2xl font-semibold'>Edit Category</h1>
            <ul className='flex flex-row space-x-9'>
                <li>
                    <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
                        <ul className='flex flex-row space-x-4 ml-[10px]'>
                            <li>
                                <h1 className='-ml-3'>Category Id</h1>
                                <input type="number" name='CategoryId' className='w-[103px] bg-gray-200 rounded-lg text-center' value={editcate.CategoryId} onChange={handleEditChange}/>
                            </li>
                        </ul>
                        <ul className='space-y-4 flex flex-col relative'>
                            <li>
                                <h1 className='text-start ml-3'>Category Name</h1>
                                <input type="text" name='CategoryName' className='w-[410px] bg-gray-200 rounded-lg' value={editcate.CategoryName} onChange={handleEditChange}/> 
                            </li>
                            <li>
                                <h1 className='text-start ml-3'>Category Description</h1>
                                <input type="text" name='CategoryDescription' className='w-[410px] bg-gray-200 rounded-lg' value={editcate.CategoryDescription} onChange={handleEditChange}/> 
                            </li>
                            <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[365px] absolute -bottom-[275px]' onClick={handleedit}>save</button>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
  }



  function RoleTab(){

    const[editrole, seteditrole] = useState({
        UserId: '',
        Roles: ''
    })

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        seteditrole(prev => ({ ...prev, [name]: value }));
    };

    const handleedit = async () => {
        if(!editrole.UserId){
            alert("ไม่มีid");
            return;
        }
        try{
            const token = localStorage.getItem("token")
            await axios.put(`http://localhost:5283/api/Authen/EditRole`,{
                Roles:editrole.Roles,
            },
            {
                headers:{Authorization: `Bearer ${token}`},
                params: { UsersId: Number(editrole.UserId) },
            }
            );
            alert("แก้ไขสำเร็จ");

        }catch (err) {
            if (err.response?.status === 404) alert("ไม่พบสินค้า");
            else alert(err.response?.data || "แก้ไขไม่สำเร็จ");
        }
    }
      
    return (
      <div className='space-y-6'>
          <h1 className='text-2xl font-semibold'>Edit Role</h1>
          <div className='border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-6 w-[480px] h-[500px] text-center bg-white flex-col space-y-4'>
            <ul className='flex flex-row space-x-4 ml-[10px]'>
              <li>
                <h1 className='-ml-12'>UserId</h1>
                <input type="number" name='UserId' className='w-[103px] bg-gray-200 rounded-lg text-center' value={editrole.UserId} onChange={handleEditChange}/>
              </li>
            </ul>
            <ul className='space-y-4 flex flex-col'>
                <li>
                    <h1 className='text-start ml-3'>Roles</h1>
                    <select name="Roles" value={editrole.Roles} onChange={handleEditChange} className="w-[200px] bg-gray-200 rounded-lg text-center absolute left-[370px]">
                        <option value="0">Admin</option>
                        <option value="1">Member</option>
                    </select>
                </li>
            </ul>
            <button className='border-2 border-black hover hover:bg-gray-400 rounded-lg w-16 h-8 ml-[150px] absolute bottom-52' onClick={handleedit}>save</button>
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
  const [address, setAddress] = useState({ addressId: [0], items: [0]});

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

    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-semibold'>My Address</h1>
        <div className='border border-gray-300 rounded-lg shadow hover:shadow-lg transition p-6 w-full h-fit text-center flex items-center justify-start bg-white flex-col space-y-4'>
        {address.items.length === 0 ? (
          <p className="text-gray-500 items-center justify-center flex">ยังไม่มีที่อยู่</p>
        ) : (
          address.items.map(item => (
            <div key={item.addressId} className='bg-gray-200 w-full h-[100px] rounded-lg text-left p-3'>
              <button onClick={() => removeAddress(item.addressId)} className='absolute right-[73px] -mt-2'>x</button>
              <h1 className='font-medium'>
                {item.name}, {item.district}, {item.province} {item.postalCode}
              </h1>
              <p className="text-sm text-gray-600">PhoneNumber:{item.phoneNumber}</p>
            </div>
          ))
        )}
      </div>
    </div>
    );
  }

export default Admin