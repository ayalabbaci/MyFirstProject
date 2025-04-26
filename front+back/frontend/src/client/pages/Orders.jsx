import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { TailSpin } from 'react-loader-spinner'; // Loader component

const Orders = () => {
  const { userId, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userId || !token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:4000/api/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setError("Failed to fetch orders.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("An error occurred while fetching orders.");
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchOrders();
    }
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#FF6347" height={100} width={100} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="bg-white shadow-md p-4 rounded-lg border">
              <p className="font-semibold text-3xl text-red-800">
                {order.firstName} {order.lastName}
              </p>
              <div className="mt-2">
                <p className="font-semibold text-xl text-gray-800">Order:</p>
                <ul className="list-disc ml-5 text-gray-700">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} <br/>
                      Quantity: {item.quantity},<br/>
                      Price: {item.price} DA
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

              {/* ✨ عرض حالة الطلب هنا ✨ */}
              <p className="mt-2 text-gray-800">
                Status: 
                <span className={`ml-2 font-semibold ${
                  order.status === 'pending' ? 'text-yellow-500' :
                  order.status === 'in-progress' ? 'text-blue-500' :
                  order.status === 'completed' ? 'text-green-600' :
                  order.status === 'canceled' ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                  {order.status}
                </span>
              </p>

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
