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
export const getAllOrders = async (req, res) => {console.log("✅ getAllOrders function started");
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching orders', error: error.message });
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
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId; // الحصول على orderId من المسار
    const { status } = req.body; // استخراج الحالة الجديدة من البودي

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // يرجع النسخة المحدّثة بعد التحديث
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }

    res.status(200).json({ success: true, message: "تم تحديث حالة الطلب بنجاح", order: updatedOrder });
  } catch (error) {
    console.error("❌ Error in updating order status:", error);
    res.status(500).json({ success: false, message: "فشل في تحديث حالة الطلب", error: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId; // الحصول على orderId من المسار

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }

    res.status(200).json({ success: true, message: "تم حذف الطلب بنجاح", order: deletedOrder });
  } catch (error) {
    console.error("❌ Error in deleting order:", error);
    res.status(500).json({ success: false, message: "فشل في حذف الطلب", error: error.message });
  }
};