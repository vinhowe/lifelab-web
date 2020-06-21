/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Issue, IssueEdits } from "../../../types/issue";
import IssueStateIndicator from "../../../components/IssueStateIndicator";
import Page from "../../../components/Page";
import PlaintextEditor from "../../../components/PlaintextEditor";
import Button, { ButtonColors } from "../../../components/Button";
import { getIssue, updateIssue } from "../../../services/issueApi";

const issueTitleInputStyle = css`
  background: none;
  border: 1px solid #ccc;
  font-size: x-large;
  border-radius: 4px;
  margin: 15px 0;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  box-shadow: rgba(80, 80, 80, 0.1) 0 2px;
  padding: 4px 12px;
`;

const issueHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const issueSubheadingContainerStyle = css`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: solid #ccc 1px;
`;

const editButtonsContainerStyle = css`
  button {
    margin-left: 8px;
  }
`;

const issueSubheadingExtraInfoStyle = css`
  margin-left: 8px;
`;

export default function LabIssuePage(): JSX.Element {
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

  const loadIssue = async (): Promise<void> => {
    setIssue(await getIssue(labId, issueNumber));
  };

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    loadIssue();
  }, []);

  return (
    <Page>
      {issue && (
        <div>
          <div css={issueHeadingContainerStyle}>
            {editing ? (
              <input
                type="text"
                css={issueTitleInputStyle}
                value={issueEdits?.title || issue.title}
                onChange={({ target: { value: title } }) =>
                  title !== issue.title &&
                  setIssueEdits({ ...issueEdits, title })
                }
              />
            ) : (
              <h2>{issue.title}</h2>
            )}
            <div css={editButtonsContainerStyle}>
              <Button
                onClick={() => toggleEditing()}
                color={editing ? ButtonColors.green : undefined}
              >
                {editing ? "Save" : "Edit"}
              </Button>
              {editing && (
                <Button
                  color={ButtonColors.red}
                  onClick={() => setIssueEdits(undefined)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
          <div css={issueSubheadingContainerStyle}>
            <IssueStateIndicator state={issue.state} />
            <span css={issueSubheadingExtraInfoStyle}>
              Created {new Date(issue.created).toDateString()}
            </span>
          </div>
          {editing ? (
            <PlaintextEditor
              value={issueEdits?.description || issue.description}
              onChange={(description) =>
                setIssueEdits({ ...issueEdits, description })
              }
            />
          ) : (
            <p>{issue.description}</p>
          )}
        </div>
      )}
    </Page>
  );
}
