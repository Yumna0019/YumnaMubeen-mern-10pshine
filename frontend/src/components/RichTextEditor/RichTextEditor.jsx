import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";

const RichTextEditor = ({ content, onChange, className = "" }) => {
  const [editorState, setEditorState] = useState({});

  const editor = useEditor({
    extensions: [StarterKit, Underline, Code],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      updateEditorState(editor); 
    },
    onSelectionUpdate: ({ editor }) => {
      updateEditorState(editor);
    },
    editorProps: {
      attributes: {
        class: "min-h-[120px] outline-none p-2",
      },
    },
  });

  // Update state when editor mounts or selection changes
  const updateEditorState = (editor) => {
    setEditorState({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      strike: editor.isActive("strike"),
      code: editor.isActive("code"),
      bulletList: editor.isActive("bulletList"),
    });
  };

  useEffect(() => {
    if (editor) {
      updateEditorState(editor);
    }
  }, [editor]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) return null;

  const buttonClass = (active) =>
    `px-2 py-1 rounded text-sm ${
      active ? "bg-blue-500 text-white" : "bg-gray-200"
    }`;

  return (
    <div className={`${className} border rounded`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <button
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            updateEditorState(editor);
          }}
          className={buttonClass(editorState.bold)}
        >
          B
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
            updateEditorState(editor);
          }}
          className={buttonClass(editorState.italic)}
        >
          I
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
            updateEditorState(editor);
          }}
          className={buttonClass(editorState.underline)}
        >
          U
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
            updateEditorState(editor);
          }}
          className={buttonClass(editorState.strike)}
        >
          S
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleCode().run();
            updateEditorState(editor);
          }}
          className={buttonClass(editorState.code)}
        >
          {"</>"}
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
            updateEditorState(editor);
          }}
          className={buttonClass(editorState.bulletList)}
        >
          • List
        </button>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
