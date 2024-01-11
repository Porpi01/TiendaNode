import express from "express";
import { rutas } from "./utils/rutas.js";

console.log("-------------------------");
console.log("Bienvenido a mi app");

const port = 3000; //Puerto para recibir peticiones

const app = express(); //Nos trae la app

//Configurar ejs
app.set('view engine', 'ejs'); //El sistema de hacer las vistas es ejs.
app.set('views', rutas.views); //Carpeta donde se encuentran las vistas.


//Controladores para responder a las peticiones por HTTP

app.get('/saludo', (request, response, next) => {
    response.render("prueba", {nombre: "Monica"}); //Renderiza la vista prueba.ejs
});

app.get('/automovil',(request, response, next) => {
    console.log("Pasamos por el primer middleware app.get")
    response.redirect('/coche');
});

app.use('/coche',(request, response, next) => { 
    console.log("Peticion recibida"); 
    next(); 
}); //Middleware; 


app.use('/coche',(request, response, next) => { 
    console.log("Estamos en el segundo middleware"); 
    response.send({"message": "ok"});
}); //Middleware;

app.use('/', (request, response, next) => {
    console.log("Middleware del final");
    response.status(404).send({"message": "Mal hecho"});
}); //Middleware error;



// FIN
app.listen(port); //Poner en marcha la app
console.log("Servidor de la app en marcha");

