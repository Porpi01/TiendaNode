

import { Request, Response, NextFunction } from 'express';

import { Product } from '../models/Product.js';

export const getIndex =(request: Request, response: Response, next: NextFunction) => {
    response.render('shop/product-list', {pageTitle:'Tienda', path:'/', prods: Product.fetchAll()});
}

export const getSaludo =(request: Request, response: Response, next: NextFunction) => {
    response.render("prueba", { nombre: "Monica" }); //Renderiza la vista prueba.ejs
}

