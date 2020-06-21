import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import IssueListItem from "../../components/IssueListItem";
import { Issue } from "../../types/issue";
import { getIssues } from "../../services/issueApi";

export default function IssuesList(): JSX.Element {
  const [issues, setIssues] = useState<Issue[]>([]);
  const { labId } = useParams();

  const loadIssues = async (): Promise<void> => {
    setIssues(await getIssues(labId));
  };

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    loadIssues();
  }, []);
  return (
    <div>
      <h1>Issues</h1>
      {issues.length > 0 &&
        issues.map((issue, index) => (
          <IssueListItem key={index} issue={issue} labId={labId} />
        ))}
    </div>
  );
}
