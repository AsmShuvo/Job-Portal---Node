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

    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "User Created successfully",
      user: {
        //should not send password as response
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next("Please provide all field correctly");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      next("Wrong Username or Password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Wrong Username or Password");
    }
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController };


