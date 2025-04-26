import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders/all');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);  // Clear selected order if it's deleted
      }
    } catch (err) {
      alert('Error deleting order');
    }
  };

  const handleChangeStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:4000/api/orders/${orderId}`, { status });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status }); // Update selected order status
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Orders</h1>

      <div className="orders-list">
        <h2>All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Total</th>
                <th>Delivery Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.firstName} {order.lastName}</td>
                  <td>{order.total} DA</td>
                  <td>{order.deliveryFee} DA</td>
                  <td>{order.status || 'Pending'}</td>
                  <td>
                    <button onClick={() => handleSelectOrder(order)}>View Details</button>
                    <button onClick={() => handleDelete(order._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p><strong>Customer:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
          <p><strong>Phone:</strong> {selectedOrder.phone}</p>
          <p><strong>Address:</strong> {selectedOrder.street}</p>
          <p><strong>Total:</strong> {selectedOrder.total} DA</p>
          <p><strong>Delivery Fee:</strong> {selectedOrder.deliveryFee} DA</p>
          <p><strong>Status:</strong> {selectedOrder.status || 'Pending'}</p>

          <h3>Items:</h3>
          <ul>
            {selectedOrder.items.map((item, index) => (
              <li key={index}>
                <p>{item.name} - {item.quantity} x {item.price} DA</p>
                <p>Total: {item.total} DA</p>
              </li>
            ))}
          </ul>

          <h3>Change Order Status</h3>
          <select
            value={selectedOrder.status || 'pending'}
            onChange={(e) => handleChangeStatus(selectedOrder._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default orders;
