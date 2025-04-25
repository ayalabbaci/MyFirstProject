import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart';
import Footer from './component/Footer.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Orders from './pages/Orders.jsx';
const ClientApp = () => {
  // 1. تأكد من تعريف الحالة بشكل صحيح
 

  return ( 
    <div className="app-container">
      
      
      <main className="main-content">
        <Routes>
       
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />
          <Route path="orders" element={<Orders />} />

          
        </Routes>
      </main>
      
      
      <Footer />
    </div>
  );
}

export default ClientApp;