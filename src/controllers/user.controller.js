const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      console.log(username, password);

      const user = await User.findOne({ username });
      console.log(user);

      if (!user) {
        return res.status(400).json({ message: "Username is not exist!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is not correct!" });
      }

      const token = jwt.sign({ userId: userId }, "secret_key", {
        expiresIn: "1h",
      });
      res.json({ token, message: "Login successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username is existed!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
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
