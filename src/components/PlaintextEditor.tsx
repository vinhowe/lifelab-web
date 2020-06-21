/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useMemo, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";

const editorStyle = css`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  font-size: 80%;
  font-family: "Jetbrains Mono", monospace;
  box-shadow: rgba(80, 80, 80, 0.1) 0 2px;
`;

const deserialize = (value: string): Node[] => {
  return value.split("\n").map((stringNode) => ({
    children: [{ text: stringNode }],
  }));
};

const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

export default function PlaintextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState<Node[]>([]);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    setInternalValue(deserialize(value));
  }, [value]);

  const onChangeHandler = (newValue: Node[]) => {
    setInternalValue(newValue);
    const newFlatValue = serialize(newValue);
    // We have to check if the value actually changed so that selection information isn't overwritten whenever the
    //  cursor moves.
    if (newFlatValue !== value) {
      onChange(newFlatValue);
    }
  };

  return (
    <Slate editor={editor} value={internalValue} onChange={onChangeHandler}>
      <Editable placeholder="Start writing..." css={editorStyle} />
    </Slate>
  );
}

const initialState: Node[] = [
  {
    children: [{ text: "" }],
  },
];
