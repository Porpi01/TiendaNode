import express from "express";

console.log("-------------------------");
console.log("Bienvenido a mi app");

const port = 3000; //Puerto para recibir peticiones

const app = express(); //Nos trae la app

//Controladores para responder a las peticiones por HTTP

// FIN
app.listen(port); //Poner en marcha la app
console.log("Servidor de la app en marcha")