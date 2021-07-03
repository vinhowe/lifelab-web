/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import IssueStateIndicator from "./IssueStateIndicator";
import { Link } from "react-router-dom";
import { Issue } from "../types/issue";
import { listItemContainerStyle } from "../theme/styles";

export default function IssueListItem({
  issue: { title, state, number },
  small,
  labId,
}: {
  issue: Issue;
  small?: boolean;
  labId: number;
}): JSX.Element {
  return (
    <div css={listItemContainerStyle(small)}>
      <Link to={`/labs/${labId}/issues/${number}`}>{title}</Link>
      <IssueStateIndicator state={state} small />
    </div>
  );
}
