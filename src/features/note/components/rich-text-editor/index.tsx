import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from "@tiptap/extension-code-block";
import { MenuBar } from "./MenuBar";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
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
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none border-input focus:shadow-none focus:outline-0 focus-visible:ring-ring/50 focus-visible:ring-0 min-h-16 w-full rounded-md rounded-tl-none rounded-tr-none border px-3 py-2 hover:bg-gray-50",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });

  return (
    <div className="group rounded-md border border-transparent has-[.ProseMirror-focused]:border-purple-400">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
