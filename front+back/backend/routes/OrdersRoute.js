import authMiddleware from '../middleware/auth.js'; // استيراد باستخدام import default
import express from 'express'; 
import { createOrder, getOrdersByUserId, getAllOrders } from '../controllers/ordersController.js';

const router = express.Router();

// 🔘 إنشاء طلب جديد
router.post('/create', authMiddleware, createOrder);

// 🔘 جلب الطلبات حسب المستخدم
router.get('/:userId', authMiddleware, getOrdersByUserId);

// 🔘 جلب كل الطلبات
router.get('/all', authMiddleware, getAllOrders);

export default router;
