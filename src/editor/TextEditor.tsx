import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Icons
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
   useEffect(() => {
    if (editor && value === "") {
      editor.commands.clearContent();
    }
  }, [value, editor]);
  if (!editor) return null;
  const buttonStyle = (active: boolean) =>
    `p-2 rounded-lg border transition-all
    ${active ? "bg-blue-100 border-blue-400 text-blue-700" : "bg-white hover:bg-gray-100"}
  `;
  return (
    <div className="border rounded-xl shadow-sm">
      {/* Stylish Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-50 rounded-t-xl">

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonStyle(editor.isActive("bold"))}
        >
          <Bold size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonStyle(editor.isActive("italic"))}
        >
          <Italic size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={buttonStyle(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonStyle(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonStyle(editor.isActive("bulletList"))}
        >
          <List size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonStyle(editor.isActive("orderedList"))}
        >
          <ListOrdered size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={buttonStyle(false)}
        >
          <Undo size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={buttonStyle(false)}
        >
          <Redo size={18} />
        </button>
      </div>

      {/* Editor Box */}
       <EditorContent
      editor={editor}
      className="
        w-full min-h-[140px]
        p-2
        border border-gray-300
        rounded
        focus:outline-none
      "
    />
    </div>
  );
};

export default TextEditor;
