/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { listStyle } from "../theme/styles";
import { Experiment } from "../types/experiment";
import ExperimentListItem from "./ExperimentListItem";

export default function ExperimentList({
  experiments,
  labId,
  openInNewTab,
}: {
  experiments: Experiment[];
  labId: number;
  openInNewTab?: boolean;
}): JSX.Element {
  return (
    <div css={listStyle}>
      {experiments.length > 0 &&
        experiments.map((experiment, index) => (
          <ExperimentListItem
            key={index}
            experiment={experiment}
            labId={labId}
            openInNewTab={openInNewTab}
          />
        ))}
    </div>
  );
}
