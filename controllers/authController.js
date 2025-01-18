import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "helloworldfromjwt!";

export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const doesexist = await User.findOne({ email: email });
    console.log(name, email, password);
    if (doesexist) {
      res.status(409).json({ message: "User already exists !!" });
    } else {
      const hashpass = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashpass,
      });
      await newUser.save();

      const token = jwt.sign(
        {
          userId: newUser._id,
          username: newUser.name,
        },
        JWT_SECRET,
        {
          expiresIn: "5m",
        }
      );
      res.status(200).json({ msg: "User created sucessfully !" });
    }
  } catch {
    res.status(500).json({ msg: "Error in registering !" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email: email });

  if (!exist) {
    res
      .status(404)
      .json({ message: "User not found! Please register first.." });
  } else {
    console.log(exist);
    const comparedpass = await bcrypt.compare(password, exist.password);
    if (comparedpass) {
      const token = jwt.sign(
        {
          userId: exist._id,
          username: exist.name,
        },
        JWT_SECRET,
        {
          expiresIn: "5m",
        }
      );
      res.status(200).json({ message: "login successful..."});
    } else {
      res.status(404).json({ message: "invalid creds" });
    }
  }
};
