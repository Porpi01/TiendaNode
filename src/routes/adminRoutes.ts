import { Router } from "express";

import { getAddProduct, postAddProduct } from "../ controllers/adminCtrl.js";

export const adminRouter = Router();


//todsas las rutas que lleguen aquí empiezan por /admin

adminRouter.get('/add-product', getAddProduct );


adminRouter.post('/add-product', postAddProduct);

