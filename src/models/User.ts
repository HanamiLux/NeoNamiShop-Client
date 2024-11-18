export interface User {
    userId: number;
    login: string;
    email: string;
    roleId: number;
}

export interface CreateUser {
    login: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UpdateUser {
    login?: string;
    email?: string;
    password?: string;
    roleId?: number;
}