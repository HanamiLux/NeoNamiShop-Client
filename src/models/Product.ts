import {CategoryDto} from "./Category";
import {OrderedProductDto} from "./orderedProduct";
import {FeedbackDto} from "./Feedback";

// export interface ProductDto {
//     productId: number;
//     productName: string;
//     description: string;
//     price: number;
//     quantity: number;
//     categoryId: number;
//     imagesUrl: string[];
//     averageRating: number;
//     totalFeedbacks: number;
//     category: CategoryDto;
//     orderedProducts: OrderedProductDto[];
//     feedbacks: FeedbackDto[];
// }

export interface ProductDto {
    productId: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    averageRating: number;
    totalFeedbacks: number;
    imagesUrl?: string[];
    category: {
        categoryId: number;
        categoryName: string;
    };
}

