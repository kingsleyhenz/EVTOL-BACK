import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { generateToken } from "../util/generateToken.js";

export const createAccount = async (req, res) => {
  const { fullName, username, email, phoneNo, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullName,
      username,
      email,
      phoneNo,
      password: hashedPassword,
      role: "User",
      requests: [],
      notification: [],
    });
    await newUser.save();
    res.status(201).json({ message: "Account Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not registered" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(existingUser);
    res.status(200).json({
      status: "Success",
      token,
      role: existingUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Failed to login",
    });
  }
};

export const getProfile = async(req, res)=>{
  const userId = req.userAuth;
  if(!userId){
    return res.status(401).json({ error: "Unauthorized" })
  }
  try {
    const user = await userModel.findById(userId)
    if(!user){
      return res.status(400).json({ message: "User Not Found" })
    }
    res.json({
      status: "Success",
      data: user
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}
