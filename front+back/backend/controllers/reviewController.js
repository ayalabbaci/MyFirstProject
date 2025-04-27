// controllers/reviewController.js
import Review from '../models/Review.js';

export const submitReview = async (req, res) => {
  const { restaurantId, rating, comment } = req.body;

  try {
    // إضافة التقييم
    const newReview = new Review({
      restaurantId,
      rating,
      comment,
    });

    await newReview.save();
    res.json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
};

export const getReviews = async (req, res) => {
  try {
    // استرجاع التقييمات
    const reviews = await Review.find().populate('restaurantId');
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};
