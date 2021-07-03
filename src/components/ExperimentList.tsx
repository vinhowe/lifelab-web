/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Experiment } from "../types/experiment";
import ExperimentListItem from "./ExperimentListItem";
import LabItemList from "./LabItemList";

export default function ExperimentList({
  experiments,
  labId,
  small,
  openInNewTab,
}: {
  experiments: Experiment[];
  labId: number;
  small?: boolean;
  openInNewTab?: boolean;
}): JSX.Element {
  return (
    <LabItemList items={experiments}>
      {(experiment, index) => (
        <ExperimentListItem
          key={index}
          experiment={experiment}
          labId={labId}
          small={small}
          openInNewTab={openInNewTab}
        />
      )}
    </LabItemList>
  );
}
