const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      unique: true,
      required: "Email, username or Phone is required",
      trim: true,
    },

    password: {
      type: String,
      required: "Your password is required",
      max: 100,
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
