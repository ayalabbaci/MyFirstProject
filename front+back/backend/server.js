import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import cartRouter from './routes/cartRoute.js';
import router from './routes/OrdersRoute.js'; // ✅ تأكدت أن اسم الملف مطابق تمامًا

import 'dotenv/config';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Static folder to serve uploaded images (مثلاً صور الأكل)
app.use("/images", express.static('uploads'));

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", UserRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/cart", cartRouter);
app.use("/api/orders", router); // يجب أن يتطابق اسم الـ Router هنا مع اسم ملف الـ Router

// Root test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
});