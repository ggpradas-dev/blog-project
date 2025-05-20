import articleValidator from "../helpers/validators.js";
import Articles from "../models/Articles.js";
import { bucket } from "../firebase-config.js";

// articles.js (controladores)
/**
 * Controladores principales del blog.
 * Gestionan operaciones relacionadas con artículos: creación, obtención, actualización,
 * eliminación, búsqueda y gestión de imágenes en Firebase Storage.
*/

/**
 * Crea un nuevo artículo en la base de datos.
 *
 * - Valida los datos recibidos usando `articleValidator`.
 * - Crea una instancia del modelo `Articles` y la guarda en MongoDB.
 *
 * @route POST /nuevo-articulo
 * @returns {Promise<void>} Respuesta JSON con el artículo creado o mensaje de error.
 */
export const createArticles = async (req, res) => {
  const params = req.body;

  // Validar entrada.
  try {
    articleValidator(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message
    });
  }

  // Crea y guarda el nuevo artículo.
  try {
    const article = new Articles(params);
    const newArticle = await article.save();

    return res.status(200).json({
      status: "success",
      article: newArticle,
      message: "Artículo creado exitosamente."
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "No se ha guardado el artículo"
    });
  }
};


/**
 * Obtiene una lista de artículos desde la base de datos.
 *
 * - Si se incluye el parámetro opcional `ultimos` en la URL, limita el resultado a los 3 artículos más recientes.
 * - Ordena los artículos por fecha de creación en orden descendente.
 *
 * @route GET /articulos/:ultimos?
 * @returns {Promise<void>} Respuesta JSON con los artículos encontrados o mensaje de error.
 */
export const getArticles = async (req, res) => {
  try {
    // Inicializa la consulta base, ordenando por fecha descendente
    let query = Articles.find({}).sort({ date: -1 });

    // Si se especifica 'ultimos', limita la consulta a los 3 más recientes
    if (req.params.ultimos) {
      query = query.limit(3);
    }

    // Ejecutar la consulta
    const articles = await query;

    // Si no hay artículos encontrados
    if (!articles || articles.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado artículos.",
      });
    }

    // Respuesta exitosa con los artículos
    return res.status(200).json({
      status: "success",
      params_url: req.params.ultimos,
      articles
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los artículos.",
    });
  }
};


/**
 * Obtiene un artículo específico por su ID desde la base de datos.
 *
 * - Utiliza el ID proporcionado en la URL para buscar el artículo correspondiente.
 * - Devuelve el artículo si se encuentra, o un error si no existe.
 *
 * @route GET /articulo/:id
 * @returns {Promise<void>} Respuesta JSON con el artículo o mensaje de error.
 */
export const getOneArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    // Buscar el artículo por ID
    const article = await Articles.findById(articleId);

    // Verifica si se encontró el artículo
    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado el artículo.",
      });
    }

    // Respuesta exitosa con el artículo encontrado
    return res.status(200).json({
      status: "success",
      article
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el artículo.",
    });
  }
};


/**
 * Actualiza un artículo existente en la base de datos a partir de su ID.
 *
 * - Valida los datos recibidos en el cuerpo de la solicitud.
 * - Busca el artículo por su ID y lo actualiza con los nuevos datos.
 * - Devuelve el artículo actualizado o un mensaje de error si no se encuentra.
 *
 * @route PUT /articulo/:id
 * @returns {Promise<void>} Respuesta JSON con el artículo actualizado o mensaje de error.
 */
export const updateArticle = async (req, res) => {
    
    const articleId = req.params.id;
    const params = req.body;

    // Se validan los datos que recibimos.
    try {
      articleValidator(params);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }

    try {
    // Buscar y actualizar el artículo
    const updatedArticle = await Articles.findOneAndUpdate(
      { _id: articleId },
      params,
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedArticle) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el artículo para actualizar.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Se ha actualizado el artículo correctamente.",
      updatedArticle,
    });

  } catch (error) {
    console.error("Error en updateArticle:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el artículo.",
    });
  }
};


/**
 * Elimina un artículo de la base de datos junto con su imagen asociada (si aplica).
 *
 * - Busca el artículo por su ID.
 * - Elimina el documento de la base de datos.
 * - Si el artículo tiene una imagen distinta de la predeterminada, también la elimina de Firebase Storage.
 *
 * @route DELETE /articulo/:id
 * @returns {Promise<void>} Respuesta JSON confirmando la eliminación o informando del error.
 */
export const deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    // Buscar el artículo para verificar existencia e imagen asociada
    const article = await Articles.findById(articleId);

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró el artículo para borrar.",
      });
    }

    // Eliminar el artículo de la base de datos.
    await Articles.findByIdAndDelete(articleId);

    // Si hay imagen asociada, la elimina de Firebase Storage
    if (article.image && article.image !== "default.png") {
      const fileRef = bucket.file(`articles/${article.image}`);
      try {
        await fileRef.delete();

      } catch (error) {
        console.error("Error al eliminar la imagen de Firebase: ", error);
        return res.status(500).json({
          status: "error",
          message: "Error al eliminar la imagen asociada al artículo.",
        });
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Se ha borrado el artículo y su imagen.",
    });

  } catch (error) {
    console.error("Error al borrar el artículo:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al borrar el artículo.",
    });
  }
};


