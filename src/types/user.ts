export interface UserDto {
    userId: string;
    login: string;
    email: string;
    roleName: string;
}

export interface CreateUserDto {
    login: string;
    email: string;
    password: string;
}

export interface UpdateUserDto {
    login?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
}

export interface LoginResponse {
    user?: UserDto;
    message?: string;
}