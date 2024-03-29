import express, { urlencoded } from "express";
import * as dotenv from "dotenv";

import { rutas } from "./utils/rutas.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { shopRouter } from "./routes/shopRoutes.js";
import { collections, connectToDatabase } from "./services/databaseService.js";
import { User } from "./models/User.js";

console.log("-------------------------");
console.log("Bienvenido a mi app");
dotenv.config(); //Leer fichero .env y cargar variables de entorno

const port = process.env.PORT || 3000; //Puerto donde se ejecuta la app

const app = express(); //Nos trae la app

connectToDatabase() //Conectar con la base de datos y crear un usuario 
    .then(async () => {
        const user = new User("12345678A", "Mateo", "mateo@gmail.com", { calle: "Mercad Nuevo", telf: "123456789", CP: "12345" });
        await user.save()

        console.log("Usuario creado con éxito");
    })

    .then(() => {
        console.log("Conectado a la base de datos");


        //Configurar ejs
        app.set('view engine', 'ejs'); //El sistema de hacer las vistas es ejs.
        app.set('views', rutas.views); //Carpeta donde se encuentran las vistas.
        app.use(urlencoded({ extended: false })); //Middleware para procesar los campos que me envíen por HTTP
        //Urlencoded cuando nos llegue info de un formulario, lo que hace es que lo convierte en un objeto de JS

        app.use(express.static(rutas.public)); //Middleware para servir ficheros estáticos de public
        app.disable('x-powered-by'); //Desactivamos la cabecera X-Powered-By

        //Middleware para cargar el usuario en la request
        app.use(async (request, response, next) => { 
            const user = await collections.users?.findOne({ DNI: '12345678A' });
            request.body.user = new User(user!.DNI, user!.name, user!.mail, user!.contacto, user!.cart, user!._id.toHexString());
            next();
        });


        //Controladores para responder a las peticiones por HTTP

        app.use('/admin', adminRouter); //Middleware para las rutas de admin
        app.use('/', shopRouter); //Middleware para las rutas de shop


        app.use('/', (request, response, next) => {
            console.log("Ruta no encontrada");
            response.render('404', { pageTitle: "Error 404", path: "/404" });
        }); //Middleware error;



        // FIN
        app.listen(port); //Poner en marcha la app
        console.log("Servidor de la app en marcha");
        console.log(`Página disponible en: http://localhost:${port}`)

    })
    .catch((error) => {
        console.log("Error al conectar con la base de datos");
        console.log(error);
    });
console.log("---------FIN-----------");

