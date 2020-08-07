/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import PageWidth from "../../../components/PageWidth";
import IssueList from "../../../components/IssueList";
import { useCallback, useEffect, useRef, useState } from "react";
import { getIssues } from "../../../services/issueApi";
import { Issue } from "../../../types/issue";
import Button from "../../../components/Button";
import { buttonColors } from "../../../theme/colors";
import TextField from "../../../components/TextField";
import { getLab, updateLab } from "../../../services/labApi";

const headerBarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonWrapperStyle = css`
  margin-left: 8px;
`;

export default function LabIssuesListPage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  const [issues, setIssues] = useState<Issue[]>();
  const [queueNumbers, setQueueNumbers] = useState<number[]>();
  const lastQueueNumbersRef = useRef<number[]>();
  const [orderedIssues, setOrderedIssues] = useState<Issue[]>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!issues) {
      getIssues(labId).then(setIssues);
    }
  }, [issues, queueNumbers, orderedIssues]);

  const updateQueue = useCallback(
    (newQueueNumbers: number[]) => {
      if (!issues) {
        return;
      }

      setOrderedIssues(
        newQueueNumbers
          .map((id) => issues.find(({ id: issueId }) => issueId === id))
          .filter((value): value is Issue => !!value)
      );
    },
    [issues]
  );

  useEffect(() => {
    if (!issues) {
      return;
    }

    if (!queueNumbers) {
      getLab(labId)
        .then(({ queue }) => queue)
        .then(setQueueNumbers);
      return;
    }

    if (!orderedIssues || queueNumbers !== lastQueueNumbersRef.current) {
      updateQueue(queueNumbers);
      lastQueueNumbersRef.current = queueNumbers;
    }
  });

  const onIssuesReorder = (issueNumbers: number[]) => {
    updateLab(labId, { queue: issueNumbers });
    updateQueue(issueNumbers);
  };

  return (
    <PageWidth>
      <div css={headerBarStyle}>
        <TextField placeholder="Search" />
        <div css={buttonWrapperStyle}>
          <Button
            color={buttonColors.green}
            onClick={() => history.push(`/labs/${labId}/issues/new`)}
          >
            New issue
          </Button>
        </div>
      </div>
      {orderedIssues !== undefined && (
        <IssueList
          labId={labId}
          issues={orderedIssues}
          onIssuesReorder={onIssuesReorder}
        />
      )}
    </PageWidth>
  );
}
