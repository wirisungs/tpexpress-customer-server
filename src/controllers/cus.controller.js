const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
  {
    cus_ID: { type: String, required: true, unique: true },
    cus_Name: { type: String, required: true, },
    cus_Email: { type: String, required: true },
    cus_Phone: { type: String, required: true },
    cus_Address: { type: String, required: true },
    cus_Birthday: { type: String, required: true,},
    cus_Gender: { type: Number, required: true },
  },
  { collection: 'Customer' } 
);

const Customer = mongoose.model('Customer', statusSchema);

module.exports = Customer;
