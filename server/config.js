import { config } from "dotenv"

/**
 * Este archivo centraliza la configuración de variables de entorno para facilitar
 * la gestión de entornos locales y de producción.
*/

// Carga las variables definidas en el archivo .env
config()

// URL del cliente (frontend) permitida para hacer peticiones al servidor
export const CLIENT_URL = process.env.CLIENT_URL;

// Puerto en el que se ejecuta el servidor
export const PORT = process.env.PORT;

// URI de conexión a la base de datos MongoDB (Mongo Atlas)
export const MONGO_URI = process.env.MONGO_URI;

// Nombre del bucket de Firebase Storage
export const STORAGE_BUCKET = process.env.STORAGE_BUCKET;

// Credenciales de Firebase en formato JSON (como string)
export const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS;