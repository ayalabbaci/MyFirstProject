import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const location = useLocation();
  const { items, totalPrice, deliveryFee, grandTotal, supplementNote } = location.state;

  const { getTotalCartAmount, userEmail, userId } = useContext(StoreContext);

  const [street, setStreet] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Function to fetch address from coordinates
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
      alert("Something went wrong while fetching your address.");
    }
  };

  // Handle using the user's current location
  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Could not get location:", error);
          alert("Failed to access your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Send order confirmation email
  const sendOrderConfirmationEmail = async () => {
    try {
      await axios.post("/send-order-confirmation", {
        email: userEmail,
        orderDetails: {
          firstName,
          lastName,
          street,
          phone,
          totalAmount: grandTotal,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!firstName || !lastName || !street || !phone) {
      alert("Please fill in all the fields before placing your order.");
      return;
    }

    try {
      const response = await axios.post("/api/orders/create", {
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

      if (response.data.success) {
        sendOrderConfirmationEmail();
        setOrderSuccess(true);  // Show success modal
      } else {
        alert("Failed to place order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
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

            <button type="button" className="cart-total-button" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </form>

      {orderSuccess && (
        <div className="order-modal">
          <div className="modal-content">
            <p>Your order has been received!</p>
            <p>Payment will be made upon delivery.</p>
            <button onClick={() => setOrderSuccess(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
