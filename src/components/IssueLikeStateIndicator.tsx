/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { uppercaseFirst } from "../utilities/strings";
import React from "react";

const indicatorStyle = css`
  padding: 6px;
  border-radius: 4px;
  margin: 0 4px;
  font-size: 12px;
  font-weight: bold;
  color: #fafafa;
`;

export default function IssueLikeStateIndicator({
  state,
  color,
}: IssueLikeStateIndicatorProps): JSX.Element {
  const formattedState = uppercaseFirst(state);
  return (
    <div css={indicatorStyle} style={{ backgroundColor: color }}>
      {formattedState}
    </div>
  );
}

interface IssueLikeStateIndicatorProps {
  state: string;
  color: IssueLikeStateColor;
}

export enum IssueLikeStateColor {
  UNRESOLVED = "green",
  IN_PROGRESS = "orange",
  FINISHED = "red",
}
