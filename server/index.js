import express, { json, urlencoded } from "express";
import connection  from "./database/connection.js";
import { CLIENT_URL, PORT } from "./config.js";
import cors from "cors"; 

/**
 * Punto de entrada del servidor Express.
 * Configura middlewares, establece conexión a la base de datos,
 * define las rutas de la API y lanza el servidor en el puerto definido.
*/

// Inicializa la aplicación de Express
const app = express();

// Establece conexión con la base de datos MongoDB
connection();

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: CLIENT_URL,
}));

console.log(CLIENT_URL);

// Middlewares para interpretar datos en formato JSON y formularios
app.use(json());
app.use(urlencoded({ extended: true }));

// Importación de las rutas relacionadas con artículos
import rutas_articulo from "./routes/articles.js";

// Registro de rutas bajo el prefijo /api
app.use("/api", rutas_articulo);

// Arranque del servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});