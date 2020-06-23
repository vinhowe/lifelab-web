/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import PageWidth from "../../../components/PageWidth";
import IssueList from "../../../components/IssueList";
import { useEffect, useState } from "react";
import { getIssues } from "../../../services/issueApi";
import { Issue } from "../../../types/issue";
import Button from "../../../components/Button";
import { buttonColors } from "../../../theme/colors";
import TextField from "../../../components/TextField";

const headerBarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonWrapperStyle = css`
  margin-left: 8px;
`;

export default function IssuesListPage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  const [issues, setIssues] = useState<Issue[]>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getIssues(labId).then(setIssues);
  }, []);

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
      {issues !== undefined && <IssueList labId={labId} issues={issues} />}
    </PageWidth>
  );
}
