import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import IssueListItem from "../../components/IssueListItem";
import { Issue } from "../../types/issue";

export default function IssuesList(): JSX.Element {
  const [issues, setIssues] = useState<Issue[]>([]);
  const { labId } = useParams();

  const loadIssues = async (): Promise<void> => {
    const loadedIssues: Issue[] = (
      await axios.get(`http://localhost:8000/api/dev/labs/${labId}/issues/`)
    ).data;
    setIssues(loadedIssues);
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
