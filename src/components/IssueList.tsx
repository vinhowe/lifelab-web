/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import IssueListItem from "./IssueListItem";
import { Issue } from "../types/issue";
import { listStyle } from "../theme/styles";

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
