import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "client");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); // هنا أضفنا الـ userId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "http://localhost:4000";

  useEffect(() => {
    // تحميل البيانات عند بداية التشغيل
    const loadData = async () => {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      const storedName = localStorage.getItem("name");
      const storedRole = localStorage.getItem("role");
      const storedUserId = localStorage.getItem("userId"); // جلب الـ userId من الـ localStorage

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUserId) {
        setUserId(storedUserId); // تعيين الـ userId في الحالة
      }

      if (storedName) setName(storedName);
      if (storedRole) setRole(storedRole);
    };

    loadData();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.data) {
        setFoodList(response.data.data);
      } else {
        setError("قائمة الطعام فارغة أو غير صالحة");
      }
    } catch (error) {
      setError("خطأ في تحميل قائمة الطعام");
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response?.data?.data?.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // دوال إدارة السلة
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = foodList.find((food) => food._id === itemId);
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };

  const contextValue = {
    foodList,
    cartItems,
    role,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    deleteFromCart,
    url,
    token,
    setToken,
    name,
    setName,
    setRole,
    userId, // هنا تم إضافة الـ userId
  };

  if (loading) return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        border: "6px solid #ccc",
        borderTop: "6px solid red",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style> {
        `@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`
      }</style>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
