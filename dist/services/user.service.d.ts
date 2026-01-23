import { IUser } from '../models/user.model.js';
import { CreateUserDto } from '../dto/user.dto.js';
declare class UserService {
    registerUser(userData: CreateUserDto): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    getUserById(id: string): Promise<IUser | null>;
    updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[]>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map