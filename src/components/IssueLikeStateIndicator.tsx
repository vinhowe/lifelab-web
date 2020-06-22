/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { uppercaseFirst } from "../utilities/strings";
import React from "react";

const indicatorStyle = (small: boolean) => css`
  padding: ${small ? 6 : 8}px 12px;
  border-radius: 100px;
  ${small && "font-size: 80%"};
  font-weight: bold;
  color: #fafafa;
`;

export default function IssueLikeStateIndicator({
  state,
  color,
  small = false,
}: IssueLikeStateIndicatorProps): JSX.Element {
  const formattedState = uppercaseFirst(state);
  return (
    <span css={indicatorStyle(small)} style={{ backgroundColor: color }}>
      {formattedState}
    </span>
  );
}

interface IssueLikeStateIndicatorProps {
  state: string;
  color: IssueLikeStateColor;
  small?: boolean;
}

export enum IssueLikeStateColor {
  UNRESOLVED = "#22c44a",
  IN_PROGRESS = "orange",
  FINISHED = "#BB2222",
}
