import Order from "../models/OrdersModel.js";

// ✅ إنشاء طلب جديد
export const createOrder = async (req, res) => {
  try {
    const userIdFromToken = req.user.id; // استخراج userId من التوكن (موجود في الميدلوير)
    const { firstName, lastName, phone, street, total, deliveryFee, supplements, items } = req.body;
    
    const newOrder = new Order({
      userId: userIdFromToken,
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
  console.log("✅ getAllOrders function started");
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
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "فشل في جلب الطلبات", error: error.message });
  }
};

// ✅ تحديث حالة الطلب (تم تعديله هنا)
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const userIdFromToken = req.user.id;
    const userRole = req.user.role; // تأكد أن الميدلوير يضيف الدور في التوكن

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }

    // 🔒 السماح فقط للعميل الذي أنشأ الطلب أو الأدمن
    if (userRole !== 'admin' && order.userId.toString() !== userIdFromToken) {
      return res.status(403).json({ success: false, message: "ليس لديك صلاحية تعديل هذا الطلب" });
    }

    // ⛔️ منع التعديل إذا كانت الحالة مكتملة أو ملغاة
    if (order.status === 'completed' || order.status === 'canceled') {
      return res.status(400).json({ success: false, message: `لا يمكن تعديل الطلب وهو في حالة '${order.status}'` });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({ success: true, message: "تم تحديث حالة الطلب بنجاح", order: updatedOrder });
  } catch (error) {
    console.error("❌ Error in updating order status:", error);
    res.status(500).json({ success: false, message: "فشل في تحديث حالة الطلب", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
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
