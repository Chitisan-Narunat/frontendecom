import Navbar from '/src/components/Navbar';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

function Profile() {

  const [activeIndex, setActiveIndex] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const navigate = useNavigate();
    const goToHome = () =>{
      navigate('/'); 
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
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <div className='bg-white h-screen'>
        <div className='bg-white w-[300px] h-[860px] mt-[66px] border-black'>
          <ul className='mt-40'>
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
                Log Out
              </button>
            </li>
          </ul>
        </div>
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
    </main>
  )
}

export default Profile