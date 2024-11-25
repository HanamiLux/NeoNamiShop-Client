export interface Order {
    orderId: number;
    userId: string;
    date: Date;
    address: string;
    status: 'new' | 'pending' | 'completed' | 'cancelled';
    products: {
        description: string;
        orderedProductId: number;
        quantity: number;
        imagesUrlAtOrder: string;
        productName: string;
        priceAtOrder: number;
    }[];
    total: number;
}