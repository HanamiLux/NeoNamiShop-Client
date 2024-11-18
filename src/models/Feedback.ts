export interface Feedback {
    feedbackId: number;
    userId: string;
    productId: number;
    rate: number;
    content: string;
    date: Date;
}

export interface CreateFeedback {
    rate: number;
    content: string;
    productId: number;
}

export interface UpdateFeedback extends Partial<CreateFeedback> {}