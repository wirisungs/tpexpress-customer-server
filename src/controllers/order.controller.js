const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // Order_ID: { type: String, required: true, unique: true }, //khóa chính
  // Cus_ID: { type: String, required: true},
  // Sender_Address: { type: String, required: true },
  // Receiver_Phone: { type: Number, required: true },
  // Receiver_Name: { type: String, required: true },
  // Receiver_Address: { type: String, required: true },
  // Order_Type: { type: String, required: true },
  // Order_Fragile: { type: Boolean, required: true}, // hàng dễ vỡ
  // Order_Note: { type: String},
  // Order_COD: { type: Number},
  // Services_ID: { type: String, required: true },
  // Order_TotalPrice: { type: Number, required: true },
  // Payment_ID: { type: String},
  // Status_ID: { type: String, required: true },
  // Driver_ID: { type: String},
  // Order_Date: { type: String, required: true },
  // Delivery_Fee: { type: Number, required: true },
  // Proof_Success: { type: String},
  // Order_Reason: { type: String},

  Order_ID: { type: String, required: true, unique: true }, // Khóa chính
  Cus_ID: { type: String }, // Không còn required
  Sender_Address: { type: String },
  Receiver_Phone: { type: Number },
  Receiver_Name: { type: String },
  Receiver_Address: { type: String },
  Order_Type: { type: String },
  Order_Fragile: { type: Boolean }, // Không còn required
  Order_Note: { type: String, default: null }, // Có thể để trống
  Order_COD: { type: Number, default: 0 }, // Mặc định là 0 nếu không có giá trị
  Services_ID: { type: String },
  Order_TotalPrice: { type: Number, default: 0 }, // Giá trị mặc định
  Payment_ID: { type: String, default: null },
  Status_ID: { type: String },
  Driver_ID: { type: String, default: null },
  Order_Date: { type: String },
  Delivery_Fee: { type: Number, default: 0 },
  Proof_Success: { type: String, default: null },
  Order_Reason: { type: String, default: null }

}, { collection: 'Order' });

const Order = mongoose.model('Order', questionSchema);

module.exports = Order;
