/** @jsx jsx */
import { jsx } from "@emotion/core";
import LabItemList from "./LabItemList";
import { Issue } from "../types/issue";
import IssueListItem from "./IssueListItem";

export default function IssueList({
  issues,
  labId,
  small,
}: {
  issues: Issue[];
  labId: number;
  small?: boolean;
}): JSX.Element {
  return (
    <LabItemList items={issues}>
      {(experiment, index) => (
        <IssueListItem
          key={index}
          issue={experiment}
          labId={labId}
          small={small}
        />
      )}
    </LabItemList>
  );
}
