const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/connectDB");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const port = process.env.PORT_NUM || 4000;
const clientPort = process.env.CLIENT_PORT_NUM || 3000;
require("dotenv").config();
let corsOptions = {
  // origin: `${process.env.CLIENT_URL}`,
  origin: `http://localhost:${clientPort}`,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/", todoRoutes);

db.connectDB();
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
