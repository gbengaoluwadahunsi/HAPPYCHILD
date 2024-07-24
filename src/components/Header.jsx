// src/components/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import logo from '../assets/images/Screenshot-2024-07-21-140451.svg'
import { FaBars, FaTimes } from 'react-icons/fa'; 


  
  



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className="w-full items-center  bg-blue-600 text-white">
    <div className="  flex items-center  justify-between py-4 px-4 xl:px-1 ">
      <div className="flex items-center">
        {/* Logo */}
        <img
          src={logo}
          width={100}
          height={100}
          loading="lazy"
          alt="Happy child Logo"
          className="h-12"
        />
        <h1 className="text-3xl font-bold ml-4">HAPPYCHILD</h1>
      </div>
      <div className="lg:hidden">
          {/* Hamburger Menu Icon for Mobile */}
          <button
            className="text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
      </div> 
      <nav className={` flex flex-col absolute lg:relative gap-8 lg:gap-4 top-20  left-0 lg:top-0 p-32  lg:p-0 lg:flex-row items-center justify-center  bg-black lg:bg-transparent   ${menuOpen ? 'block' : 'hidden'}`}>
        {/* Navigation Links */}
        <Link to="/" className="hover:text-gray-200 text-xl ">Home</Link>
        <Link to="/features" className="hover:text-gray-200 text-xl">Features</Link>
        <Link to="/about" className="hover:text-gray-200 text-xl">About</Link>
        <Link to="/contact" className="hover:text-gray-200 text-xl">Contact</Link>
        <Link to="/login" className="hover:text-gray-200 text-xl bg-red-500 py-2 px-4 rounded-full cursor-pointer">Login</Link>
      </nav>
    </div>
  </header>
  )
}

export default Header
