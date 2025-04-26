import Order from "../models/OrdersModel.js";

// ✅ إنشاء طلب جديد
export const createOrder = async (req, res) => {
  try {
    const userIdFromToken = req.user.id; // استخراج userId من التوكن (موجود في الميدلوير)
    const { firstName, lastName, phone, street, total, deliveryFee, supplements, items } = req.body;
    
    const newOrder = new Order({
      userId: userIdFromToken, // استخدام الـ userId من التوكن
      firstName,
      lastName,
      phone,
      street,
      total,
      deliveryFee,
      supplements,
      items,
    });

    await newOrder.save();

    console.log("✅ Received new order:", newOrder);
    res.status(201).json({ success: true, message: "تم إنشاء الطلب بنجاح", order: newOrder });
  } catch (error) {
    console.error("❌ Error in server:", error);
    res.status(500).json({ success: false, message: "فشل في إنشاء الطلب", error: error.message });
  }
};

// ✅ جلب جميع الطلبات
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();  // جلب جميع الطلبات
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "فشل في جلب الطلبات", error: error.message });
  }
};

// ✅ جلب الطلبات بناءً على الـ userId
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;  // الحصول على الـ userId من المسار
    const orders = await Order.find({ userId });  // جلب الطلبات الخاصة بالمستخدم
    res.status(200).json({ success: true, orders });  // إرسال الطلبات في الاستجابة
  } catch (error) {
    res.status(500).json({ success: false, message: "فشل في جلب الطلبات", error: error.message });
  }
};
