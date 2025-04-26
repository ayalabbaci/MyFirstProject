import authMiddleware from '../middleware/auth.js'; // استيراد باستخدام import default
import express from 'express'; 
import { createOrder, getOrdersByUserId, getAllOrders, updateOrderStatus, deleteOrder } from '../controllers/ordersController.js';

const router = express.Router();

// 🔘 إنشاء طلب جديد
router.post('/create', authMiddleware, createOrder);

// 🔘 جلب كل الطلبات
router.get('/all', authMiddleware, getAllOrders);

// 🔘 جلب الطلبات حسب المستخدم
router.get('/:userId', authMiddleware, getOrdersByUserId);


// 🔘 حذف طلب
router.delete('/delete/:orderId', authMiddleware, deleteOrder);

router.put('/update-status/:orderId', authMiddleware, updateOrderStatus);


export default router;
