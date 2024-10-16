const express = require('express');
const User = require('../controllers/test.controller.js'); // Giữ require

const router = express.Router();

router.get('/User', async (req, res) => {
  try {
    const questions = await User.find();
    res.json(questions);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
});

router.post('/User', async (req, res) => {
    try {
      const { 
        username, 
        password
      } = req.body;
      const newMessage = new User({ username, password });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Lỗi khi thêm dữ liệu:', error);
      res.status(500).json({ error: 'Lỗi khi thêm dữ liệu' });
    }
  });

  router.delete('/User/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Tìm và xóa bản ghi dựa trên id
      const result = await User.findByIdAndDelete(id);
      
      if (!result) {
        return res.status(404).json({ error: 'Dữ liệu không tìm thấy' });
      }
      
      res.status(200).json({ message: 'Dữ liệu đã được xóa thành công!' });
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
      res.status(500).json({ error: 'Lỗi khi xóa dữ liệu' });
    }
  });

  router.put('/User/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
  
      if (!id) {
        return res.status(400).json({ error: 'Thiếu ID của người dùng.' });
      }
  
      // Tìm và cập nhật người dùng theo id
      const updatedUser = await User.findByIdAndUpdate(id, { username, password }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật người dùng.' });
    }
  });
  
 
  
module.exports = router; 
