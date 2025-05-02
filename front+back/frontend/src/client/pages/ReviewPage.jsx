import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SubmitReviewModal from '../component/Review/SubmitReview';
import logo from '../assets/logo.png'; // المسار الصحيح هنا

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const { id: restaurantId } = useParams();

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/list?restaurantId=${restaurantId}`);
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [restaurantId]);

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Reviews for Restaurant</h1>

      <SubmitReviewModal restaurantId={restaurantId} onSuccess={fetchReviews} isOpen={false} onClose={() => {}} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews:</h2>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <img
                  src={logo} // صورة البيتزا التي تم استيرادها من المسار الصحيح
                  alt="Pizza"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold text-sm">
                    {review.userId.name}
                    {review.userId.role === 'admin' && (
                      <span className="ml-2 text-sm text-blue-600">this is the admin</span> // إضافة النص إذا كان المستخدم Admin
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>
                  <p className="text-sm">{review.comment}</p>
                  <span className="text-sm text-yellow-500">{review.rating} / 5</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
