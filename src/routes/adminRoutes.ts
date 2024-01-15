import { Router } from "express";

export const adminRouter = Router();

//todsas las rutas que lleguen aquí empiezan por /admin

adminRouter.get('/add-product', (request, response, next) => {
    console.log("Devolvemos el formulario para meter productos")
    response.send('<form action="/admin/product" method="POST"><input type="text" name="nombre"><button type="submit">Enviar</button></form>');
});

adminRouter.post('/product', (request, response, next) => {
    if(request.body.nombre){
        console.log("Producto añadido:", request.body.nombre);  
    }
    response.redirect('/coche');
 });
 