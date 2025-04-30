import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import { otpStore } from './sendOtp.js'; // Import same memory object

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const sessionId = otpStore[phone];

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session not found. Please resend OTP.' });
    }

    const response = await axios.get(`https://2factor.in/API/V1/ce0315a4-227c-11f0-8b17-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`);

    if (response.data.Status === 'Success') {
      // OTP Verified
      const user = await User.findOneAndUpdate(
        { phone },
        { phone }, // <-- Add name here if new user
        { upsert: true, new: true }
      );

      const token = jwt.sign(
        { id: user._id, phone: user.phone },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          phone: user.phone,
          name: user.name || "", // if you have name field
        }
      });
    } else {
      res.json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};
