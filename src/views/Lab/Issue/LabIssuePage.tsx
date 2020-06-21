/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Issue } from "../../../types/issue";
import IssueStateIndicator from "../../../components/IssueStateIndicator";
import Page from "../../../components/Page";
import PlaintextEditor from "../../../components/MarkdownEditor";
import Button from "../../../components/Button";

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

const issueSubheadingExtraInfoStyle = css`
  margin-left: 8px;
`;

export default function LabIssuePage(): JSX.Element {
  const { labId, issueNumber } = useParams();
  const [issue, setIssue] = useState<Issue>();

  const loadIssue = async (): Promise<void> => {
    const loadedIssue: Issue = (
      await axios.get(
        `http://localhost:8000/api/dev/labs/${labId}/issues/${issueNumber}`
      )
    ).data;
    setIssue(loadedIssue);
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
            <h2>{issue.title}</h2>
            <Button onClick={() => null}>Edit</Button>
          </div>
          <div css={issueSubheadingContainerStyle}>
            <IssueStateIndicator state={issue.state} />
            <span css={issueSubheadingExtraInfoStyle}>
              Created {new Date(issue.created).toDateString()}
            </span>
          </div>
          <p>{issue.description}</p>
          <PlaintextEditor />
        </div>
      )}
    </Page>
  );
}
