const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/connectDB");
const authRoutes = require("./routes/authRoutes");
const port = process.env.PORT_NUM || 4000;
const clientPort = process.env.CLIENT_PORT_NUM || 3000;
require("dotenv").config();
// app.use(
//   session({
//     secret: "your session secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
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

db.connectDB();
app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
