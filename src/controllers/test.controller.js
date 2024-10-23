const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  phonenumber: { type: String, required: true },
  password: { type: String, required: true },
}, { collection: 'User' });

const User = mongoose.model('User', questionSchema);

module.exports = User; // Đổi export default thành module.exports
