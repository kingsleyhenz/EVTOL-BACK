import { Request, Response } from 'express';
import { UserService } from '../services/user.service.ts';
import bcrypt from 'bcrypt';
import { generateToken } from '../util/generateToken.ts';
import { CreateUserDto, LoginDto } from '../dto/user.dto.ts';
import { ResponseUtil } from '../util/response.util.ts';

class UserController {
  private userService = new UserService();

  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: CreateUserDto = req.body;
      const existingUser = await this.userService.findByEmail(data.email);
      if (existingUser) {
        return ResponseUtil.error(res, 'User already exists', 400);
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.userService.registerUser({ ...data, password: hashedPassword });
      return ResponseUtil.created(res, user, 'Account registered successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password }: LoginDto = req.body;
      const user = await this.userService.findByEmail(email);
      if (!user) return ResponseUtil.error(res, 'User not registered', 400);

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return ResponseUtil.error(res, 'Invalid credentials', 400);

      const token = generateToken(user._id.toString());
      return ResponseUtil.success(res, { token, role: user.role }, 'Login successful');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getProfile = async (req: any, res: Response): Promise<Response> => {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return ResponseUtil.unauthorized(res);

      const user = await this.userService.getUserById(userId);
      if (!user) return ResponseUtil.notFound(res, 'User not found');

      return ResponseUtil.success(res, user, 'Profile fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };
}

export default new UserController();
