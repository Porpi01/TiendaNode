import { Router } from "express";

export const shopRouter = Router();


shopRouter.use('/', (request, response, next) => {
response.send('<h1>Estamos en la tienda</h1>');


});
shopRouter.get('/saludo', (request, response, next) => {
    response.render("prueba", { nombre: "Monica" }); //Renderiza la vista prueba.ejs
});
