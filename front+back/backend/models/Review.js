// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant', // أو 'Food' إذا كان التقييم خاصًا بمنتج معين
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
