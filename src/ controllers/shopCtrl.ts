

import { Request, Response, NextFunction } from 'express';

import { Product } from '../models/Product.js';
import { Cart } from '../models/cart.js';



export const getIndex =(request: Request, response: Response, next: NextFunction) => {
    response.render('shop/index', {pageTitle:'Tienda', path:'/'});
}

export const getSaludo =(request: Request, response: Response, next: NextFunction) => {
    response.render("prueba", { nombre: "Monica" }); //Renderiza la vista prueba.ejs
}
//Metodo getProducts que se ejecuta cuando se hace una petición get a /products

export const getProducts = async (req: Request, res: Response,next: NextFunction) => {   
    res.render('shop/product-list', {
        pageTitle:'Lista de productos', 
        path:'/products', 
        prods: await Product.fetchAll()
    });
};

export const getProductsById = async (req: Request, res: Response,next: NextFunction) => {  

    const productId = req.params.productId;
    const product = await  Product.findById(productId);

    if(product){
        res.render('shop/product-detail', {pageTitle:product.title, path:'', product: product});

    }else{
        res.status(404).render('404.ejs', {pageTitle:'Page not found', path:''});

    }
};

/*

export const getCart = (req: Request, res: Response, next: NextFunction) => {
    const ci = Cart.getCart();
    const items = ci.map(ci => {
        const product = Product.findById(ci.id);
        if (product) {
            return {
                id: ci.id,
                title: product.title,
                quantity: ci.quantity,
                price: product.price
            };
        }
        return  [];
    });
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Carro de la compra',
        items: items
    });
}*/

/*

export const postCart = (req: Request, res: Response,next: NextFunction) => {

    const productId = +req.body.productId;
    console.log('Añadimos al carrito el producto con id: ', productId);
    Cart.addProduct(productId, 1);
    res.redirect('/cart');
}

export const deleteCartItem = (req: Request, res: Response, next: NextFunction)=> {
    const productId = +req.body.productId;
    console.log('deleteCartItem: Borramos del carro el producto'+productId);
    Cart.deleteProduct(productId);
    res.redirect('/cart');
}
 export const postCartIncreaseItem = (req: Request, res: Response, next: NextFunction)=>
    {
        const productId = +req.body.productId;
        console.log('postCartIncreaseItem: Añadimos al carro el producto'+productId);
        Cart.addProduct(productId, 1);
        res.redirect('/cart');
    }
export const postCartDecreaseItem = (req: Request, res: Response, next: NextFunction)=>
    {
        const productId = +req.body.productId;
        console.log('postCartDecreaseItem: Añadimos al carro el producto'+productId);
        Cart.decreasePR(productId);
        res.redirect('/cart');
    }

*/