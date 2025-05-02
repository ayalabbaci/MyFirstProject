import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/list?restaurantId=${restaurantId}`);
        setReviews(response.data.data);
      } catch (error) {
   
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id}>
            <p>Rating: {review.rating} / 5</p>
            <p>Comment: {review.comment || 'No comment provided.'}</p>
            <p>Reviewed on: {new Date(review.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
