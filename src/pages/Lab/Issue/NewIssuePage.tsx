/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import { initialNewIssue, NewIssue } from "../../../types/issue";
import PageWidth from "../../../components/PageWidth";
import Button from "../../../components/Button";
import { createIssue } from "../../../services/issueApi";
import TextField from "../../../components/TextField";
import EditPreview from "../../../components/EditPreview/EditPreview";
import { buttonColors } from "../../../theme/colors";

const issueHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const submitButtonContainerStyle = css`
  margin-left: 8px;
`;

export default function NewIssuePage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  const [issue, setIssue] = useState<NewIssue>(initialNewIssue);

  const validate = () => !!issue.title;

  const postIssue = async (): Promise<void> => {
    if (!validate()) {
      return;
    }

    const newNumber = (await createIssue(labId, issue)).number.toString();

    history.push(`/labs/${labId}/issues/${newNumber}`);
  };

  return (
    <PageWidth>
      {issue && (
        <div>
          <div css={issueHeadingContainerStyle}>
            <TextField
              value={issue.title}
              style={{ width: "100%" }}
              onChange={(title) =>
                title !== issue.title && setIssue({ ...issue, title })
              }
            />
            <div css={submitButtonContainerStyle}>
              <Button
                onClick={() => postIssue()}
                disabled={!validate()}
                color={buttonColors.green}
              >
                Submit
              </Button>
            </div>
          </div>
          <EditPreview
            value={issue?.description || ""}
            onChange={(description) => setIssue({ ...issue, description })}
            autoFocus
          />
        </div>
      )}
    </PageWidth>
  );
}
