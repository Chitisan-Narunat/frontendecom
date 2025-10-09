import ShoppingCart from "/src/assets/icons8-cart-24.png";
import Menu from "/src/assets/icons8-menu.svg";
import React, { useState, useEffect } from "react";

function Navbar({
    onLoginClick,
    onRegisterClick,
    onCartClick,
    onMenuClick,
    onFavClick,
    favCount = 0,
    cartCount = 0,      

}) {
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
    <nav className="fixed top-0 left-0 w-full bg-[#38393a] p-4 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
            <button onClick={onMenuClick} className="ml-0 md:-ml-14">
                <img src={Menu} alt="white Menu" />
            </button>
            <a href="/pages/Home" className="text-white text-2xl font-semibold font-playfair ml-0 md:-ml-[200px]">
                Dontknow
            </a>
            <div className="hidden md:flex items-center md:ml-28">
                <input type="text" placeholder="Search:" className="px-3 py-1 rounded-l-md border border-gray-300 focus:outline-none w-96"/>
                <button className="bg-white text-[#222222] px-4 py-1 rounded-r-md border border-gray-300 hover:bg-gray-100 transition font-playfair">
                    Search
                </button>
            </div>
            <ul className="flex space-x-4">
                {/* Favourite button + badge */}
                <button onClick={onFavClick} className="text-white hover:text-gray-300 relative" aria-label="Favourites" title="Favourites">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    {/* badge */}
                    {favCount > 0 && (
                        <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center leading-none">
                            {favCount > 99 ? "99+" : favCount}
                        </span>
                    )}
                </button>
                {/* Cart */}
                <button onClick={onCartClick} className="text-white hover:text-gray-300 relative" aria-label="Shopping Cart">
                    <img src={ShoppingCart} alt="Shopping Cart" className="w-6 h-6" />
                    {cartCount > 0 && (
                        <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold leading-none flex items-center justify-center pointer-events-none">
                            {cartCount > 99 ? "99+" : cartCount}
                         </span>
                    )}
                </button>
                {isLoggedIn ? (
                    <>
                        <li>
                            <a href="/pages/Profile" className="text-white hover:text-gray-300 font-playfair">
                                Profile
                            </a>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-white hover:text-gray-300 font-playfair">
                                Logout
                            </button>
                        </li>
                    </>
                    ) : (
                        <>
                            <li>
                                <button onClick={onLoginClick} className="text-white hover:text-gray-300 font-playfair">
                                    Login
                                </button>
                            </li>
                            <li>
                                <button onClick={onRegisterClick} className="text-white hover:text-gray-300 font-playfair">
                                    Register
                                </button>
                            </li>
                        </>
                    )
                }
            </ul>
            {/* Mobile search */}
            <div className="w-full md:hidden">
                <div className="flex">
                    <input type="text" placeholder="Search:" className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none"/>
                    <button className="bg-white text-[#222222] px-4 py-2 rounded-r-md border border-gray-300 hover:bg-gray-100 transition font-playfair">
                        Search
                    </button>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
