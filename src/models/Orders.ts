import { ObjectId } from "mongodb";

import { Product } from "./Product.js";
import { User } from "./User.js";

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface Order {
    _id?: string,
    date: Date;
    user: User;
    items: OrderItem[];
}

