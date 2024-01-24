

import { Request, Response, NextFunction } from 'express';

import { Product } from '../models/Product.js';

export const getIndex =(request: Request, response: Response, next: NextFunction) => {
    response.render('shop/index', {pageTitle:'Tienda', path:'/'});
}

export const getSaludo =(request: Request, response: Response, next: NextFunction) => {
    response.render("prueba", { nombre: "Monica" }); //Renderiza la vista prueba.ejs
}

export const getProducts = (req: Request, res: Response,next: NextFunction) => {  
    res.render('shop/product-list', {pageTitle:'Lista de productos', path:'/products', prods: Product.fetchAll()});
};

export const getProductsById = (req: Request, res: Response,next: NextFunction) => {  
    const productId = +req.params.productId;
    const product = Product.findById(productId);
    if(product){
        res.render('shop/product-detail', {pageTitle:product.title, path:'/products', product: product});

    }else{
        res.status(404).render('404.ejs', {pageTitle:'Page not found', path:''});

    }

};
