export interface Product {
    productId: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    imagesUrl: string[];
    categoryId: number;
    averageRating: number;
    totalFeedbacks: number;
}

export interface CreateProduct {
    productName: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    imagesUrl?: string[]
}

// Интерфейс для обновления продукта
export interface UpdateProduct extends Partial<CreateProduct> {}

// Вспомогательные типы
export type ProductPreview = Pick<Product, 'productId' | 'productName' | 'price' | 'imagesUrl' | 'averageRating'>;

export type ProductInCart = Pick<Product, 'productId' | 'productName' | 'price' | 'imagesUrl'> & {
    quantity: number;
    totalPrice: number;
};

// Тип для фильтрации продуктов
export interface ProductFilters {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    minRating?: number;
    search?: string;
}

// Тип для сортировки продуктов
export enum ProductSortType {
    PriceAsc = 'price_asc',
    PriceDesc = 'price_desc',
    NameAsc = 'name_asc',
    NameDesc = 'name_desc',
    RatingDesc = 'rating_desc',
    Newest = 'newest'
}

// Тип для пагинации продуктов
export interface ProductPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// Тип для ответа API с списком продуктов
export interface ProductsResponse {
    items: Product[];
    pagination: ProductPagination;
}