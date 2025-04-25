import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);
    
    // Assurez-vous que l'ID est défini
    const itemId = id || ''; // Ou utilisez une valeur par défaut si 'id' est indéfini
    
    // Vérification de l'existence de l'élément dans le panier
    const cartQuantity = cartItems[itemId] || 0; // Utilise 0 si l'élément n'existe pas dans le panier
   
    return (
        <div className='food-item-container w-full h-full flex flex-col'>
            <div className='food-item w-full shadow-lg animate-fadeIn rounded-2xl relative'>
                <img 
                    src={url + "/images/" + image} 
                    alt={name} 
                    className='w-full h-48 object-cover rounded-t-2xl' 
                />
                
                {!cartQuantity ? (
                    <img 
                        className='w-8 h-8 absolute bottom-2 right-2 cursor-pointer bg-green-500 p-1 rounded-full' 
                        onClick={() => addToCart(itemId)}
                        src={assets.add_icon_white} 
                        alt="Add item"
                    />
                ) : (
                    <div className='food-item-counter absolute bottom-2 right-2 bg-red-100 p-1 rounded-full flex items-center gap-2'>
                        <img 
                            className='w-6 h-6 cursor-pointer'
                            onClick={() => removeFromCart(itemId)} 
                            src={assets.remove_icon_red} 
                            alt="Remove item"
                        />
                        <p className='text-lg font-bold'>{cartQuantity}</p>
                        <img 
                            className='w-6 h-6 cursor-pointer'
                            onClick={() => addToCart(itemId)} 
                            src={assets.add_icon_green} 
                            alt="Add item"
                        />
                    </div>
                )}
                
                <div className='food-item-info flex flex-col gap-2 p-3 bg-white rounded-b-2xl'>
                    <div className='flex justify-between items-center'>
                        <p className='text-lg font-bold'>{name}</p>
                        <img className='w-20' src={assets.rating_starts} alt="Rating" />
                    </div>
                    <p className="food-item-desc text-sm text-gray-600">{description}</p>
                    <p className="food-item-price text-xl font-medium text-red-400">{price}DA</p>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
