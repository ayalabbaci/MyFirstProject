import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const FeedbackList = ({ isAdmin }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews/list');
      setReviews(res.data.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const deleteReview = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/reviews/delete/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Customer Feedback</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
            >
              <p>
                <strong>
                  {review.userId?.name || "Anonymous"}
                </strong>{" "}
                rated {review.rating}/5
              </p>
              <p className="text-yellow-600 font-medium">{review.rating} / 5</p>
              <p className="text-gray-700 mt-1">{review.comment}</p>

              
                <p
                  onClick={() => deleteReview(review._id)}
                  className="absolute top-1 -right-0 cursor-pointer text-red-600   transition"
                  title="Delete review"
                >
                  <Trash2 size={20} />
                </p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
