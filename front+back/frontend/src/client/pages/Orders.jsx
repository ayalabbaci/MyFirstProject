import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { TailSpin } from 'react-loader-spinner';

const Orders = () => {
  const { userId, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

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

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      await axios.put(
        `http://localhost:4000/api/orders/update-status/${orderId}`,
        { status: 'canceled', notifyClient: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: 'canceled' } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong while canceling the order.");
    }
  };

  const filteredOrders = showHistory
    ? orders.filter(order => order.status === 'completed' || order.status === 'canceled')
    : orders.filter(order => order.status !== 'completed' && order.status !== 'canceled');

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">My Orders</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showHistory ? 'Show Active Orders' : 'Show History'}
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">No orders to display.</p>
      ) : (
        <ul className="space-y-4">
          {filteredOrders.map((order, index) => (
            <li key={index} className="bg-white shadow-md p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <div>
                <p className="font-semibold text-lg text-red-800">
  Order {index + 1} 
</p>
                  <p className="text-gray-500 text-sm">
                    Date: {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <span className={`font-semibold text-sm ${
                  order.status === 'pending' ? 'text-yellow-500' :
                  order.status === 'in-progress' ? 'text-blue-500' :
                  order.status === 'completed' ? 'text-green-600' :
                  order.status === 'canceled' ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                  {order.status}
                </span>
              </div>

              <button
                className="text-sm text-blue-600 mt-2 underline"
                onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
              >
                {expandedOrderId === order._id ? 'Hide Details' : 'View Details'}
              </button>

              {expandedOrderId === order._id && (
                <div className="mt-4">
                  <p className="font-semibold">Customer:</p>
                  <p>{order.firstName} {order.lastName}</p>

                  <p className="mt-2 font-semibold">Address:</p>
                  <p>{order.street}</p>

                  <p className="mt-2 font-semibold">Items:</p>
                  <ul className="list-disc ml-5 text-gray-700">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} — Quantity: {item.quantity}, Price: {item.price} DA
                      </li>
                    ))}
                  </ul>

                  {order.supplements?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">Supplements:</p>
                      <p>{order.supplements.join(", ")}</p>
                    </div>
                  )}

                  <p className="mt-2 text-gray-700">Delivery Fee: {order.deliveryFee} DA</p>
                  <p className="text-gray-700 font-bold">Total: {order.total} DA</p>

                  {(order.status === 'pending' || order.status === 'in-progress') && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
