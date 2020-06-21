/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMemo, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";

const PlaintextEditor = () => {
  const [value, setValue] = useState<Node[]>(initialState);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable placeholder="Start writing..." />
    </Slate>
  );
};

const initialState: Node[] = [
  {
    children: [{ text: "" }],
  },
];

export default PlaintextEditor;
