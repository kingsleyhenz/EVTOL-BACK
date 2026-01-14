import User from '../models/user.model.js';

class UserService {
  async registerUser(userData: any) {
    return await User.create(userData);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async getUserById(id: string) {
    return await User.findById(id).populate('requests notification');
  }

  async updateUser(id: string, updateData: any) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserService();