/**
 * Sube una imagen para un artículo y actualiza su referencia en la base de datos.
 *
 * - Verifica que se haya enviado un archivo en la solicitud.
 * - Elimina la imagen anterior (si no es la predeterminada).
 * - Sube la nueva imagen al bucket de Firebase Storage.
 * - Actualiza el artículo con el nuevo nombre de imagen.
 * - Genera y devuelve una URL firmada para acceder a la imagen.
 *
 * @route POST /nueva-imagen/:id
 * @returns {Promise<void>} Respuesta JSON con los datos del artículo actualizado y la URL de la imagen.
 */
export const uploadImage = async (req, res) => {

  // Obtener el archivo "file" que fue enviado en la solicitud.
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No se ha incluido ningún archivo."
    });
  }

  const articleId = req.params.id;
  const file = req.file;
  const fileName = `article_${Date.now()}_${file.originalname}`;

  try {
    // Buscar el artículo para verificar si tiene imagen anterior
    const article = await Articles.findById(articleId);

    if(!article) {
      return res.status(404).json({
        status: "error",
        message: "Artículo no encontrado."
      });
    }

    // Eliminar imagen anterior si no es la predeterminada
    if(article.image && article.image !== "default.png") {

      const previousImageRef = bucket.file(`articles/${article.image}`);

      try {
        await previousImageRef.delete();
      } catch (error) {
        console.error("Error al eliminar la imagen anterior de Firebase: ", error);
        return res.status(500).json({
          status: "error",
          message: "Error al eliminar la imagen anterior.",
        });
      }
    }

    // Subir nueva imagen al bucket
    const fileRef = bucket.file(`articles/${fileName}`);
    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype }
    });

    // Generar URL firmada para acceso a la imagen
    const config = {
      action: 'read',
      expires: '03-09-2491' // Fecha muy lejana para que la URL no expire
    };

    // Obtener URL de descarga
    const [downloadURL] = await fileRef.getSignedUrl(config);

    // Actualizar artículo con el nuevo nombre de imagen
    const updatedImage = await Articles.findOneAndUpdate(
      { _id: articleId },
      { image: fileName },
      { new: true }
    );

    // Verificar si la imagen existe
    if (!updatedImage) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró la imagen para actualizar.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Se ha actualizado la imagen correctamente.",
      updatedImage,
      imageUrl: downloadURL
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el artículo.",
    });
  }
};


/**
 * Devuelve una imagen almacenada en Firebase Storage a través de una redirección.
 *
 * - Recibe el nombre del archivo como parámetro en la URL.
 * - Genera una URL firmada para acceso temporal a la imagen.
 * - Redirige al cliente a esa URL.
 *
 * @route GET /image/:file
 * @returns {Promise<void>} Redirección a la URL de la imagen o respuesta JSON con error.
 */
export const showImage = async (req, res) => {
  try {
    const fileName = req.params.file;

    // Referencia al archivo en Firebase Storage
    const fileRef = bucket.file(`articles/${fileName}`);

    // Configuración para generar URL firmada
    const config = {
      action: 'read',
      expires: '03-09-2491' // Fecha muy lejana para asegurar larga disponibilidad
    };

    // Obtener URL de la imagen
    const [downloadURL] =  await fileRef.getSignedUrl(config);

    // Redireccionar a la URL generada
    return res.redirect(downloadURL);

  } catch (error) {
    console.error("Error al obtener la imagen:", error);
     // Manejo del error: imagen no encontrada
    return res.status(404).json({
      status: "error",
      message: "La imagen no existe.",
    });
  }
};


/**
 * Realiza una búsqueda de artículos en la base de datos según un término proporcionado.
 *
 * - Busca coincidencias en los campos `title` y `content` usando expresiones regulares.
 * - La búsqueda es insensible a mayúsculas/minúsculas (flag `i`).
 * - Los resultados se ordenan por fecha en orden descendente.
 *
 * @route GET /search/:string
 * @returns {Promise<void>} Respuesta JSON con los artículos encontrados o mensaje de error.
 */
export const search = async (req, res) => {
  try {
    let stringSearch = req.params.string;

    // Búsqueda con expresiones regulares en título y contenido
    const foundArticles = await Articles.find({
      "$or": [
        { "title": { "$regex": stringSearch, "$options": "i" } },
        { "content": { "$regex": stringSearch, "$options": "i" } }
      ]
    })
    .sort({ date: -1 });

    // Si no se encontraron resultados
    if (!foundArticles || foundArticles.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado coincidencias."
      });
    }

    // Respuesta con los artículos encontrados
    return res.status(200).json({
      status: "success",
      articles: foundArticles
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error en la búsqueda.",
      error
    });
  }
};