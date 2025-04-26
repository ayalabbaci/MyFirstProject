import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // الشكل "Bearer token_value"

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: token_decode.id }; // إضافة الـ userId في req.user
        next(); // المتابعة للـ next middleware أو الـ route handler
    } catch (error) {
        console.log("❌ Token Error: ", error);
        return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

export default authMiddleware;
