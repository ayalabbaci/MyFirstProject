import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext'; // استيراد context المستخدم

const Orders = () => {
  const { userId, token } = useContext(StoreContext); // الحصول على التوكن من الـ context
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/orders/user', {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة التوكن إلى الهيدر
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("فشل في جلب الطلبات", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId, token]);
  console.log({
    userId,
    firstName,
    lastName,
    phone,
    street,
    total: grandTotal,
    deliveryFee,
    supplements: supplementNote?.split(",").map((s) => s.trim()) || [],
    items,
  });
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="bg-white shadow-md p-4 rounded-lg border">
              <p className="font-semibold text-lg text-gray-800">
                {order.firstName} {order.lastName}
              </p>
              <div className="mt-2">
                <p className="font-semibold">The order:</p>
                <ul className="list-disc ml-5 text-gray-700">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} - Quantity: {item.quantity}, Price: {item.price} DA
                    </li>
                  ))}
                </ul>
              </div>
              {order.supplements?.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Supplements:</p>
                  <p className="text-gray-700">{order.supplements.join(", ")}</p>
                </div>
              )}
              <p className="mt-2 text-gray-700">Address: {order.street}</p>
              <p className="text-gray-700">Delivery Fee: {order.deliveryFee} DA</p>
              <p className="text-gray-700 font-bold">Total: {order.total} DA</p>
              <p className="text-gray-500 mt-1 text-sm">
                Date: {new Date(order.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
