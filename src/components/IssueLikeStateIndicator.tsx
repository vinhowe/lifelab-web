/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { uppercaseFirst } from "../utilities/strings";
import React from "react";

const indicatorStyle = css`
  padding: 6px;
  border-radius: 4px;
  font-weight: bold;
  color: #fafafa;
`;

export default function IssueLikeStateIndicator({
  state,
  color,
}: IssueLikeStateIndicatorProps): JSX.Element {
  const formattedState = uppercaseFirst(state);
  return (
    <span css={indicatorStyle} style={{ backgroundColor: color }}>
      {formattedState}
    </span>
  );
}

interface IssueLikeStateIndicatorProps {
  state: string;
  color: IssueLikeStateColor;
}

export enum IssueLikeStateColor {
  UNRESOLVED = "#22c44a",
  IN_PROGRESS = "orange",
  FINISHED = "#BB2222",
}
