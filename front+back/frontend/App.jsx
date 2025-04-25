import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import ClientApp from './src/client/ClientApp';
import AdminApp from './src/admin/AdminApp';
import Header from './src/client/component/header.jsx';
import LoginPopop from './src/client/component/LoginPopPop/LoginPopop.jsx';
import './App.css';
import Cart from './src/client/pages/Cart/Cart';
import PlaceOrder from './src/client/pages/PlaceOrder/PlaceOrder.jsx';
import Orders from './src/client/pages/Orders.jsx';
const App = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  // استخراج الاسم من localStorage
  const name = localStorage.getItem("name");
  const isAdmin = name && name.toLowerCase() === "admin";

  return (
    <div>
      {/* نافذة تسجيل الدخول */}
      {showLogin && <LoginPopop setShowLogin={setShowLogin} />}

      {/* الهيدر الرئيسي */}
      <Header 
        setShowLogin={setShowLogin}
        isAdmin={isAdmin} // تمرير قيمة isAdmin
      />

      {/* الراوتس */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client/*" element={<ClientApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />

        {/* صفحة 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App; 