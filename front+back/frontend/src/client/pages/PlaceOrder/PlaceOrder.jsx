import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import Swal from "sweetalert2";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items, totalPrice, deliveryFee, grandTotal, supplementNote } = location.state;
  const { userEmail, userId } = useContext(StoreContext);

  const [street, setStreet] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddressFromCoords = async (lat, lon) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: "json",
          lat,
          lon,
        },
      });
      const street = response.data.display_name;
      setStreet(street);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while fetching your address.',
      });
    }
  };

  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoords(latitude, longitude);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Location Error',
            text: 'Failed to access your location.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Unsupported',
        text: 'Geolocation is not supported by your browser.',
      });
    }
  };

  const handleProceedToCheckout = () => {
    if (!firstName || !lastName || !street || !phone) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill all fields before submitting your order.',
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        firstName,
        lastName,
        phone,
        street,
        total: grandTotal,
        deliveryFee,
        supplements: supplementNote?.split(",").map((s) => s.trim()) || [],
        items,
      };

      if (userId && userId.trim && userId.trim() !== "") {
        orderData.userId = userId;
      }

      const response = await axios.post(
        "/api/orders/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setShowConfirmModal(false);
        navigate("/orders", {
          state: {
            successMessage: "✅ Your order has been successfully placed! Payment will be on delivery.",
          },
        });
      } else {
        setShowConfirmModal(false);
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: 'Failed to place order: ' + response.data.message,
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setShowConfirmModal(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while placing your order. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="place-order flex items-start justify-between mt-25 gap-12.5">
        <div className="place-order-left w-full">
          <p className="title text-xl md:text-3xl font-medium mb-6 md:mb-8">Delivery Information</p>

          <div className="multi-fields">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            📍 Use my current location
          </button>

          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="place-order-right w-full">
          <div className="cart-total flex flex-1 flex-col gap-5">
            <h2 className="text-3xl font-medium mb-2">Cart Totals</h2>

            <div className="order-items">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">{item.price} DA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>

            <div className="order-summary">
              <p><b>Supplement Note:</b> {supplementNote}</p>
              <div className="cart-total-details flex justify-between text-gray-400">
                <p>Subtotal</p>
                <p>{totalPrice} DA</p>
              </div>
              <hr />

              <div className="cart-total-details flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>{deliveryFee} DA</p>
              </div>
              <hr />

              <div className="cart-total-details flex justify-between text-gray-800">
                <b>Total</b>
                <b>{grandTotal} DA</b>
              </div>
            </div>

            <button type="button" className="cart-total-button" onClick={handleProceedToCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </form>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="confirm-modal-header">
              <h3>Order Confirmation</h3>
            </div>
            <div className="confirm-modal-body">
              <p>Are you sure you want to place this order?</p>
              <div className="order-summary-modal">
                <p>Total Amount: <b>{grandTotal} DA</b></p>
                <p>Address: {street}</p>
              </div>
              <p className="text-xl text-lime-500">The payment is cash</p>
            </div>
            <div className="confirm-modal-footer">
              <button
                className="cancel-button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="confirm-button"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
