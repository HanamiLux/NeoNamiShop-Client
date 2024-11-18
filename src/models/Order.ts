export interface OrderItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

export interface Order {
    orderId: number;
    userId: string;
    date: Date;
    address: string;
    status: string;
    items: OrderItem[];
    total: number;
}

export interface CreateOrder {
    address: string;
    total: number;
    products: {
        productId: number;
        quantity: number;
    }[];
}

export interface UpdateOrder extends Partial<CreateOrder> {}