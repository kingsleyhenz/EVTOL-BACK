export interface CreateUserDto {
    fullName: string;
    username?: string;
    email: string;
    password: string;
    phoneNo?: number;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface UserResponseDto {
    id: string;
    fullName: string;
    email: string;
    role: string;
}
//# sourceMappingURL=user.dto.d.ts.map