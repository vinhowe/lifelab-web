/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import Page from "../../../components/Page";
import IssueList from "../../../components/IssueList";
import { useEffect, useState } from "react";
import { getIssues } from "../../../services/issueApi";
import { Issue } from "../../../types/issue";
import Button from "../../../components/Button";
import { buttonColors } from "../../../theme/theme";

const headerBarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function IssuesListPage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  const [issues, setIssues] = useState<Issue[]>();

  useEffect(() => {
    getIssues(labId).then(setIssues);
  }, []);

  return (
    <Page>
      <div css={headerBarStyle}>
        <h1>Issues in lab #{labId}</h1>
        <Button
          color={buttonColors.green}
          onClick={() => history.push(`/labs/${labId}/issues/new`)}
        >
          New issue
        </Button>
      </div>
      {issues !== undefined && <IssueList labId={labId} issues={issues} />}
    </Page>
  );
}
