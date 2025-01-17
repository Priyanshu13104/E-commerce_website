import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "helloworldfromjwt!";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const doesexist = await User.findOne({ email: email });

    if (doesexist) {
      res.status(409).json({ message: "User already exists !!" });
    } else {
      const hashpass = await bcrypt.hashpass(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashpass,
      });
      await newUser.save();
      res.status(200).json({ msg: "User registration successful..." });

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
      res.json({
        status: 200,
        token: token,
      });
    }
  } catch {
    res.status(500).json({ msg: "Error in registering !" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const notexist = await User.findOne({email : email})

  if (notexist){
    res.status(404).json({message: "User not found! Please register first.."})
  }
  else{
    const comparedpass = await bcrypt.compare(password, User[0].password)
    if(comparedpass){
        const token = jwt.sign({
            userId: newUser._id,
            username : newUser.name,
        },
        JWT_SECRET,
        {
            expiresIn: "5m",
        }
    );
    res.status(200).json({message:"login successful..."})
    }
    else{
        res.status(404).json({message:"invalid creds"})
    }
  }
};
