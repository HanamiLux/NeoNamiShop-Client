export interface Order {
    orderId: number;
    userId: string;
    date: Date;
    address: string;
    status: 'new' | 'processing' | 'completed' | 'cancelled';
    items: {
        productId: number;
        quantity: number;
        image: string;
        name: string;
        price: number;
    }[];
    total: number;
}