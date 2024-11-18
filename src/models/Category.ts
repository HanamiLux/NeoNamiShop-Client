import {Product} from "./Product";

export interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
    products?: Product[];
}

export interface CreateCategory {
    categoryName: string;
    description: string;
}

export interface UpdateCategory extends Partial<CreateCategory> {}