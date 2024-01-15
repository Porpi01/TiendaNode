import { Router } from "express";

export const shopRouter = Router();



shopRouter.get('/saludo', (request, response, next) => {
    response.render("prueba", { nombre: "Monica" }); //Renderiza la vista prueba.ejs
});

shopRouter.get('/', (request, response, next) => {
    response.render("shop", { pageTitle:'Tienda', path:'/', prods:[{title:'Tetera'},{title:'Moto Moto'}] });
});