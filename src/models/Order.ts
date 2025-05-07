export interface Order {
    orderId: number;
    userId: string;
    date: Date;
    address: string;
    status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
    products: {
        productId: number;
        description: string;
        orderedProductId: number;
        quantity: number;
        imagesUrlAtOrder: string;
        productName: string;
        priceAtOrder: number;
    }[];
    total: number;
}