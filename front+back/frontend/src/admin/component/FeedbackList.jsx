// components/FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Feedback</h2>
      {reviews.map((review) => (
        <div key={review._id} className="border p-3 mb-2 rounded shadow-sm">
          <p><strong>{review.userId?.name || "Anonymous"}</strong> rated {review.rating}/5</p>
          <p>{review.comment}</p>
          {isAdmin && (
            <button
              onClick={() => deleteReview(review._id)}
              className="text-red-600 text-sm mt-2"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
