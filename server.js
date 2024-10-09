const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const userRoute = require("./src/routes/user.route");

// Connect MongoDB
const connectDB = require("./src/data/db.mongo.config");
connectDB();

app.use(express.json());
app.use(cors());

// Dùng route
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Customer app listening at http://localhost:${port}`);
});
