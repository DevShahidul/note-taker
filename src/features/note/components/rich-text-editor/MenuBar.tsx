import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";

interface MenuBarProps {
    editor: Editor | null
}

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  const menuOptions = [
    {
      label: "heading 1",
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "heading 2",
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "heading 3",
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Bold",
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      label: "Bullet List",
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      label: "Ordered List",
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      label: "Code block",
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("codeBlock"),
    },
    {
      label: "Highlight text",
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="flex items-center flex-wrap gap-0.5 border px-1 py-0.5 rounded-md rounded-br-none rounded-bl-none">
      {menuOptions.map((item, index) => (
        <Toggle
          key={index}
          pressed={item.preesed}
          onPressedChange={item.onClick}
          aria-label={item.label}
        >
          {item.icon}
        </Toggle>
      ))}
    </div>
  );
}
