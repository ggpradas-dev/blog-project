import { connect } from "mongoose";
import { MONGO_URI }  from "../config.js";

/**
 * Establece la conexión con MongoDB Atlas usando Mongoose.
 * Configura la API del servidor con opciones modernas y maneja errores de conexión.
*/

// Opciones de cliente para la conexión con MongoDB
const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

/**
 * Función asíncrona que conecta la aplicación a la base de datos MongoDB.
 * Utiliza las opciones configuradas para asegurar compatibilidad y control de errores.
 */
const connection = async () => {
  try {
    await connect(MONGO_URI, clientOptions);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// Exporta la función para ser usada en el arranque del servidor
export default connection;