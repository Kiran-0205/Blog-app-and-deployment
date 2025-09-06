import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  placeholder?: string;
  initialContent?: string;   // HTML
  onChangeHTML: (html: string) => void;
};

// ...imports unchanged

export default function TextEditor({
  placeholder = "Write here…",
  initialContent = "",
  onChangeHTML,
}: Props) {
  const MAX_WORDS = 1000;
  const [tick, setTick] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        strike: false,
        code: false,
        blockquote: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: "", // start empty; we'll hydrate below
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose w-full min-h-[280px] focus:outline-none px-3 py-3",
      },
    },
    onUpdate({ editor }) {
      const words = editor.getText().trim().split(/\s+/).filter(Boolean);
      if (words.length <= MAX_WORDS) {
        onChangeHTML(editor.getHTML());
      } else {
        editor.commands.undo();
      }
    },
  });

  // ✅ Hydrate whenever initialContent changes and differs from current doc
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML(); // often "<p></p>" when visually empty
    if (initialContent !== undefined && initialContent !== current) {
      editor.commands.setContent(initialContent, { emitUpdate: false });
    }
  }, [editor, initialContent]);

  // Make toolbar react immediately
  useEffect(() => {
    if (!editor) return;
    const rerender = () => setTick((t) => t + 1);
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    editor.on("update", rerender);
    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
      editor.off("update", rerender);
    };
  }, [editor]);

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor) {
    return (
      <textarea
        placeholder={placeholder}
        className="w-full border rounded-lg p-3 text-sm text-gray-800 min-h-[280px]"
        onChange={(e) => onChangeHTML(e.target.value)}
        defaultValue={initialContent}
      />
    );
  }

  const wordCount = editor.getText().trim().split(/\s+/).filter(Boolean).length || 0;

  return (
    <div className="border rounded-lg" data-tick={tick}>
      <div className="flex flex-wrap items-center gap-2 p-2 border-b bg-gray-50">
        <Btn
          label="B"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <Btn
          label="I"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <Btn
          label="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <div className="ml-auto text-xs text-gray-500">{wordCount}/1000 words</div>
      </div>
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}

// Btn component unchanged


function Btn({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 rounded text-sm border ${
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
