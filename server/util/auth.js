const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
  return token.toString();
};

const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Authorization token not found!");
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(verifiedToken.id);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error) {
    throw new Error("Authorization token invalid");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
