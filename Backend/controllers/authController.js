import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const otpStore = {}; // Temporary in-memory storage

export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    const response = await axios.get(`https://2factor.in/API/V1/ce0315a4-227c-11f0-8b17-0200cd936042/SMS/${phone}/AUTOGEN`);
    console.log('OTP Sent via 2Factor:', response.data);

    otpStore[phone] = response.data.Details; // Save Session ID for verification

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};
