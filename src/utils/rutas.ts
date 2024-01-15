//Se encargará de manejar las rutas de la aplicación

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const base = dirname(fileURLToPath(import.meta.url)); //Obtenemos la ruta base de la aplicación

//Exportamos las rutas
export const rutas = {
    base:join(base, ".."), //Ruta base de la aplicación
    views: join(base, '..' ,'views'), //Ruta de las vistas
    public: join(base, '..', 'public') //Ruta de los ficheros estáticos
}