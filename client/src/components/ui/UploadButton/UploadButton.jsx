import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./upload-button.css";

/**
 * Componente `UploadButton`
 *
 * Renderiza un botón personalizado para subir imágenes.
 * Incluye validaciones básicas:
 * - Verifica que se seleccione un archivo.
 * - Asegura que el archivo sea una imagen.
 * - Restringe el tamaño máximo a 5MB.
 *
 * Al seleccionar una imagen válida, muestra su nombre.
 * Se reinicia automáticamente al cambiar el `resetTrigger`.
 */
export const UploadButton = ({ resetTrigger }) => {

  const [isFileClicked, setIsFileClicked] = useState(false); // Indica si el input fue activado
  const [fileName, setFileName] = useState("");              // Nombre del archivo seleccionado

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB.

  /**
   * Maneja el cambio de archivo al seleccionar una imagen.
   * Aplica validaciones de tipo y tamaño.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsFileClicked(true);
    
    if (!file) {
      setFileName("");
      toast.warning("No has seleccionado ningún archivo");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFileName("");
      toast.error("El archivo seleccionado no es una imagen válida");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileName("");
      toast.error("El archivo supera el límite máximo de 5MB");
      return
    }

    setFileName(file.name);
  };

  // Reinicia el estado cuando cambia el trigger externo
  useEffect(() => {
    setIsFileClicked(false);
    setFileName("");
  }, [resetTrigger]);

  return (
    <div>
      {/* Botón visual para seleccionar archivo */}
      <label
        htmlFor="file"
        className="upload-image"
      >
        Subir imagen
      </label>

      {/* Input para elegir el archivo, oculto visualmente. */}
      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Mostramos el nombre del archivo si pasó las validaciones y si ha sido clicado. */}
      {isFileClicked && (
        <div className="file-status">
           {fileName && <>Imagen seleccionada: <strong>{fileName}</strong></>}
        </div>
      )}
    </div>
  );
};