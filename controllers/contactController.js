// 文件路径: controllers/contactController.js

const Message = require('../models/messageModel');

// @desc    保存一条新的联系信息 (Save a new contact message)
// @route   POST /api/contact
// @access  Public
const saveMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const newMessage = await Message.create({
    name,
    email,
    message,
  });

  if (newMessage) {
    res.status(201).json({ message: 'Message received successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid message data' });
  }
};

module.exports = {
  saveMessage,
};