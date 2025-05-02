// controllers/reviewController.js
import Review from '../models/Review.js';

export const submitReview = async (req, res) => {
  const { restaurantId, userId, rating, comment } = req.body;

  // التحقق من وجود جميع الحقول المطلوبة
  if (!restaurantId || !userId || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // التحقق من صحة التقييم
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
  }

  try {
    // إنشاء التقييم الجديد
    const newReview = new Review({
      restaurantId,
      userId,  // استخدام userId من البيانات الواردة
      rating,
      comment,
    });

    // حفظ التقييم في قاعدة البيانات
    await newReview.save();
    res.json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit review',
      error: error.message,  // إضافة رسالة الخطأ
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('restaurantId', 'name role') // لجلب اسم المطعم فقط
      .populate('userId', 'name role'); // لجلب اسم المستخدم فقط

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
