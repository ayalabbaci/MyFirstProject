import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';

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
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (!confirmResult.isConfirmed) return;

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

      Swal.fire('Canceled!', 'Your order has been canceled.', 'success');
    } catch (error) {
      console.error("Error cancelling order:", error);
      Swal.fire('Error', 'Something went wrong while canceling the order.', 'error');
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
    <div className="p-3 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-600">My Orders</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full sm:w-auto px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm md:text-base"
        >
          {showHistory ? 'Show Active Orders' : 'Show History'}
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">No orders to display.</p>
      ) : (
        <ul className="space-y-3 md:space-y-4">
          {filteredOrders.map((order, index) => (
            <li key={index} className="bg-white shadow-md p-3 rounded-lg border text-sm md:text-base">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <p className="font-semibold text-base md:text-lg text-red-800">
                    Order {index + 1}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Date: {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <span className={`font-semibold text-xs md:text-sm mt-1 sm:mt-0 ${
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
                className="text-xs md:text-sm text-blue-600 mt-2 underline"
                onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
              >
                {expandedOrderId === order._id ? 'Hide Details' : 'View Details'}
              </button>

              {expandedOrderId === order._id && (
                <div className="mt-3 text-sm">
                  <p className="font-semibold">Customer:</p>
                  <p>{order.firstName} {order.lastName}</p>

                  <p className="mt-2 font-semibold">Address:</p>
                  <p>{order.street}</p>

                  <p className="mt-2 font-semibold">Items:</p>
                  <ul className="list-disc ml-4 text-gray-700 text-xs md:text-sm">
                    {order.items.map((item, i) => (
                      <li key={i} className="break-words pr-2">
                        <span className="block">{item.name}</span>
                        <span className="block text-gray-600">Quantity: {item.quantity}, Price: {item.price} DA</span>
                      </li>
                    ))}
                  </ul>

                  {order.supplements?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">Supplements:</p>
                      <p className="text-xs md:text-sm">{order.supplements.join(", ")}</p>
                    </div>
                  )}

                  <p className="mt-2 text-gray-700 text-xs md:text-sm">Delivery Fee: {order.deliveryFee} DA</p>
                  <p className="text-gray-700 font-bold text-sm md:text-base">Total: {order.total} DA</p>

                  {(order.status === 'pending' || order.status === 'in-progress') && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="mt-3 w-full sm:w-auto px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white text-xs md:text-sm rounded hover:bg-red-600 transition duration-150"
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
