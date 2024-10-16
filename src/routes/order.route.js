const express = require('express');
const Order = require('../controllers/order.controller.js'); 

const router = express.Router();

router.use(express.json()); 

router.get('/order', async (req, res) => {
  const { status } = req.query; 

  try {
    // Lọc đơn hàng theo Status nếu status được cung cấp
    const orders = await Order.find(status ? { Status: status } : {});  
    res.json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
});



// router.post('/order', async (req, res) => {
//   const { 
//     Address, 
//     Detail,
//     ReceiverName,
//     SDT,
//     KL,
//     SL,
//     Width,
//     Height,
//     Length,
//     Note,
//     Code,
//     Price,
//     Status,
//     driverID,
//     Email,
//     PTH
//   } = req.body; 

//   if (!Address || !Detail || !ReceiverName || !SDT || !KL || !SL || !Width || !Height || !Length || !Note || !Email ||!PTH) {
//     return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
//   }

//   try {
//     const newData = new Order({
//       Address, 
//       Detail,
//       ReceiverName,
//       SDT,
//       KL,
//       SL,
//       Width,
//       Height,
//       Length,
//       Note,
//       Code,
//       Price,
//       Status,
//       driverID,
//       Email,
//       PTH
//     });
//     await newData.save();
//     res.status(201).json({ message: 'Dữ liệu đã được thêm thành công!' });
//   } catch (error) {
//     console.error('Lỗi khi thêm dữ liệu:', error.message);
//     res.status(500).json({ error: 'Lỗi khi thêm dữ liệu.' });
//   }
// });


// // Thêm route PUT để cập nhật đơn hàng
// router.put('/order', async (req, res) => {
//   try {
//     const { Code, Status } = req.body;

//     if (!Code) {
//       return res.status(400).json({ error: 'Thiếu mã đơn hàng.' });
//     }

//     // Tìm và cập nhật đơn hàng theo Code
//     const updatedOrder = await Order.findOneAndUpdate({ Code }, { Status }, { new: true });

//     if (!updatedOrder) {
//       return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     console.error('Lỗi khi cập nhật đơn hàng:', error);
//     res.status(500).json({ error: 'Lỗi khi cập nhật đơn hàng.' });
//   }
// });

module.exports = router; 
