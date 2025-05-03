import React, { useContext, useState } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const CartItem = ({ item, cartItems, addToCart, removeFromCart, handleRemoveClick,  }) => (
  <div key={item.id}>
    <div className="cart-items-title cart-items-item mt-2 text-black mb-2 grid grid-cols-[1fr_1fr_1fr_1.5fr_1fr_0.5fr] items-center text-[18px] font-normal">
      <img className="w-12.5 h-12.5"  src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
     
      <p>{item.name}</p>
      <p>{item.price}</p>
      <div className="food-item-counter flex flex-col md:flex-row items-center gap-2">
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={() => removeFromCart(item._id)}
          src={assets.remove_icon_red}
          alt="Remove item"
        />
        <p className="text-lg font-bold">{cartItems[item._id]}</p>
        
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={() => addToCart(item._id)}
          src={assets.add_icon_green}
          alt="Add item"
        />
      </div>
      <p className="total">{Number(item.price) * cartItems[item._id]} DA</p>
      <p onClick={() => handleRemoveClick(item._id)} className="cross text-2xl cursor-pointer">x</p>
    </div>
    <hr className="h-0.5 text-gray-400" />
  
  </div>
  
);
 

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    deleteFromCart,
    url,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [supplementNote, setSupplementNote] = useState('');

  const handleRemoveClick = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirmPopup(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove !== null) {
      deleteFromCart(itemToRemove); // حذف العنصر نهائيًا
    }
    setShowConfirmPopup(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setShowConfirmPopup(false);
    setItemToRemove(null);
  };

 
  
  return (
    <div className="cart mt-25">
      <div className="cart-item">
        <div className="cart-items-title grid grid-cols-[1fr_1fr_1fr_1.5fr_1fr_0.5fr] items-center text-gray-600 font-bold">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList?.length > 0 ? (
          foodList.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <CartItem
                  key={item._id}
                  item={item}
                  cartItems={cartItems}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  handleRemoveClick={handleRemoveClick}
                />
              );
            }
            return null;
          })
        ) : (
          <p className="mt-4 text-center">Chargement des produits...</p>
        )}
      </div>

      {showConfirmPopup && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="popup bg-white p-6 rounded-xl shadow-md">
            <p className="text-lg font-semibold text-center">Are you sure you want to remove this product?</p>
            <div className="popup-buttons flex justify-center gap-4 mt-4">
              <button onClick={handleConfirmRemove} className="popup-button bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400">
                Yes
              </button>
              <button onClick={handleCancelRemove} className="popup-button bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-200">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      
        
          <div>
            <div className="cart-bottom mt-20 flex justify-between">
            <div className="max-w-md mx-auto mt-22 p-4 bg-white rounded-xl shadow-md">
          <label htmlFor="supplement" className="block text-sm  font-medium text-gray-700 mb-2">
            If you want any supplement, just write it here and give us your opinion
          </label>
          <textarea
            name="supplement"
            id="supplement"
            rows="4"
            placeholder="like pepper or anything.."
            value={supplementNote}
            onChange={(e) => setSupplementNote(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
          
          </div>
        <div className="cart-total mt-8 flex flex-1 flex-col gap-5">
          <h2 className='text-center text-3xl font-semibold '>Cart Totals</h2>
          
            <div className="cart-total-details flex justify-between text-gray-400">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()} DA</p>
            </div>
            <hr />
            <div className="cart-total-details flex justify-between text-gray-400">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 100} DA</p>
            </div>
            <hr />
            <div className="cart-total-details flex justify-between text-gray-800">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100} DA</b>
            </div>
            <button
              onClick={() =>
                navigate('/order', {
                  state: {
                    items: Object.keys(cartItems)
                      .filter((id) => cartItems[id] > 0)
                      .map((id) => {
                        const item = foodList.find((food) => food._id === id);
                        return {
                          _id: item._id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: cartItems[id],
                          total: cartItems[id] * item.price,
                        };
                      }),
                    totalPrice: getTotalCartAmount(),
                    deliveryFee: getTotalCartAmount() === 0 ? 0 : 100,
                    grandTotal: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100,
                    supplementNote,
                  }
                })
              }
              className="cart-total-button bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-400 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          
          
        </div>

        
      </div>
    </div>
  );
};

export default Cart;