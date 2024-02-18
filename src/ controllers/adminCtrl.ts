
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product.js';
import { Events } from "../models/Events.js";

//getProducts es el nombre de la función que se ejecuta cuando se hace una petición get a /admin/products 
export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.json({ pageTitle: 'Admin Products', path: '/admin/products', prods: products });}

//getAddProduct es el nombre de la función que se ejecuta cuando se hace una petición get a /admin/add-product

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
    console.log("Devolvemos el formulario para meter productos");
    res.json({ pageTitle: "Formulario", path: "/admin/add-product", editing: false });}

//postAddProduct es el nombre de la función que se ejecuta cuando se hace una petición post a /admin/add-product   


export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    console.log(description);
    const price = +req.body.price;
    if (req.body.title) {
        console.log('Ha llegado el siguiente producto: ', req.body.title);
        const producto = new Product(
            title,
            imageUrl,
            description,
            price
        );
        await producto.save();

    }
    res.json({ message: "Producto añadido" });

}


// getEditProduct es el nombre de la función que se ejecuta cuando se hace una petición get a /admin/add-product  

export const getEditProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Devolvemos el formulario para editar productos");
    const editMode = req.query.edit === 'true';
    if (!editMode) {
        return res.json({ message: "Edit mode is false, redirecting" });    }
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
        res.render('admin/edit-product', {
            pageTitle: "Formulario edición", path: "/admin/add-product", //Entrada de la barra de navegación que vamos a sombrear
            editing: editMode,
            product: product
        });
    } else {
        res.json({ message: "Producto no encontrado" });    
    }

};

// postEditProduct es el nombre de la función que se ejecuta cuando se hace una petición post a /admin/add-product
export const postEditProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = +req.body.price;
    const updatedProduct = new Product(title, imageUrl, description, price, productId);
    console.log('Producto actualizado: ', updatedProduct);
    await updatedProduct.save();
    res.json({ message: "Producto actualizado" });
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.body.productId; 
        const deletedProduct = await Product.deleteById(productId);
        res.json({ message: "Producto eliminado" });
        console.log("Producto borrado");
    }

    export const getEvents = async (req: Request, res: Response) => {
        const events = await Events.fetchAll();
        res.json({ pageTitle: 'Admin Events', path: '/admin/events', events: events });
    };
    
    export const getAddEvent = (req: Request, res: Response, next: NextFunction) => {
        console.log("Devolvemos el formulario para agregar eventos");
        res.json({ pageTitle: "Formulario de Evento", path: "/admin/add-event", editing: false });
    };
    
    export const postAddEvent = async (req: Request, res: Response, next: NextFunction) => {
        const title = req.body.title;
        const description = req.body.description;
        const fecha = req.body.fecha;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        if (req.body.title) {
            const event = new Events(title, imageUrl, description, price, fecha);
            await event.save();
        }
        res.json({ message: "Evento añadido" });
    };
    
    
    
    export const postEditEvent = async (req: Request, res: Response, next: NextFunction) => {
        const eventId = req.body.eventId;
        const title = req.body.title;
        const description = req.body.description;
        const fecha = req.body.fecha;
        const imageURL = req.body.imageURL;
        const price = req.body.price;
        const events = new Events(title, imageURL, description, price, fecha, eventId);
        await events.save();
        res.json({ message: "Event updated successfully" });
    };
    
    export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
        const eventId = req.body.eventId;
        const deletedEvent = await Events.deleteById(eventId);
        res.json({ message: "Event deleted successfully" });
    };