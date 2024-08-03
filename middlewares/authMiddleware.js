const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // decrypted and verified
    console.log("Decoded", decoded);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.log("Error while authentication: ", error);
    next("Auth Failed");
  }
};

module.exports = userAuth;
