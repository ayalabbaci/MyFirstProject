import Order from "../models/OrdersModel.js";

// ✅ إنشاء طلب جديد
export const createOrder = async (req, res) => {
  try {
    const userIdFromToken = req.user.id; // استخراج userId من التوكن (موجود في الميدلوير)
    const newOrder = new Order({
      ...req.body,
      userId: userIdFromToken, // استخدام الـ userId من التوكن
    });

    await newOrder.save();
    res.status(201).json({ message: "تم إنشاء الطلب بنجاح", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "فشل في إنشاء الطلب", error: error.message });
  }
};

// ✅ جلب الطلبات الخاصة بمستخدم معين
export const getOrdersByUserId = async (req, res) => {
  try {
    const userIdFromToken = req.user.id; // استخراج userId من التوكن
    const orders = await Order.find({ userId: userIdFromToken }); // جلب الطلبات باستخدام الـ userId من التوكن
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الطلبات", error: error.message });
  }
};

// ✅ جلب كل الطلبات (مفيدة للأدمن)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب كل الطلبات", error: error.message });
  }
};
