import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from "@tiptap/extension-code-block";
import { MenuBar } from "./MenuBar";
import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  content: string | object;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange}: RichTextEditorProps) {
    const isInitialMount = useRef(true);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "hover:bg-purple-500 hover:text-white",
        },
      }),
      CodeBlock.configure({
        enableTabIndentation: true,
        tabSize: 2,
        HTMLAttributes: {
          class: "bg-primary text-white p-3 rounded-sm",
        },
      }),
    ],
    content: content || "",
    autofocus: 'end',
    editorProps: {
      attributes: {
        class:
          "prose prose-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_li>p]:my-0 [&_ul]:my-2 [&_ol]:my-2 max-w-none border-input focus:shadow-none focus:outline-0 focus-visible:ring-ring/50 focus-visible:ring-0 min-h-16 w-full rounded-md rounded-tl-none rounded-tr-none border px-3 py-2 hover:bg-gray-50",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });

  useEffect(() => {
    if (!editor || !content) return;

    if(isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }

    // Avoid unnecessary updates if content is the same
    const currentContent = JSON.stringify(editor.getJSON());
    const newContent =
      typeof content === "string" ? content : JSON.stringify(content);

    if (currentContent !== newContent) {
      try {
        const parsedContent =
          typeof content === "string" ? JSON.parse(content) : content;
        editor.commands.setContent(parsedContent, {
          emitUpdate: false,
        });
      } catch (error) {
        console.error("Failed to parse content: ", error);
        editor.commands.setContent(content, {
          emitUpdate: false,
        });
      }
    }
  }, [content, editor]);

  //   Cleanup on unmount
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if(!editor) {
    return null;
  }

  return (
    <div className="group rounded-md border border-transparent has-[.ProseMirror-focused]:border-purple-400">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
