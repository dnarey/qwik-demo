// This pragma is required so that React JSX is used instead of Qwik JSX
/** @jsxImportSource react */

import Editor from "@monaco-editor/react";

import { qwikify$ } from "@builder.io/qwik-react";
import { useState } from "react";

interface SnippetEditFormProps {
  snippetCode: string;
  onChange: (code: string) => void;
}

function SnippetEditForm({ snippetCode, onChange }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippetCode);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
    onChange(value);
  };

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippetCode || ""}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
        value={code}
      />
    </div>
  );
}

export const QSnippetEditForm = qwikify$(SnippetEditForm);
