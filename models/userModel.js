const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true,unique: true},
  email: {
    type: String,
    unique: [true,"Email already exists"],
    required: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phoneNumber: { type: String, required: true, minlength: 11 },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

// PASSWORD HASHING

userSchema.pre("save", async function (next) {
  // run function when password is modified
  if (!this.isModified("password")) return next();

  // encrypt password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; //remove confirm password
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
