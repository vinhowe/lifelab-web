import React from "react";
import IssueLikeStateIndicator, {
  IssueLikeStateColor,
} from "./IssueLikeStateIndicator";
import { ExperimentState } from "../types/experiment";

export default function ExperimentStateIndicator({
  state,
  small,
}: ExperimentStateIndicatorProps): JSX.Element {
  let color;
  switch (state) {
    case ExperimentState.INACTIVE:
      color = IssueLikeStateColor.ABANDONED;
      break;
    case ExperimentState.ACTIVE:
      color = IssueLikeStateColor.IN_PROGRESS;
      break;
    case ExperimentState.COMMITTED:
      color = IssueLikeStateColor.FINISHED;
      break;
  }

  return <IssueLikeStateIndicator color={color} state={state} small={small} />;
}

interface ExperimentStateIndicatorProps {
  state: ExperimentState;
  small?: boolean;
}
