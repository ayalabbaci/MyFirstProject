import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Content from './src/client/component/content/Content';
import ExploreMenu from './src/client/component/Explore-menu/ExploreMenu';
import FoodDisplay from './src/client/component/foodDisplay/FoodDisplay';
import AppDownload from './src/client/component/AppDownload/AppDownload';
import LoginPopop from './src/client/component/LoginPopPop/LoginPopop.jsx';
import Footer from './src/client/component/Footer.jsx';

const HomePage = ({ showLogin, setShowLogin }) => {
  const [category, setCategory] = React.useState('All');

  return (
    <div className='home'>
      {showLogin && <LoginPopop setShowLogin={setShowLogin} />}
      <Content />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default HomePage;
