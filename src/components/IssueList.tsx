/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import IssueListItem from "./IssueListItem";
import { Issue } from "../types/issue";

const listStyle = css`
  > * {
    border: solid #ccc 1px;
    border-top: none;
    transition: background-color 60ms ease-out;
  }

  > *:hover {
    background-color: #f0f0f0;
  }

  > *:first-child {
    border-top: solid #ccc 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  > *:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export default function IssueList({
  issues,
  labId,
}: {
  issues: Issue[];
  labId: number;
}): JSX.Element {
  return (
    <div css={listStyle}>
      {issues.length > 0 &&
        issues.map((issue, index) => (
          <IssueListItem key={index} issue={issue} labId={labId} />
        ))}
    </div>
  );
}
