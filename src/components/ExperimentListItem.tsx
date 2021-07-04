/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { listItemContainerStyle } from "../theme/styles";
import { Experiment } from "../types/experiment";
import ExperimentStateIndicator from "./ExperimentStateIndicator";

export default function ExperimentListItem({
  experiment: { title, state, number },
  labId,
  small,
  openInNewTab,
}: {
  experiment: Experiment;
  labId: number;
  small?: boolean;
  openInNewTab?: boolean;
}): JSX.Element {
  return (
    <div css={listItemContainerStyle(small)}>
      <Link
        to={`/labs/${labId}/experiments/${number}`}
        target={openInNewTab ? "_blank" : undefined}
      >
        {title}
      </Link>
      <ExperimentStateIndicator state={state} small />
    </div>
  );
}
