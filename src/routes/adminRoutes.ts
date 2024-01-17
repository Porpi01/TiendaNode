import { Router } from "express";

export const adminRouter = Router();

export const productos: {
    title: string,
    imageUrl: string,
    description: string,
    price: number
}[] = [];

//todsas las rutas que lleguen aquí empiezan por /admin

adminRouter.get('/add-product', (request, response, next) => {
    console.log("Devolvemos el formulario para meter productos")
    //response.send('<form action="/admin/product" method="POST"><input type="text" name="nombre"><button type="submit">Enviar</button></form>');
    response.render("add-product", { pageTitle: 'Añadir producto', path: '/admin/add-product' });
});

adminRouter.post('/add-product', (request, response, next) => {
    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const description = request.body.description;
    const price = +request.body.price;
  

    if (request.body.title) {
        console.log("Producto añadido:", request.body.title);
        productos.push({
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price
        });

    }

    console.log(productos);
    response.redirect('/');
});
