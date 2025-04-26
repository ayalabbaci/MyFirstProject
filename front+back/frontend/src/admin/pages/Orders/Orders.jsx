import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifyClient, setNotifyClient] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:4000/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
      setError('Failed to load orders.');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, orderId) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: 'Delete Order?',
      text: 'Are you sure you want to delete this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/orders/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(prev => prev.filter(order => order._id !== orderId));
      if (selectedOrder?._id === orderId) setSelectedOrder(null);
      toast.success('Order deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Error while deleting order');
    }
  };

  const handleChangeStatus = async (e, orderId, status) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: 'Change Status?',
      text: `Are you sure you want to change the status to "${status}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/api/orders/update-status/${orderId}`,
        { status, notifyClient },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(prev => prev.map(order => order._id === orderId ? { ...order, status } : order));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status }));
      }
      toast.success(`Order status updated to "${status}"${notifyClient ? ' and client notified' : ''}`);
    } catch (err) {
      console.error(err);
      toast.error('Error while updating status');
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-red-600">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Order Details Section */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow p-6 h-full">
            {selectedOrder ? (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h2>
                <OrderDetails order={selectedOrder} />
                <OrderStatusChanger
                  order={selectedOrder}
                  notifyClient={notifyClient}
                  setNotifyClient={setNotifyClient}
                  handleChangeStatus={handleChangeStatus}
                />
              </>
            ) : (
              <p className="text-gray-500 text-center">Select an order to view details</p>
            )}
          </div>
        </div>

        {/* Orders Table Section */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">All Orders</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader text="Customer" />
                  <TableHeader text="Total" />
                  <TableHeader text="Delivery Fee" />
                  <TableHeader text="Status" />
                  <TableHeader text="Actions" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr
                      key={order._id}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedOrder?._id === order._id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4">{order.firstName} {order.lastName}</td>
                      <td className="px-6 py-4">{order.total} DA</td>
                      <td className="px-6 py-4">{order.deliveryFee} DA</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={(e) => handleDelete(e, order._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

const OrderDetails = ({ order }) => (
  <>
    <div className="mb-6 space-y-2 text-sm text-gray-600">
      <p><span className="font-medium">Customer:</span> {order.firstName} {order.lastName}</p>
      <p><span className="font-medium">Phone:</span> {order.phone}</p>
      <p><span className="font-medium">Address:</span> {order.street}</p>
      <p><span className="font-medium">Total:</span> {order.total} DA</p>
      <p><span className="font-medium">Delivery Fee:</span> {order.deliveryFee} DA</p>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Items:</h3>
      <div className="space-y-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium text-gray-800">{item.name}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{item.quantity} × {item.price} DA</span>
              <span>Total: {item.total} DA</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const OrderStatusChanger = ({ order, notifyClient, setNotifyClient, handleChangeStatus }) => {
  const [newStatus, setNewStatus] = useState(order.status || 'pending');

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Change Status</h3>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>

      <div className="flex items-center my-4">
        <input
          type="checkbox"
          id="notifyClient"
          checked={notifyClient}
          onChange={(e) => setNotifyClient(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="notifyClient" className="ml-2 block text-sm text-gray-700">
          Notify client about status change
        </label>
      </div>

      <button
        onClick={(e) => handleChangeStatus(e, order._id, newStatus)}
        className="w-full py-2 px-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Update Status
      </button>
    </div>
  );
};

const TableHeader = ({ text }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {text}
  </th>
);

export default Orders;
