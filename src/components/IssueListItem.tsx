/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import IssueStateIndicator from "./IssueStateIndicator";
import { Link } from "react-router-dom";
import { Issue } from "../types/issue";
import { listItemContainerStyle } from "../theme/styles";

export default function IssueListItem({
  issue: { title, state, number },
  labId,
}: {
  issue: Issue;
  labId: number;
}): JSX.Element {
  return (
    <div css={listItemContainerStyle}>
      <Link to={`/labs/${labId}/issues/${number}`}>{title}</Link>
      <IssueStateIndicator state={state} small />
    </div>
  );
}
