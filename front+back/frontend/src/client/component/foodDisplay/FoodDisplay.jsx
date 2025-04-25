import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({ category }) {
  const { foodList } = useContext(StoreContext);

  return (
    <div id="food-display" className="mt-8">
      <h1 className="text-2xl font-medium text-gray-800">Top pizza near you!!</h1>
      <div className="food-display-list grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 mt-6 gap-x-10">
        {foodList && foodList.length > 0 ? (
          foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null; // Ensure a return statement for items that don't match the condition
          })
        ) : (
          <p>Chargement des produits...</p>
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;