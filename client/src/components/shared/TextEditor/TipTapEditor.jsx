import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline'
import Bold from "/src/assets/icons/format-bold.svg?react";
import Italic from "/src/assets/icons/format-italic.svg?react";
import Strike from "/src/assets/icons/format-strikethrough.svg?react";
import Underlined from "/src/assets/icons/format-underlined.svg?react";
import ListBulleted from "/src/assets/icons/list-bulleted.svg?react";
import ListNumbered from "/src/assets/icons/list-numbered.svg?react";
import "./tiptapeditor.css";


/**
 * Componente `TipTapEditor`
 *
 * Editor de texto enriquecido basado en Tiptap.
 * - Permite edición con formato (negrita, cursiva, subrayado, listas, etc.).
 * - Devuelve el contenido en formato JSON serializado vía `onChange`.
 * - Acepta contenido inicial como JSON o HTML a través de `defaultValue`.
 */
export const TipTapEditor = ({ onChange, defaultValue }) => {

  const editor = useEditor({
    extensions: [ StarterKit, Underline],
    content: '',
    onUpdate: ({ editor }) => {
      const currentJSON = editor.getJSON()
      onChange(JSON.stringify(currentJSON))
    },
    editorProps: {
      handlePaste(view, event) {
        event.preventDefault();
      
        const text = event.clipboardData.getData('text/plain');
      
        // Inserta directamente el texto sin decodificaciones dudosas
        view.dispatch(view.state.tr.insertText(text));
      
        return true;
      },
    },
  });

  // Establece contenido inicial en base a `defaultValue`
  useEffect(() => {
    if (!editor) return

    if (!defaultValue) {
      editor.commands.setContent('')
      return
    }

    try {
      // Intentamos parsear como JSON de TipTap
      const parsedJSON = JSON.parse(defaultValue);
      editor.commands.setContent(parsedJSON);
    } catch (error) {
      // Si falla, asumimos que es HTML
      editor.commands.setContent(defaultValue)
    }
  }, [defaultValue, editor])

  if (!editor) return null

  return (
    <div className="editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

/**
 * Subcomponente `Toolbar`
 *
 * Renderiza una barra de herramientas con botones para aplicar formato al texto:
 * negrita, cursiva, subrayado, tachado y listas (ordenadas/no ordenadas).
 */
const Toolbar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="menu-bar">
      <button
        className={`btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </button>

      <button
        type="button"
        className={`btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </button>

      <button
        type="button"
        className={`btn ${editor.isActive('underline') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underlined />
      </button>


      <button
        type="button"
        className={`btn ${editor.isActive('strike') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strike />
      </button>


      <button
        type="button"
        className={`btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListBulleted />
      </button>

      <button
        type="button"
        className={`btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListNumbered />
      </button>
    </div>
  );
};