/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import PageWidth from "../../../components/PageWidth";
import ReorderableIssueList from "../../../components/ReorderableIssueList";
import { useCallback, useEffect, useRef, useState } from "react";
import { getIssues } from "../../../services/issueApi";
import { Issue, IssueState } from "../../../types/issue";
import Button from "../../../components/Button";
import { buttonColors } from "../../../theme/colors";
import TextField from "../../../components/TextField";
import { getLab, updateLab } from "../../../services/labApi";
import { itemListPageSectionStyle } from "../../../theme/styles";
import IssueList from "../../../components/IssueList";

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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [orderedIssues, setOrderedIssues] = useState<Issue[]>([]);
  const [filteredOrderedIssues, setFilteredOrderedIssues] = useState<Issue[]>(
    []
  );
  const [closedIssues, setClosedIssues] = useState<Issue[]>([]);
  const [queueNumbers, setQueueNumbers] = useState<number[]>();
  const lastQueueNumbersRef = useRef<number[]>();
  const [searchQuery, setSearchQuery] = useState("");

  const filterFunction = useCallback(
    (issue: Issue, state: IssueState) => {
      return (
        issue.state === state &&
        (searchQuery === "" || issue.title.toLowerCase().includes(searchQuery))
      );
    },
    [searchQuery]
  );

  const updateSearchQuery = useCallback(
    (query) => {
      query = query.toLowerCase();
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  // Filter and group issues
  useEffect(() => {
    setFilteredOrderedIssues([
      ...orderedIssues.filter((issue) =>
        filterFunction(issue, IssueState.OPEN)
      ),
    ]);
    setClosedIssues([
      ...issues.filter((issue) => filterFunction(issue, IssueState.CLOSED)),
    ]);
  }, [filterFunction, orderedIssues, issues, searchQuery]);

  useEffect(() => {
    if (issues.length === 0) {
      getIssues(labId).then(setIssues);
    }
  }, [labId, filterFunction, issues]);

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
    if (issues.length === 0) {
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

    if (!closedIssues) {
      setClosedIssues(issues.filter((issue) => issue.state === "CLOSED"));
    }
  }, [issues, queueNumbers, orderedIssues, closedIssues, labId, updateQueue]);

  const onIssuesReorder = (issueNumbers: number[]) => {
    updateLab(labId, { queue: issueNumbers });
    updateQueue(issueNumbers);
  };

  return (
    <PageWidth>
      <div css={headerBarStyle}>
        <TextField
          placeholder="Search"
          onChange={updateSearchQuery}
          value={searchQuery}
        />
        <div css={buttonWrapperStyle}>
          <Button
            color={buttonColors.green}
            onClick={() => history.push(`/labs/${labId}/issues/new`)}
          >
            New issue
          </Button>
        </div>
      </div>
      {filteredOrderedIssues.length !== 0 && (
        <div css={itemListPageSectionStyle}>
          <h3 style={{ marginBottom: "8px" }}>Open</h3>
          <p style={{ marginTop: 0, marginBottom: "20px" }}>
            <i>drag to reorder</i>
          </p>
          <ReorderableIssueList
            labId={labId}
            issues={filteredOrderedIssues}
            onIssuesReorder={onIssuesReorder}
          />
        </div>
      )}
      {closedIssues.length !== 0 && (
        <div css={itemListPageSectionStyle}>
          <h3>Closed</h3>
          <IssueList issues={closedIssues} labId={labId} />
        </div>
      )}
    </PageWidth>
  );
}
