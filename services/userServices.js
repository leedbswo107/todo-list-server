const User = require("../models/User");

class UserService {
  async createUser(userId, password, username) {
    try {
      const tr = await User.create({
        userId,
        password,
        username,
      });
      return tr;
    } catch (error) {
      console.error(error);
    }
  }
  async getUserByUserId(userId) {
    try {
      const user = await User.findOne({ userId });
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new UserService();
