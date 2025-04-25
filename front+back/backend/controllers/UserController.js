import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// ✅ تعديل دالة إنشاء التوكن لقبول role أيضًا
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// ✅ جلب اسم المستخدم
export const getUsername = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select("name");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ إعادة إرسال التوكن مع الدور أيضًا
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            success: true,
            name: user.name,
            token
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

// ✅ تسجيل الدخول
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // ✅ تمرير الدور في التوكن
        const token = createToken(user._id, user.role);

        res.json({
            success: true,
            token,
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        console.log("Login Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ تسجيل مستخدم جديد
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
            role: "client" // ✅ تأكد من وجوده (أو admin لو حاب تعين بشكل يدوي)
        });

        const user = await newUser.save();

        // ✅ تمرير الدور في التوكن
        const token = createToken(user._id, user.role);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ✅ تصدير
export { loginUser, registerUser };