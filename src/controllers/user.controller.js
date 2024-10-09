const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  login: async (req, res) => {
    const { phonenumber, password } = req.body;

    try {
      console.log(phonenumber, password);

      const user = await User.findOne({ phonenumber });
      // console.log(user);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Số điện thoại không tồn tại!", erCode: "pne" }); // pne: Phone not existed
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Sai mật khẩu!", erCode: "wrp" }); // wrp: Wrong password
      }

      const token = jwt.sign({ phonenumber: phonenumber }, "secret_key", {
        expiresIn: "1h",
      });
      res.json({ token, message: "Đăng nhập thành công!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  register: async (req, res) => {
    const { phonenumber, password } = req.body;
    try {
      const existingUser = await User.findOne({ phonenumber });
      if (existingUser) {
        return res.status(400).json({ message: "Username is existed!" });
      }

      // Thiết lập mã hóa cho password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        phonenumber,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User register successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
