import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifyClient, setNotifyClient] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredOrders(
        orders.filter(order => order.status !== 'completed' && order.status !== 'canceled')
      );
    } else if (filterStatus === 'history') {
      setFilteredOrders(orders.filter(order => order.status === 'completed'));
    } else {
      setFilteredOrders(orders.filter(order => order.status === filterStatus));
    }
  }, [orders, filterStatus]);

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

      setOrders(prev => {
        const updated = prev.map(order => order._id === orderId ? { ...order, status } : order);
        if ((status === 'completed' && filterStatus !== 'history') || (status === 'canceled' && filterStatus !== 'canceled')) {
          return updated.filter(order => order._id !== orderId);
        }
        return updated;
      });

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

  const renderFilterButtons = () => {
    const statuses = ['all', 'pending', 'in-progress', 'completed', 'canceled'];
    return (
      <div className="mb-6 flex items-center space-x-4">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              filterStatus === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-lg text-gray-700">Loading...</p></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen"><p className="text-lg text-red-600">{error}</p></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <button
          onClick={() => setFilterStatus('history')}
          className={`px-4 py-2 rounded-lg text-red-500 text-sm font-medium border ${
            filterStatus === 'history' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          History
        </button>
      </div>

      {renderFilterButtons()}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">All Orders</h2>
            {filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div
                    key={order._id}
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer border p-4 rounded-md hover:bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{order.firstName} {order.lastName}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-start">
                        <p className="text-gray-500 text-sm">
                          Date: {new Date(order.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {selectedOrder && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <OrderDetails order={selectedOrder} />
              <OrderStatusChanger
                order={selectedOrder}
                notifyClient={notifyClient}
                setNotifyClient={setNotifyClient}
                handleChangeStatus={handleChangeStatus}
              />
            </div>
          )}
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
      <p><span className="font-medium">Order Date:</span> {new Date(order.date).toLocaleString()}</p>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Items:</h3>
      <div className="space-y-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium">{item.name}</p>
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
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Update Status
      </button>
    </div>
  );
};

export default Orders;
