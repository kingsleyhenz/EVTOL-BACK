import { Request, Response } from 'express';
import UserService from '../services/user.service.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../util/generateToken.js';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const existingUser = await UserService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserService.registerUser({
        ...req.body,
        password: hashedPassword,
        role: "User",
        requests: [],
        notification: []
      });

      return res.status(201).json({ message: "Account Registered Successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "User not registered" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = generateToken(user);
      return res.status(200).json({
        status: "Success",
        token,
        role: user.role,
      });
    } catch (error: any) {
      return res.status(500).json({ status: "Error", message: "Failed to login" });
    }
  }

  async getProfile(req: any, res: Response) {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const user = await UserService.getUserById(userId);
      if (!user) return res.status(400).json({ message: "User Not Found" });

      return res.json({ status: "Success", data: user });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new UserController();
