import User, { IUser } from '../models/user.model.ts';
import { CreateUserDto } from '../dto/user.dto.ts';

class UserService {
  async registerUser(userData: CreateUserDto): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).populate('requests notification').exec();
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find().exec();
  }
}

export default new UserService();
