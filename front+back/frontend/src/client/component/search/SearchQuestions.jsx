import React, { useState } from 'react';

const SearchQuestions = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showWhyPizza, setShowWhyPizza] = useState(false);
  
  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
    // Close other dialogs if open
    if (showMap) setShowMap(false);
    if (showWhyPizza) setShowWhyPizza(false);
  };
  
  const handleLocationClick = () => {
    setShowMap(true);
    setShowQuestions(false);
    setShowWhyPizza(false);
  };
  
  
  
  const handleWhyPizzaClick = () => {
    setShowWhyPizza(true);
    setShowQuestions(false);
    setShowMap(false);
  };
  
  const closePopup = () => {
    setShowMap(false);
    setShowWhyPizza(false);
  };
  
  return (
    <div className="relative">
      <div 
        onClick={toggleQuestions}
        className="cursor-pointer text-gray-700 hover:text-red-600 transition-colors"
      >
        <i className="fa-solid fa-magnifying-glass text-xl"></i>
      </div>
      
      {/* Questions dropdown - Right aligned */}
      {showQuestions && (
        <div className="absolute top-10 right-0 w-64 bg-white shadow-lg rounded-lg p-4 z-10 border border-gray-200">
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Common Questions:</h3>
            <ol className="list-decimal pl-5">
              <li 
                className="mb-2 cursor-pointer hover:text-red-600 transition-colors"
                onClick={handleLocationClick}
              >
                Where is our location?
              </li>
             
              <li 
                className="mb-2 cursor-pointer hover:text-red-600 transition-colors"
                onClick={handleWhyPizzaClick}
              >
                Why did we choose pizza as our specialty?
              </li>
            </ol>
          </div>
          <button 
            onClick={toggleQuestions}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
          >
            Close
          </button>
        </div>
      )}
      
      {/* Map Popup - Right aligned on small screens */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex sm:items-center justify-end sm:justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full sm:w-auto sm:max-w-2xl h-full sm:h-auto sm:max-h-full overflow-y-auto">
            <h3 className="font-bold text-xl mb-4 text-center">Our Location</h3>
            <div className="map-container h-48 sm:h-64 md:h-72 mb-4 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789012345678!2d-122.08547127889278!3d37.42199987942619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI1JzE5LjIiTiAxMjLCsDA1JzA3LjciVw!5e0!3m2!1sen!2sus!4v1617994205284!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Pizzeria Location"
              ></iframe>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-2 py-1 rounded-full shadow-lg">
                <span className="text-xs sm:text-sm font-bold">Pizzeria</span>
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="font-medium text-sm sm:text-base">Address: 123 Pizza Street, Food City, FC 12345</p>
              <p className="text-xs sm:text-sm">Opening Hours: 11:00 AM - 10:00 PM (Mon-Sun)</p>
            </div>
            <button 
              onClick={closePopup}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      
      
      {/* Why Pizza Popup - Right aligned on small screens */}
      {showWhyPizza && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex sm:items-center justify-end sm:justify-center z-50">
          <div className="bg-white rounded-lg p-3 sm:p-4 w-full sm:w-auto sm:max-w-2xl h-full sm:h-auto sm:max-h-full overflow-y-auto">
            <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-center">Why We Chose Pizza As Our Specialty</h3>
            
            <div className="mb-3 sm:mb-4 space-y-3 sm:space-y-4">
              <div className="border-l-4 border-red-600 pl-2 sm:pl-4">
                <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-800">A Family Tradition</h4>
                <p className="text-gray-700 text-xs sm:text-sm">Our journey began three generations ago in Naples, Italy. Our great-grandfather perfected his pizza recipe during the 1930s, using techniques that we still honor today.</p>
              </div>
              
              <div className="border-l-4 border-red-600 pl-2 sm:pl-4">
                <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-800">Community Connection</h4>
                <p className="text-gray-700 text-xs sm:text-sm">Pizza brings people together. It's the centerpiece of family gatherings, celebrations, and casual get-togethers. We believe that by creating exceptional pizzas, we're not just serving food—we're creating memories.</p>
              </div>
              
              <div className="border-l-4 border-red-600 pl-2 sm:pl-4">
                <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-800">Culinary Canvas</h4>
                <p className="text-gray-700 text-xs sm:text-sm">Pizza provides an incredible canvas for culinary creativity. While honoring traditional methods, we also love to innovate with seasonal ingredients and international flavors.</p>
              </div>
              
              <div className="border-l-4 border-red-600 pl-2 sm:pl-4">
                <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-800">Artisanal Excellence</h4>
                <p className="text-gray-700 text-xs sm:text-sm">From our 48-hour fermented dough to our house-made sauces and carefully selected toppings, we approach every element with passion and precision.</p>
              </div>
            </div>
            
            <div className="text-center italic text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4">
              "We don't just make pizza. We craft experiences, one slice at a time."
            </div>
            
            <button 
              onClick={closePopup}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-1 sm:py-2 px-4 rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchQuestions;