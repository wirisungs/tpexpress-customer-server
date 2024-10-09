const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", UserSchema);
