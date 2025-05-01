import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Star } from "lucide-react";

const SubmitReviewModal = ({ isOpen, onClose, restaurantId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews/submit", { restaurantId, rating, comment });
      alert("Review submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Submit Review"
    shouldCloseOnOverlayClick={true}
    overlayClassName="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
    className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg outline-none"
  >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Leave a Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
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

          {/* Comment */}
          <div>
            <label className="block text-lg font-medium mb-2">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your feedback..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SubmitReviewModal;
