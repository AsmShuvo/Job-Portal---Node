const userModel = require("../models/userModel");

const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    return res.status(400).json({ msg: "Please provide all fields to update" });
  }

  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserController;
