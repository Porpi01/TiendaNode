import { NextFunction, Request, Response } from "express";

import { Product } from "../models/Product.js";
import { User } from "../models/User.js";



export const getIndex = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ pageTitle: 'Tienda', path: '/' });
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.fetchAll();
    res.status(200).json({ message: "Hecho", products: products });
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    console.log(productId)
    const product = await Product.findById(productId);
    if (product) {
        res.status(200).json({ message: "Hecho", product: product });
    } else {
        res.status(404).json({ message: "Product no encontrado" });    }
};
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as User;
    const items = await user.getCart();
    //console.log(items);
    res.status(200).json({ message: "Hecho", cartItems: items });
}


export const postCart = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const productId = req.body.productId;
    await user.addToCart(productId);

    console.log('postCart: Añadimos al carro el producto: ', productId);
    res.status(200).json({ message: "Producto añadido al carrito" });
}

export const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const productId = req.body.productId;
    const result = await user.deleteCartItem(productId);
    result
        ? console.log("Producto eliminado: ", productId)
        : console.log("No ha funcionado: ", productId);
        res.status(200).json({ message: "Producto eliminado" });}

export const postCartIncreaseItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const productId = req.body.productId;
    await user.addToCart(productId);
    res.status(200).json({ message: "Cantidad aumentada" });}


export const postCartDecreaseItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const productId = req.body.productId;
    await user.decreaseCartItem(productId);
    res.status(200).json({ message: "Cantidad reducida" });}


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    const orders = await user.getOrders();
    res.status(200).json({ message: "Hecho", orders: orders });

};

export const getCheckOut = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    try {
        const result = await user.addOrder();
        result
            ? console.log('Pedido creado con éxito')
            : console.log('Error al crear el pedido');

    } catch (err) {
        console.log(err);

    } finally {
        res.status(200).json({ message: "Pedido creado con éxito" });
    }
}


