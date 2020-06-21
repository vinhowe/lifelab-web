/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import IssueStateIndicator from "./IssueStateIndicator";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Issue } from "../types/issue";

const listItemContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 4px;
  margin-bottom: 4px;
  border: 1px solid #888888;
  border-radius: 4px;
  cursor: pointer;
`;

export default function IssueListItem({
  issue: { title, state, number },
  labId,
}: {
  issue: Issue;
  labId: number;
}): JSX.Element {
  const history = useHistory();
  const { url } = useRouteMatch();
  return (
    <div
      css={listItemContainerStyle}
      role="button"
      onClick={() => history.push(`/labs/${labId}/issues/${number}`)}
    >
      <span>{title}</span>
      <IssueStateIndicator state={state} />{" "}
    </div>
  );
}
