export interface Role {
    roleId: number;
    roleName: string;
    description: string;
}

export interface CreateRole {
    roleName: string;
    description: string;
}

export interface UpdateRole {
    roleName?: string;
    description?: string;
}