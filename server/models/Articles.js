import { Schema, model } from "mongoose";

/**
 * Esquema de Mongoose para la colección de artículos.
 * Define la estructura y las reglas de validación para cada documento.
 */
const ArticleSchema = new Schema(
  {
    // Título del artículo (requerido)
    title: {
      type: String,
      required: true
    },

    // Contenido del artículo (requerido)
    content: {
      type: String,
      required: true
    },

    // Fecha de creación del artículo (valor por defecto: fecha actual)
    date: {
      type: Date,
      default: Date.now
    },

    // Autor del artículo (requerido)
    writer: {
      type: String,
      required: true
    },

    // Nombre del archivo de imagen asociado (valor por defecto: "default.png")
    image: {
      type: String,
      default: "default.png"
    }
  }
);

/**
 * Exporta el modelo 'Articles' basado en el esquema definido.
 * Este modelo se conecta a la colección 'articles' de la base de datos.
 */
export default model("Articles", ArticleSchema, "articles");