const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.generate_user_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.hashing_password = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
