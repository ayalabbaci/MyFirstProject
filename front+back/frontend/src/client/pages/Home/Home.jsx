import React from 'react'
import Content from '../../component/content/Content'
import ExploreMenu from '../../component/Explore-menu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../component/foodDisplay/FoodDisplay'
import AppDownload from '../../component/AppDownload/AppDownload'
import './Home.css'
const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <div className='home'>
     <Content /> 
     <ExploreMenu category={category} setCategory={setCategory} />
     <FoodDisplay category={category} />
     <AppDownload />
    </div>
  )
}

export default Home
