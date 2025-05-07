export interface FeedbackDto {
    feedbackId: number;
    userId: string;
    rate: number;
    productId: number;
    content: string;
    date: Date;
    userLogin: string;
}