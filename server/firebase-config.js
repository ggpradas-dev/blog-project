import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { STORAGE_BUCKET, FIREBASE_CREDENTIALS } from "./config.js"; 

/**
 * Configura e inicializa Firebase Admin SDK para habilitar funcionalidades
 * del lado del servidor como la gestión de archivos en Firebase Storage.
 * Esta configuración permite subir, leer y eliminar archivos desde el backend
 * usando el bucket especificado.
*/

// Convierte la URL del módulo actual en una ruta de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parseo de las credenciales del servicio Firebase desde un string JSON
const serviceAccount = JSON.parse(FIREBASE_CREDENTIALS);

// Inicializa la app de Firebase Admin con las credenciales y el bucket de almacenamiento
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: STORAGE_BUCKET
});

// Referencia al bucket de Firebase Storage para operaciones con archivos
const bucket = admin.storage().bucket();

export { admin, bucket };