/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import IssueStateIndicator from "./IssueStateIndicator";
import { useHistory } from "react-router-dom";
import { Issue } from "../types/issue";

const listItemContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;

  > :last-child {
    margin-left: 16px;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: initial;
  }
`;

export default function IssueListItem({
  issue: { title, state, number },
  labId,
}: {
  issue: Issue;
  labId: number;
}): JSX.Element {
  const history = useHistory();
  return (
    <div
      css={listItemContainerStyle}
      role="button"
      onClick={() => history.push(`/labs/${labId}/issues/${number}`)}
    >
      <a href="">{title}</a>
      <IssueStateIndicator state={state} small />
    </div>
  );
}
