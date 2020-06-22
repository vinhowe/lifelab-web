/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Issue, IssueEdits } from "../../../types/issue";
import IssueStateIndicator from "../../../components/IssueStateIndicator";
import Page from "../../../components/Page";
import Button from "../../../components/Button";
import { getIssue, updateIssue } from "../../../services/issueApi";
import TextField from "../../../components/TextField";
import ReactMarkdown from "react-markdown";
import EditPreview from "../../../components/EditPreview/EditPreview";

const issueHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const issueNumberStyle = css`
  color: rgba(0, 0, 0, 0.6);
  font-weight: normal;
`;

const issueSubheadingContainerStyle = css`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: solid #ccc 1px;
`;

const editButtonsContainerStyle = css`
  display: flex;
  button {
    margin-left: 8px;
  }
`;

const issueSubheadingExtraInfoStyle = css`
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.6);
`;

export default function IssueDetailPage(): JSX.Element {
  const { labId, issueNumber } = useParams();
  const [issue, setIssue] = useState<Issue>();
  const [issueEdits, setIssueEdits] = useState<IssueEdits>();
  const editing = issueEdits !== undefined;

  const toggleEditing = async () => {
    if (!editing) {
      setIssueEdits({});
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.keys(issueEdits as any).length > 0) {
      const updatedIssue = await updateIssue(labId, issueNumber, issueEdits);
      setIssue(updatedIssue);
    }

    setIssueEdits(undefined);
  };

  useEffect(() => {
    getIssue(labId, issueNumber).then(setIssue);
  }, []);

  return (
    <Page>
      {issue && (
        <div>
          <div css={issueHeadingContainerStyle}>
            {editing ? (
              <TextField
                value={issueEdits?.title || issue.title}
                style={{ width: "100%" }}
                onChange={(title) =>
                  title !== issue.title &&
                  setIssueEdits({ ...issueEdits, title })
                }
              />
            ) : (
              <h1>
                <span css={issueNumberStyle}>#{issue.number}</span>{" "}
                {issue.title}
              </h1>
            )}
            {editing ? (
              <div css={editButtonsContainerStyle}>
                <Button onClick={() => toggleEditing()}>Save</Button>
                <Button onClick={() => setIssueEdits(undefined)}>Cancel</Button>
              </div>
            ) : (
              <div css={editButtonsContainerStyle}>
                <Button onClick={() => toggleEditing()}>Edit</Button>
              </div>
            )}
          </div>
          <div css={issueSubheadingContainerStyle}>
            <IssueStateIndicator state={issue.state} />
            <span css={issueSubheadingExtraInfoStyle}>
              Created {new Date(issue.created).toDateString()}
            </span>
          </div>
          {editing ? (
            <EditPreview
              value={issueEdits?.description || issue.description}
              onChange={(description) =>
                setIssueEdits({ ...issueEdits, description })
              }
              autoFocus
            />
          ) : (
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          )}
        </div>
      )}
    </Page>
  );
}
