import express from 'express';
import { submitReview, getReviews, deleteReview } from '../controllers/reviewController.js';

const rRouter = express.Router();

// إرسال تقييم
rRouter.post('/submit', submitReview);

// عرض كل التقييمات
rRouter.get('/list', getReviews);

// حذف تقييم حسب ID (مخصص للأدمن فقط)
rRouter.delete('/delete/:id', deleteReview);

export default rRouter;
