import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { TailSpin } from 'react-loader-spinner'; // Optional: Loader component to display while loading

const Orders = () => {
  const { userId, token } = useContext(StoreContext); // Get the token from the context
  const [orders, setOrders] = useState([]); // Store the orders in local state
  const [loading, setLoading] = useState(true); // To determine whether data is loading
  const [error, setError] = useState(null); // To store any errors if they occur

  useEffect(() => {
   
    const fetchOrders = async () => {
      try {
        

        // Check if the userId or token are missing
        if (!userId || !token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:4000/api/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the header
          },
        });

       

        // Check the API response
        if (res.data.success) {
          setOrders(res.data.orders); // Store the data in the local state
        } else {
          setError("Failed to fetch orders.");
        }

        setLoading(false); // Set loading state to false after receiving the response
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("An error occurred while fetching orders.");
        setLoading(false); // Set loading state to false in case of an error
      }
    };

    // Fetch orders if userId and token are available
    if (userId && token) {
      fetchOrders();
    }
  }, [userId, token]); // Execute this effect when userId or token change

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#FF6347" height={100} width={100} /> {/* Loader component */}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message if an error occurred
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
