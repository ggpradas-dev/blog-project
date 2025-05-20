# Blog Project 📘

Aplicación web tipo blog desarrollada como proyecto personal y académico, con el objetivo de consolidar habilidades prácticas en desarrollo web full stack utilizando el stack MERN. La aplicación permite crear, leer, actualizar y eliminar artículos, con posibilidad de incluir imágenes, todo desde una interfaz moderna y responsive.

---

## 🛠 Tecnologías utilizadas

### Frontend
- **React**: Biblioteca principal para construir la interfaz de usuario.
- **React Router DOM**: Enrutamiento SPA sin recargas de página.
- **React Toastify**: Notificaciones tipo "toast".
- **DOMPurify**: Sanitización de HTML para evitar XSS.
- **TipTap Editor**: Editor de texto enriquecido modular.
- **Vite**: Bundler y servidor de desarrollo ultrarrápido.
- **CSS**: Diseño responsive con enfoque mobile-first.

### Backend
- **Node.js & Express**: Plataforma de servidor y framework para construir la API REST.
- **MongoDB & Mongoose**: Base de datos NoSQL y ODM para modelado de datos.
- **Firebase Storage**: Almacenamiento en la nube para imágenes.
- **Multer**: Middleware para subir archivos.
- **Validator**: Validación y sanitización de datos.
- **CORS, dotenv, Firebase Admin**: Seguridad, configuración y conexión a servicios externos.

---

## 🧱 Estructura del proyecto

### Frontend
- `src/`
  - `components/`: Componentes reutilizables divididos por función (layout, páginas, UI, etc.).
  - `styles/`: Estilos CSS globales.
  - `helpers/`: Funciones auxiliares como peticiones AJAX.
  - `hooks/`: Hooks personalizados.
  - `routes/`: Sistema de navegación interna con React Router.
  - `App.js` / `main.js`: Punto de entrada y renderizado principal.

### Backend
- `controllers/`: Lógica de negocio (CRUD de artículos).
- `models/`: Esquemas de datos con Mongoose.
- `routes/`: Definición de endpoints RESTful.
- `index.js`: Configuración principal del servidor Express.

---

## 🔍 Funcionalidades principales

- ✍️ Crear, leer, actualizar y eliminar artículos (CRUD).
- 🖼 Subida de imágenes con integración a Firebase Storage.
- 🔎 Búsqueda de artículos por título o contenido.
- 💡 Editor de texto enriquecido con TipTap.
- 🌙 Alternancia de tema (claro/oscuro).
- 📱 Diseño responsive (mobile-first).

---

## 🚀 Despliegue en producción

La aplicación está desplegada en Render:

- **Frontend**: Servicio estático.
- **Backend/API**: Servicio web con variables de entorno configuradas.
- **Base de datos**: MongoDB Atlas.
- **Imágenes**: Firebase Storage.

---

## 🔒 Posibles mejoras

- 🧠 Generación automática de artículos con IA.
- 🔐 Autenticación de usuarios para limitar el CRUD a los usuarios autenticados.
- 💬 Comentarios y reacciones en los artículos a modo de red social.
- 🗂 Categorización temática de artículos.
- 📝 Mejorar las funcionalidades de personalización para el editor de texto.

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de un Trabajo de Fin de Grado y puede ser utilizado para fines educativos y de portafolio personal. No se permite su uso comercial sin autorización.

---

## 🌐 Demo

Puedes probar la aplicación desde:  
[**blog-project-q767.onrender.com**](https://blog-project-q767.onrender.com)

---

## 📚 About (EN)

Blog-style web application developed as the final project of an Advanced Vocational Training program, built with the MERN stack and deployed to Render.

---

## 🏷️ Topics

`nodejs` • `reactjs` • `express` • `mongodb-atlas` • `firebase-storage` • `css` • `mern-stack`
