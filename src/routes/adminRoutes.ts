import { Router } from "express";
import { getAddProduct, getEditProduct, getProducts, postAddProduct,postEditProduct, postDeleteProduct } from "../ controllers/adminCtrl.js";



export const adminRouter = Router();


//todsas las rutas que lleguen aquí empiezan por /admin

adminRouter.get('/products', getProducts );
adminRouter.get('/add-product', getAddProduct); //getAddProduct es el nombre de la función que se ejecuta cuando se hace una petición get a /admin/add-product
adminRouter.post('/add-product', postAddProduct); //postAddProduct es el nombre de la función que se ejecuta cuando se hace una petición post a /admin/add-product
adminRouter.get('/add-product/:productId', getEditProduct); //getEditProduct es el nombre de la función que se ejecuta cuando se hace una petición get a /admin/add-product
adminRouter.post('/edit-product', postEditProduct); //postEditProduct es el nombre de la función que se ejecuta cuando se hace una petición post a /admin/add-product
adminRouter.post('/delete-product', postDeleteProduct); //postEditProduct es el nombre de la función que se ejecuta cuando se hace una petición post a /admin/add-product
 