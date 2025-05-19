import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Swal from 'sweetalert2';

const SubmitReviewModal = ({ restaurantId, onSuccess, isOpen, onClose }) => {
  const { userId } = useContext(StoreContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ التحقق من تسجيل الدخول
    if (!userId) {
      return Swal.fire({
        icon: 'warning',
        title: 'You need to log in',
        text: 'Please log in to submit a review.',
        confirmButtonColor: '#ef4444'
      });
    }

    // ✅ التحقق من وجود تقييم وتعليق
    if (rating === 0 || comment.trim() === "") {
      return Swal.fire({
        icon: 'warning',
        title: 'Incomplete review',
        text: 'Please give a rating and write a comment before submitting.',
        confirmButtonColor: '#ef4444'
      });
    }

    try {
      const reviewData = { restaurantId, userId, rating, comment };
      const response = await axios.post("/api/reviews/submit", reviewData);

      await Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your review has been submitted.',
        confirmButtonColor: '#ef4444'
      });

      setRating(0);
      setComment("");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Error submitting review:", err.response ? err.response.data : err);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Something went wrong while submitting your review.',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Submit Review"
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg outline-none"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-3xl text-gray-800 text-center font-semibold mb-4">Leave a Review</h2>
        <div className="flex justify-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={32}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              className={`cursor-pointer transition-colors ${
                (hoverRating || rating) >= n ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={(hoverRating || rating) >= n ? "currentColor" : "none"}
            />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          rows="4"
          placeholder="Write your comment..."
        />

        <div className="flex justify-end gap-4">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Submit
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <Link to={`/reviews/${restaurantId}`} className="text-red-500">
          View all reviews
        </Link>
      </div>
    </Modal>
  );
};

export default SubmitReviewModal;
