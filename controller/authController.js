const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const {
  getUserByUserId,
  createUser,
} = require("../services/userServices");
const { encrypt } = require("../utils/encrypt");

app.use(cookieParser());
const register = async (req, res) => {
  try {
    const { userId, username, password } = req.body;
    if (!userId || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(userId)) {
      return res.status(400).json({
        message:
          "Username must be at least 4 characters long and start with a letter",
      });
    }
    const hashedPassword = encrypt(password);
    const tr = await createUser(userId, hashedPassword, username);
    res.status(200).json({ message: "User created", user: tr });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 로그인 함수
const login = async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await getUserByUserId(userId);
    if (!user) {
      console.log('nouser');
      return res.status(404).json({ message: "nouser" });
    }
    console.log('>>> ', user);
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "failed" });
    }

    const token = jwt.sign(
      { id: user._id, userId, username: user.username },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    if (!token)
      return res.status(500).json({ message: "Token creation failed" });
    console.log('>>> token : ', token);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
        // sameSite: "none",
      })
      .json({
        id: user._id,
        userId,
        username: user.username,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
    // sameSite: "none",
  });
  res.status(200).json({ message: "Logged out" });
};
const checkAuth = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }
  try {
    jwt.verify(token, "your_jwt_secret", {}, (err, info) => {
      if (err) throw err;
      console.log('유저의 정보는??? ', info);
      res.json(info);
    });
  } catch (error) {
    res.status(401).json({ isLoggedIn: false });
  }
};
module.exports = {
  register,
  login,
  logout,
  checkAuth
};
