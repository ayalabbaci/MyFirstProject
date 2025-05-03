import UserModel from "../models/UserModel.js";
import FoodModel from "../models/FoodModel.js"; // تم تصحيح المسار

// Add items to user cart
const addToCart = async (req, res) => {
  let userData = await UserModel.findById(req.body.userId);
  let cartData = userData.cartData || {};

  if (!cartData[req.body.itemId]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] += 1;
  }

  await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
  res.json({ success: true, message: "Added To Cart" });
};

// Remove item from cart (decrease quantity by 1)
const removeFromCart = async (req, res) => {
  let userData = await UserModel.findById(req.body.userId); // استخدمنا req.body.userId هنا مثل addToCart
  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const cartData = userData.cartData || {};
  const foodId = req.body.foodId; // نحصل على foodId من body مثل itemId

  if (!cartData[foodId] || cartData[foodId] < 1) {
    return res.status(404).json({
      success: false,
      message: "Item not found in cart"
    });
  }

  if (cartData[foodId] <= 1) {
    delete cartData[foodId];
  } else {
    cartData[foodId] -= 1;
  }

  await UserModel.findByIdAndUpdate(req.body.userId, { cartData });

  return res.status(200).json({
    success: true,
    message: "Item quantity decreased",
    data: cartData
  });
};

// Delete item completely from cart
const deleteFromCart = async (req, res) => {
  let userData = await UserModel.findById(req.body.userId); // استخدمنا req.body.userId هنا مثل addToCart
  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const cartData = userData.cartData || {};
  const foodId = req.body.foodId; // نحصل على foodId من body مثل itemId

  if (!cartData[foodId]) {
    return res.status(404).json({
      success: false,
      message: "Item not found in cart"
    });
  }

  delete cartData[foodId];

  await UserModel.findByIdAndUpdate(req.body.userId, { cartData });

  return res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
    data: cartData
  });
};

// Get user's cart with populated food details
const getCart = async (req, res) => {
  const { userId } = req.body;

  const userData = await UserModel.findById(userId);
  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const cartData = userData.cartData || {};
  const foodIds = Object.keys(cartData);

  if (foodIds.length === 0) {
    return res.status(200).json({
      success: true,
      data: {
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        total: 0
      }
    });
  }

  const foodItems = await FoodModel.find({ _id: { $in: foodIds } });

  const items = foodItems.map(food => ({
    food,
    quantity: cartData[food._id.toString()]
  }));

  let subtotal = 0;
  items.forEach(item => {
    subtotal += Number(item.food.price) * item.quantity;
  });

  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  return res.status(200).json({
    success: true,
    data: {
      items,
      subtotal,
      deliveryFee,
      total
    }
  });
};

export { addToCart, removeFromCart, deleteFromCart, getCart };