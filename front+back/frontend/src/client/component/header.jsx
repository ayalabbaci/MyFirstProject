import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import SearchQuestions from './search/SearchQuestions';
import orders from '../pages/Orders.jsx';
const Header = ({ setShowLogin, isAdmin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken, name, setName } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken("");
    setName("");
    navigate("/");
  };

  return (
    <header className="navbar flex items-center justify-between px-10 py-1 bg-white shadow w-full">
      {/* Logo */}
      <div>
        <Link to='/'><img src={assets.logo} alt="Logo" className="h-12 logo" /></Link>
      </div>

      {/* فقط إن لم يكن أدمن */}
      {!isAdmin && (
        <nav className="navbar-menu">
          <ul className="flex space-x-8">
            <Link to='/' onClick={() => setMenu("home")} className={`font-medium text-lg cursor-pointer hover:text-red-600 ${menu === "home" ? "border-b-2 border-red-600" : ""}`}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu("menu")} className={`font-medium text-lg cursor-pointer hover:text-red-600 ${menu === "menu" ? "border-b-2 border-red-600" : ""}`}>Menu</a>
            <a href='#app-download' onClick={() => setMenu("mobile app")} className={`font-medium text-lg cursor-pointer hover:text-red-600 ${menu === "mobile app" ? "border-b-2 border-red-600" : ""}`}>Mobile-App</a>
            <a href='#footer' onClick={() => setMenu("contact")} className={`font-medium text-lg cursor-pointer hover:text-red-600 ${menu === "contact" ? "border-b-2 border-red-600" : ""}`}>Contact</a>
          </ul>
        </nav>
      )}

      {/* Right section */}
      <div className="navbar-right flex items-center gap-8">
        {name && (
          <p className="text-3xl mt-1 text-orange-500">
            Hello, <span>{name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1).toLowerCase()}</span>
          </p>
        )}

        {/* فقط إذا لم يكن أدمن */}
        {!isAdmin && <SearchQuestions />}

        {/* إذا كان أدمن: زر لوحة التحكم */}
        {isAdmin && (
          <Link to="/admin" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
            Admin Panel
          </Link>
        )}

        {/* عربة التسوق تظهر فقط لغير الأدمن */}
        {!isAdmin && (
          <div className="relative cursor-pointer text-gray-700 hover:text-red-600">
            <Link to='/cart'>
              <i className="fa-solid fa-basket-shopping text-xl"></i>
            </Link>
            <div className={`absolute w-2 h-2 bg-red-400 rounded-full -top-1 -right-1 ${getTotalCartAmount() === 0 ? "hidden" : ""}`}></div>
          </div>
        )}

        {/* تسجيل الدخول أو تسجيل الخروج */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="bg-red-600 text-white px-4  rounded-full hover:bg-red-700 transition-colors">
            Sign In/Sign Up
          </button>
        ) : (
          <div className='relative navbar-profil'>
            <img src={assets.profile_icon} alt="profile" className="cursor-pointer" />
            <ul className="nav-profile-dropdown">
  {!isAdmin && (
    <>
      <li>
        <Link to="/orders" className=" flex p-2 ">
          <img src={assets.bag_icon} alt="/orders" className="w-4 h-3 mr-2" />
          <p className="text-sm">Orders</p>
        </Link>
      </li>
      <hr className="border-t border-gray-200" />
    </>
  )}
  <li onClick={logout} className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
    <img src={assets.logout_icon} alt="logout" className="w-4 h-3 mr-0.5 ml-2" />    <p className="text-sm">Logout</p>
  </li>
</ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
