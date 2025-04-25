import React, { useEffect, useState } from 'react';
import Sidebar from './component/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';

const AdminApp = () => {
  const url = "http://localhost:4000";
  
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const animation = useSpring({
    opacity: show ? 1 : 0,
    config: { tension: 200, friction: 20 }
  });
  
  return (
    <div>
      {show && (
        <animated.div
          style={{
            ...animation,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark with 70% opacity
            zIndex: 50
          }}
        >
          <h1 className="text-8xl font-bold text-red-500 drop-shadow-lg">
            Hello Admin
          </h1>
        </animated.div>
      )}
      
      <ToastContainer />
      <div className="app-content flex">
        <Sidebar />
        <Routes>
          <Route index element={<Orders url={url} />} />
          <Route path="add" element={<Add url={url} />} />
          <Route path="list" element={<List url={url} />} />
          <Route path="orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminApp;