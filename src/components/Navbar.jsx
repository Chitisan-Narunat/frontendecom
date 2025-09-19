import ShoppingCart from "/src/assets/icons8-cart-24.png";
import Menu from "/src/assets/icons8-menu.svg";
import React, { useState , useEffect} from 'react'




function Navbar({ onLoginClick , onRegisterClick , onCartClick , onMenuClick}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/pages/Home"; 
    };

    return (
        <nav className='fixed top-0 left-0 w-full bg-[#38393a] p-4 z-50'>
            <div className="container mx-auto flex justify-between items-center">
                <button onClick={onMenuClick} className="-ml-14">
                    <img src={Menu} alt="white Menu" className=""/>
                </button>
                <a href="/pages/Home" className='text-white text-2xl font-semibold -ml-60 font-playfair'>Dontknow</a>
                <div className='flex items-center ml-16'>
                    <input type="text" placeholder = "Search:" className='px-3 py-1 rounded-l-md border border-gray-300 focus:outline-none w-96' 
                    />
                    <button className='bg-white text-[#222222] px-4 py-1 rounded-r-md border border-gray-300 hover:bg-gray-100 transition font-playfair'>
                    Search
                    </button>
                </div>
                <ul className='flex space-x-4'>
                    <button onClick={onCartClick} className='text-white hover:text-gray-300' aria-label='Shopping Cart'>
                        <img src={ShoppingCart} alt="Shopping Cart" className='w-6 h-6'/>
                    </button>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <a href="/pages/Profile" className='text-white hover:text-gray-300 font-playfair'>Profile
                                </a>
                            </li>
                            <li>
                                <button onClick={handleLogout} className='text-white hover:text-gray-300 font-playfair'>Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button onClick={onLoginClick} className='text-white hover:text-gray-300 font-playfair'>Login
                                </button>
                            </li>
                            <li>
                                <button onClick={onRegisterClick} className="text-white hover:text-gray-300 font-playfair">Register
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar