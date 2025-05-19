import React, { useState } from 'react';
import Content from './src/client/component/content/Content';
import FoodDisplay from './src/client/component/foodDisplay/FoodDisplay';
import AppDownload from './src/client/component/AppDownload/AppDownload';
import LoginPopop from './src/client/component/LoginPopPop/LoginPopop.jsx';
import Footer from './src/client/component/Footer.jsx';
import SubmitReviewModal from './src/client/component/Review/SubmitReview';
import ExploreMenu from './src/client/component/Explore-menu/ExploreMenu';
import './home.css';

// استيراد أيقونة من lucide-react
import { MessageCirclePlus } from 'lucide-react';

const HomePage = ({ showLogin, setShowLogin }) => {
  const [category, setCategory] = useState('All');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const restaurantId = "sampleRestaurantId"; // يمكنك تغييره لاحقًا حسب بياناتك

  return (
    <div className="home relative">
      {showLogin && <LoginPopop setShowLogin={setShowLogin} />}

      <Content />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      <Footer className="footer"/>

      {showReviewModal && (
        <SubmitReviewModal 
          isOpen={showReviewModal} 
          onClose={() => setShowReviewModal(false)} 
          restaurantId={restaurantId} 
        />
      )}

      {/* زر إضافة مراجعة بشكل أيقونة دائرية على الجانب الأيمن في الأسفل */}
      <div className="fixed bottom-10 right-16 z-50">
        <button
          onClick={() => setShowReviewModal(true)}
          title="Ajouter un avis"
          className="bg-amber-700 hover:bg-red-600 text-white p-4
           rounded-full shadow-lg transition-all flex items-center justify-center"
        >
          <MessageCirclePlus size={30} />
        </button>
      </div>
    </div>
  );
};

export default HomePage;