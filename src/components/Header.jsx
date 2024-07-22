// src/components/Header.tsx

import { Link } from 'react-router-dom'; // For navigation links
import logo from '../assets/images/Screenshot-2024-07-21-140451.svg'

const Header = () => (
  <header className="w-full bg-blue-600 text-white">
    <div className="  flex items-center  justify-between py-4 px-2 xl:px-1 ">
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
      <nav className="space-x-4  pr-8">
        {/* Navigation Links */}
        <Link to="/" className="hover:text-gray-200 text-xl ">Home</Link>
        <Link to="/features" className="hover:text-gray-200 text-xl">Features</Link>
        <Link to="/about" className="hover:text-gray-200 text-xl">About</Link>
        <Link to="/contact" className="hover:text-gray-200 text-xl">Contact</Link>
      </nav>
    </div>
  </header>
);

export default Header;
