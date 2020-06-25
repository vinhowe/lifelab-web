/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import IssueListItem from "./IssueListItem";
import { Issue } from "../types/issue";
import { listStyle } from "../theme/styles";
import { Experiment } from "../types/experiment";
import ExperimentListItem from "./ExperimentListItem";

export default function ExperimentList({
  experiments,
  labId,
}: {
  experiments: Experiment[];
  labId: number;
}): JSX.Element {
  return (
    <div css={listStyle}>
      {experiments.length > 0 &&
        experiments.map((experiment, index) => (
          <ExperimentListItem
            key={index}
            experiment={experiment}
            labId={labId}
          />
        ))}
    </div>
  );
}
