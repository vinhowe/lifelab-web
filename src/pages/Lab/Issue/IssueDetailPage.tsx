/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Prompt, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Issue, IssueEdits, IssueState } from "../../../types/issue";
import IssueStateIndicator from "../../../components/IssueStateIndicator";
import PageWidth from "../../../components/PageWidth";
import Button from "../../../components/Button";
import { getIssue, updateIssue } from "../../../services/issueApi";
import TextField from "../../../components/TextField";
import ReactMarkdown from "react-markdown";
import EditPreview from "../../../components/EditPreview/EditPreview";
import preventUnloadEventHandler from "../../../utilities/preventUnloadEventHandler";

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
      window.addEventListener("beforeunload", preventUnloadEventHandler);
      return;
    }

    window.removeEventListener("beforeunload", preventUnloadEventHandler);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.keys(issueEdits as any).length > 0) {
      const updatedIssue = await updateIssue(labId, issueNumber, issueEdits);
      setIssue(updatedIssue);
    }

    setIssueEdits(undefined);
  };

  const cancelEdits = () => {
    setIssueEdits(undefined);
    // noinspection JSIgnoredPromiseFromCall
    toggleEditing();
  };

  useEffect(() => {
    getIssue(labId, issueNumber).then(setIssue);
  }, []);

  return (
    <PageWidth>
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
                <Button onClick={toggleEditing}>Save</Button>
                <Button onClick={cancelEdits}>Cancel</Button>
              </div>
            ) : (
              <div css={editButtonsContainerStyle}>
                <Button onClick={toggleEditing}>Edit</Button>
              </div>
            )}
          </div>
          <div css={issueSubheadingContainerStyle}>
            <IssueStateIndicator state={issueEdits?.state || issue.state} />
            {editing && (
              <span style={{ marginLeft: "10px" }}>
                <Button
                  onClick={() =>
                    setIssueEdits({
                      ...issueEdits,
                      state:
                        (issueEdits || issue).state === IssueState.OPEN
                          ? IssueState.CLOSED
                          : IssueState.OPEN,
                    })
                  }
                >
                  {(issueEdits || issue).state === IssueState.OPEN
                    ? "Close"
                    : "Open"}{" "}
                  this issue
                </Button>
              </span>
            )}
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
      <Prompt
        message="You have unsaved work. Are you sure you want to leave?"
        when={editing}
      />
    </PageWidth>
  );
}
