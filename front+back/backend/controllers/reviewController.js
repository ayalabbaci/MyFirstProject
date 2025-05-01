// controllers/reviewController.js
import Review from '../models/Review.js';

export const submitReview = async (req, res) => {
  const { restaurantId, userId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      restaurantId,
      userId,
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
    const reviews = await Review.find()
      .populate('restaurantId', 'name') // لجلب اسم المطعم فقط
      .populate('userId', 'name'); // لجلب اسم المستخدم فقط

    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};

// ✅ حذف التقييم (للأدمن فقط)
export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    await Review.findByIdAndDelete(id);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
};
