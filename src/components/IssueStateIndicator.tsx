import React from "react";
import IssueLikeStateIndicator, {
  IssueLikeStateColor,
} from "./IssueLikeStateIndicator";
import { IssueState } from "../types/issue";

export default function IssueStateIndicator({
  state,
  small,
}: IssueStateIndicatorProps): JSX.Element {
  let color;
  switch (state) {
    case IssueState.CLOSED:
      color = IssueLikeStateColor.FINISHED;
      break;
    case IssueState.OPEN:
      color = IssueLikeStateColor.UNRESOLVED;
      break;
  }

  return <IssueLikeStateIndicator color={color} state={state} small={small} />;
}

interface IssueStateIndicatorProps {
  state: IssueState;
  small?: boolean;
}
