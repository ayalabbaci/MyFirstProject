import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // استيراد أيقونة Font Awesome

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/admin/add' className="sidebar-option">
          <img src={assets.add_icon} alt=""/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/admin/list' className="sidebar-option">
          <img src={assets.order_icon} alt=""/>
          <p>List Items</p>
        </NavLink>
        <NavLink to='/admin/orders' className="sidebar-option">
          <img src={assets.order_icon} alt=""/>
          <p>Orders</p>
        </NavLink>
        <NavLink to='/admin/reviews' className="sidebar-option">
          <FaStar size={22} style={{ marginRight: '10px' }} /> {/* أيقونة بدل الصورة */}
          <p>Reviews</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

