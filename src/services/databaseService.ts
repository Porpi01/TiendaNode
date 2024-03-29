import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';


import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Order } from '../models/Orders.js';
import { Events } from '../models/Events.js';



export const collections: {
    products?: mongoDB.Collection<Product>;
    users?: mongoDB.Collection<User>;
    orders?: mongoDB.Collection<Order>;
    events? : mongoDB.Collection<Events>
} = {};

export async function connectToDatabase() {

    dotenv.config(); // Leer fichero .env y cargar variables de entorno
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!); // Crear cliente de MongoDB
    await client.connect(); // Conectar con la base de datos
    const db: mongoDB.Db = client.db(process.env.DB_NAME); // Seleccionar la base de datos

    collections.products = db.collection<Product>(process.env.PRODUCT_COLLECTION!); // Seleccionar la colección de productos
    collections.users = db.collection<User>(process.env.USER_COLLECTION!); // Seleccionar la colección de usuarios
    collections.orders = db.collection<Order>(process.env.ORDER_COLLECTION!); // Seleccionar la colección de pedidos
    collections.events = db.collection<Events>(process.env.EVENTS_COLLECTION!);
    console.log(`Conectado a la base de datos: ${db.databaseName} y la colección: ${collections.products.collectionName}`);
    console.log(`Conectado a la base de datos: ${db.databaseName} y la colección: ${collections.users.collectionName}`);
    console.log(`Conectado a la base de datos: ${db.databaseName} y la colección: ${collections.orders.collectionName}`);
    console.log(`Conectado a la base de datos: ${db.databaseName} y la colección: ${collections.events.collectionName}`);

}