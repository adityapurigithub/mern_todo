import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body.data;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(406).json({
      msg: "User Already Exist!!! Please Login.",
    });
  }

  //hashing pass before saving user.....................................
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = new User({
    email,
    name,
    password: hashedPass,
  });

  await user.save();

  // console.log("user created", user);
  return res.status(200).json({
    msg: "Registered Successfully!!",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.data;
  const user = await User.findOne({ email });

  if (user) {
    const passMatch = bcrypt.compareSync(password, user.password);

    if (passMatch) {
      //if everything is good..creating a jwt token....
      const payload = {
        username: email,
        id: user._id,
      };
      const token = jwt.sign(payload, "thisisasecret");

      //sending response...
      return res.status(200).json({
        msg: "Logged In Successfully!!!",
        token,
      });
    }
    return res.status(406).json({
      msg: "Password Doesnot match!!!",
    });
  }
  res.status(406).json({
    msg: "This User Do not Exist!!!",
  });
});

export default router;
