/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Link } from "react-router-dom";
import { listItemContainerStyle } from "../theme/styles";
import { Experiment } from "../types/experiment";
import ExperimentStateIndicator from "./ExperimentStateIndicator";

export default function ExperimentListItem({
  experiment: { title, state, number },
  labId,
}: {
  experiment: Experiment;
  labId: number;
}): JSX.Element {
  return (
    <div css={listItemContainerStyle}>
      <Link to={`/labs/${labId}/experiments/${number}`}>{title}</Link>
      <ExperimentStateIndicator state={state} small />
    </div>
  );
}
