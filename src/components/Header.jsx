// src/components/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { BsEmojiSmile } from "react-icons/bs";


  
  



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className="w-full items-center justify-between bg-blue-600 text-white py-4 px-2 lg:px-8 ">
    <div className="  flex items-center  justify-between  ">
      <div className="flex gap-4 items-center">
        {/* Logo */}
        < BsEmojiSmile
          size= {200}
          loading="lazy"
          alt="Happy child Logo"
          className="h-12 w-12 cursor-pointer  font-extrabold text-black"
        />
        <h1 className=" text-2xl lg:text-3xl font-bold ">HAPPYCHILD</h1>
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
      <nav className={` flex flex-col absolute lg:relative gap-8 lg:gap-2 top-20 lg:space-x-4 left-0 lg:top-0 p-28 md:p-32  lg:p-0 lg:flex-row items-center justify-center  bg-black lg:bg-transparent lg:block  ${menuOpen ? 'block' : 'hidden'}`}>
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
