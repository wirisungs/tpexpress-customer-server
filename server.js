require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Usertest = require("./src/routes/test.route.js");
const Order = require("./src/routes/order.route.js");
const connectDB = require("./src/data/db.mongo.config.js");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./src/routes/user.route");

// Connect MongoDB
const connectDB = require("./src/data/db.mongo.config");
connectDB();

app.use(express.json());
app.use(cors());

// Dùng route

app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDB();
app.use(express.json());

app.use("/user", userRoute);
app.use("/api", Usertest);
app.use("/api", Order);

app.listen(port, () => {
  console.log(`Customer app listening at http://localhost:${port}`);
});
