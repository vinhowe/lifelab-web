/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import IssueStateIndicator from "./IssueStateIndicator";
import { useHistory } from "react-router-dom";
import { Issue } from "../types/issue";
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
  const history = useHistory();
  return (
    <div
      css={listItemContainerStyle}
      role="button"
      onClick={() => history.push(`/labs/${labId}/experiments/${number}`)}
    >
      <a href="">{title}</a>
      <ExperimentStateIndicator state={state} small />
    </div>
  );
}
