/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PlaintextEditor, { PlaintextEditorProps } from "../PlaintextEditor";
import { useState } from "react";
import EditPreviewTab from "./EditPreviewTab";
import ReactMarkdown from "react-markdown";

export type EditPreviewProps = PlaintextEditorProps;

enum EditPreviewState {
  Edit,
  Preview,
}

const containerStyle = css`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: rgba(80, 80, 80, 0.1) 0 2px;
`;

const tabsContainerStyle = css`
  display: flex;
  border-bottom: solid #ccc 1px;
  margin-bottom: 8px;
  margin-left: -8px;
  margin-right: -8px;
  padding-left: 8px;
  padding-right: 8px;
`;

const previewStyle = css`
  margin-left: 8px;
  margin-right: 8px;
`;

export default function EditPreview(props: EditPreviewProps): JSX.Element {
  const [editPreviewState, setEditPreviewState] = useState<EditPreviewState>(
    EditPreviewState.Edit
  );
  return (
    <div css={containerStyle}>
      <div css={tabsContainerStyle}>
        <EditPreviewTab
          active={editPreviewState === EditPreviewState.Edit}
          onClick={() => setEditPreviewState(EditPreviewState.Edit)}
        >
          Edit
        </EditPreviewTab>
        <EditPreviewTab
          active={editPreviewState === EditPreviewState.Preview}
          onClick={() => setEditPreviewState(EditPreviewState.Preview)}
        >
          Preview
        </EditPreviewTab>
      </div>
      <div>
        {editPreviewState === EditPreviewState.Edit && (
          <PlaintextEditor {...props} />
        )}
        {editPreviewState === EditPreviewState.Preview && (
          <ReactMarkdown css={previewStyle}>
            {props.value || "_Nothing here_"}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
