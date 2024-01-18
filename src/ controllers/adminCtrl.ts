
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product.js';

export const getProducts = (req: Request, res: Response,next: NextFunction) => {
res.render('admin/products', {pageTitle:'Admin Products', path:'/admin/products', prods: Product.fetchAll()});
}

export const getAddProduct = (req: Request,res: Response,next: NextFunction)=>{
    console.log("Devolvemos el formulario para meter productos");
    res.render('admin/edit-product',{pageTitle: "Formulario", path: "/admin/add-product", editing: false});
}
export const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const imageUrl =  req.body.imageUrl;
    const description = req.body.description;
    console.log(description);
    const price = +req.body.price;
    if(req.body.title){
        console.log('Ha llegado el siguiente producto: ',req.body.title);
        const producto = new Product(
            title,
            imageUrl,
            description,
            price
        );
        producto.save();
    }
    console.log('pasa')
    res.redirect('/');  
}
