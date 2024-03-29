import { Router } from "express";
import { deleteCartItem, getCart, getIndex, getProducts, getProductById, postCart, postCartDecreaseItem, postCartIncreaseItem, getOrders, getCheckOut} from "../ controllers/shopCtrl.js";


/*import { deleteCartItem, getCart, getIndex, getProducts, getProductsById, getSaludo, postCart, postCartDecreaseItem, postCartIncreaseItem } from "../ controllers/shopCtrl.js";

*/
export const shopRouter = Router();
/*
shopRouter.get('/saludo', getSaludo ); */
shopRouter.get('/products', getProducts); 
shopRouter.get('/', getIndex);
shopRouter.get('/products/:productId', getProductById);
shopRouter.post('/add-to-cart',postCart );
shopRouter.get('/cart',getCart);
shopRouter.post('/cart-delete-item', deleteCartItem );

shopRouter.post('/cart-increase-item',postCartIncreaseItem);
shopRouter.post('/cart-decrease-item',postCartDecreaseItem);
shopRouter.get('/orders', getOrders);
shopRouter.get('/checkout', getCheckOut);

