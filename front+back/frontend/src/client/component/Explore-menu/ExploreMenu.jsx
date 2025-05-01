import React, { useRef } from 'react';
import './Em.css';
import { menuliste } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null); // مرجع لعنصر القائمة

  const scrollMenu = (direction) => {
    if (menuRef.current) {
      const scrollAmount = 200; // المسافة التي يتم تحريكها عند الضغط على الزر
      menuRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="explore-menu flex flex-col gap-6" id="explore-menu">
      <h1 className="font-medium text-gray-800 text-3xl mt-10">Explore Menu</h1>
      <p className="max-w-[60%] text-gray-500">
        Choose from a diverse menu featuring a delectable array of pizza.
      </p>
      <div className="relative">
        <div className="explore-menu-liste flex gap-4 text-center my-5 overflow-x-scroll" ref={menuRef}>
          {menuliste.map((item, index) => {
            return (
              <div
                onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
                key={index}
                className="explore-menu-liste-item flex-shrink-0 cursor-pointer"
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={`w-32 h-32 object-cover rounded-full ${category === item.menu_name ? 'active' : ''}`}
                />
                <p className="text-gray-700 font-bold mt-0.5 cursor-pointer">{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        {/* أزرار التمرير */}
        <button
          onClick={() => scrollMenu('left')}
          className="absolute left-0 top-0 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full"
        >
          &#60; {/* السهم الأيسر */}
        </button>
        <button
          onClick={() => scrollMenu('right')}
          className="absolute right-0 top-0 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full"
        >
          &#62; {/* السهم الأيمن */}
        </button>
      </div>
      <hr className="my-2.5 mt-2.5 mb-2.5 h-0.5 bg-gray-200 border-none" />
    </div>
  );
};

export default ExploreMenu;
