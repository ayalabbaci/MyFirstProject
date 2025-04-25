// routes/adminRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js'; // تأكد من المسار الصحيح

const router = express.Router();

router.post('/create-admin', async (req, res) => {
  console.log('📥 Received request to create admin'); // ✅ هذا باش تتأكد
  try {
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });

    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin saved to DB');
    res.status(201).json({ message: 'Admin created successfully' });

  } catch (error) {
    console.error('❌ Error while creating admin:', error);
    res.status(500).json({ message: 'Server Error' });
  }

});

export default router;


