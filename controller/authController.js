const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
     name: req.body.name,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber,
     password: req.body.password, 
     passwordConfirm: req.body.passwordConfirm
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });

    console.log("User created");
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
