import { Router } from "express";
import multer from "multer";
import {
  createArticles,
  getArticles,
  getOneArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
  showImage,
  search
} from "../controllers/articles.js";

/**
 * Define las rutas principales de la API para gestionar artículos.
 * Incluye operaciones CRUD, subida de imágenes y búsquedas.
 * Utiliza Multer para la gestión de archivos en memoria (compatible con Firebase Storage).
*/

// Inicialización del enrutador de Express
const router = Router();

// Configuración de Multer para almacenar archivos en memoria
const storage = multer.memoryStorage();

// Filtro para aceptar solo archivos de imagen
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    console.error("Archivo rechazado:", file.mimetype);
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

// Configuración de Multer con tamaño máximo y filtro
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

/**
 * @route POST /nuevo-articulo
 * @description Crea un nuevo artículo.
 */
router.post("/nuevo-articulo", createArticles);

/**
 * @route GET /articulos/:ultimos?
 * @description Obtiene una lista de artículos. Parámetro opcional `ultimos` para filtrar.
 */
router.get("/articulos/:ultimos?", getArticles);

/**
 * @route GET /articulo/:id
 * @description Obtiene un artículo específico por su ID.
 */
router.get("/articulo/:id", getOneArticle);

/**
 * @route DELETE /articulo/:id
 * @description Elimina un artículo por su ID.
 */
router.delete("/articulo/:id", deleteArticle);

/**
 * @route PUT /articulo/:id
 * @description Actualiza un artículo por su ID.
 */
router.put("/articulo/:id", updateArticle);

/**
 * @route POST /nueva-imagen/:id
 * @description Sube una imagen asociada a un artículo.
 */
router.post("/nueva-imagen/:id", upload.single('file'), uploadImage);

/**
 * @route GET /image/:file
 * @description Devuelve una imagen específica almacenada en el servidor.
 */
router.get("/image/:file", showImage);

/**
 * @route GET /search/:string
 * @description Busca artículos que coincidan con el término proporcionado.
 */
router.get("/search/:string", search);

// Middleware para manejo de errores relacionados con Multer
router.use((err, req, res, next) => {
  console.error("Middleware de error:", err.message);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else if (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  next();
});

// Exportación del enrutador para su uso en la aplicación principal
export default router;