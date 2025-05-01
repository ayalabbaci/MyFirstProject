// ReviewPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  SubmitReviewModal  from '../component/Review/SubmitReview'; // تأكد من المسار الصحيح للنموذج

const ReviewPage = ({ match }) => {
  const [reviews, setReviews] = useState([]);
  const restaurantId = match.params.id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/list?restaurantId=${restaurantId}`);
        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  return (
    <div>
      <h1>Reviews for Restaurant</h1>

      <SubmitReviewModal restaurantId={restaurantId} />

      <div>
        <h2>Customer Reviews:</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
