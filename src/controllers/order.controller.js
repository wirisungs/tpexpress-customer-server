const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  Address: { type: String, required: true },
  Code: { type: String, required: true },
  Detail: { type: String, required: true },
  Price: { type: Number, required: true },
  ReceiverName: { type: String, required: true },
  SDT: { type: Number, required: true },
  Status: { type: String, required: true },
  KL: { type: Number, required: true },
  SL: { type: Number, required: true },
  Width: { type: Number, required: true },
  Height: { type: Number, required: true },
  Length: { type: Number, required: true },
  Note: { type: String, required: true },
  driverID: { type: String, default: null },
  Email: { type: String, required: true },
  PTH:{ type: Number, required: true },
}, { collection: 'Order' });

const Order = mongoose.model('Order', questionSchema);

module.exports = Order;
