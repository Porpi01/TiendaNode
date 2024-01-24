import { Router } from "express";
import { getIndex, getProducts, getProductsById, getSaludo, postCart } from "../ controllers/shopCtrl.js";


export const shopRouter = Router();

shopRouter.get('/saludo', getSaludo );
shopRouter.get('/products', getProducts);
shopRouter.get('/', getIndex);
shopRouter.get('/products/:productId', getProductsById);
shopRouter.post('/add-to-cart',postCart );

