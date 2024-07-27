const userModel = require("../models/userModel");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // validate
    if (!name) {
      next("name is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      next("Email already registered, Please login");
    }
    const user = await userModel.create({ name, password, email });
    res.status(201).send({
      success: true,
      message: "User Created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController };
