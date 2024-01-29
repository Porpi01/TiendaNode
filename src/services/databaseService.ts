import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';


import { Product} from '../models/Product.js';

export const collections: {
    products?: mongoDB.Collection<Product>;
} = {};

