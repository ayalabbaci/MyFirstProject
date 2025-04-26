import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  _id: false, // هذا مهم! يمنع Mongoose من محاولة إنشاء _id تلقائي
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  total: { type: Number, required: true }, // أضف total لو تبغى تحفظه
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // تأكد من أنه مكتوب بنفس اسم موديل المستخدم
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
  supplements: { type: [String], default: [] },
  total: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  street: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
