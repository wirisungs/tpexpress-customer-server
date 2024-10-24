const express = require('express');
const Order = require('../controllers/order.controller.js');

const router = express.Router();

router.use(express.json());

//them route tinh phi van chuyen
router.post('/calculate-order-fee', async (req, res) => {
  try {
    const { weight, distance, serviceBaseFee, feePerKm, weightFee, codFee, fragileItemProtectionFee, itemPrice } = req.body;
    if (
      typeof weight !== 'number' ||
      typeof distance !== 'number' ||
      typeof serviceBaseFee !== 'number' ||
      typeof itemPrice !== 'number'
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const calculatedFeePerKm = distance >= 5 ? 3.000 : feePerKm;
    const calculatedWeightFee = weight >= 3 ? 5.000 : weightFee;
    const calculatedCodFee = Math.max(0.02 * itemPrice, 15.000);
    const calculatedFragileFee = fragileItemProtectionFee ? 20.000 : 0;

    const fee = serviceBaseFee + (calculatedFeePerKm * distance) + (calculatedWeightFee * weight) + calculatedCodFee + calculatedFragileFee;
    res.json({ fee });
  } catch (error) {
    console.error('Error calculating fee:', error);
    res.status(500).json({ error: 'Error calculating fee' });
  }
});
router.use(express.json());

//thêm route tính phí vận chuyển
router.post('/calculate-order-fee', async (req, res) => {
  try {
    const { weight, distance, serviceBaseFee, feePerKm, weightFee, codFee, fragileItemProtectionFee, itemPrice } = req.body;
    if (
      typeof weight !== 'number' ||
      typeof distance !== 'number' ||
      typeof serviceBaseFee !== 'number' ||
      typeof itemPrice !== 'number'
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const calculatedFeePerKm = distance >= 5 ? 3.000 : feePerKm;
    const calculatedWeightFee = weight >= 3 ? 5.000 : weightFee;
    const calculatedCodFee = Math.max(0.02 * itemPrice, 15.000);
    const calculatedFragileFee = fragileItemProtectionFee ? 20.000 : 0;

    const fee = serviceBaseFee + (calculatedFeePerKm * distance) + (calculatedWeightFee * weight) + calculatedCodFee + calculatedFragileFee;
    res.json({ fee });
  } catch (error) {
    console.error('Error calculating fee:', error);
    res.status(500).json({ error: 'Error calculating fee' });
  }
});

router.get('/order', async (req, res) => {
  const { status } = req.query;

  try {
    // Lọc đơn hàng theo Status nếu status được cung cấp
    const orders = await Order.find(status ? { Status_ID: status } : {});
    res.json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
});

router.get('/ordersearch', async (req, res) => {
  const { orderID } = req.query;

  try {
    const orders = await Order.find(orderID ? { Order_ID: orderID } : {});
    res.json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
});

router.post('/order', async (req, res) => {
  try {
    const {
      Order_ID,
      Cus_ID,
      Sender_Address,
      Receiver_Phone,
      Receiver_Name,
      Receiver_Address,
      Order_Type,
      Order_Fragile,
      Order_Note,
      Order_COD,
      Services_ID,
      Order_TotalPrice,
      Payment_ID,
      Status_ID,
      Driver_ID,
      Order_Date,
      Delivery_Fee,
      Proof_Success,
      Order_Reason
    } = req.body;

    const newOrder = new Order({
      Order_ID,
      Cus_ID,
      Sender_Address,
      Receiver_Phone,
      Receiver_Name,
      Receiver_Address,
      Order_Type,
      Order_Fragile,
      Order_Note,
      Order_COD,
      Services_ID,
      Order_TotalPrice,
      Payment_ID,
      Status_ID,
      Driver_ID,
      Order_Date,
      Delivery_Fee,
      Proof_Success,
      Order_Reason
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu:', error);
    res.status(500).json({ error: 'Lỗi khi thêm dữ liệu' });
  }
});


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
