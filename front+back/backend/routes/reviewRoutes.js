// routes/reviewRoutes.js
import express from 'express';
import { submitReview, getReviews } from '../controllers/reviewController.js';

const rRouter = express.Router();

// مسار إرسال التقييم
rRouter.post('/submit', submitReview);

// مسار عرض التقييمات
rRouter.get('/list', getReviews);

export default rRouter;
