/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import PageWidth from "../../../components/PageWidth";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { buttonColors } from "../../../theme/colors";
import TextField from "../../../components/TextField";
import { getExperiments } from "../../../services/experimentApi";
import { Experiment } from "../../../types/experiment";
import ExperimentList from "../../../components/ExperimentList";

const headerBarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonWrapperStyle = css`
  margin-left: 8px;
`;

export default function ExperimentsListPage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  const [experiments, setExperiments] = useState<Experiment[]>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getExperiments(labId).then(setExperiments);
  }, [labId]);

  return (
    <PageWidth>
      <div css={headerBarStyle}>
        <TextField placeholder="Search" />
        <div css={buttonWrapperStyle}>
          <Button
            color={buttonColors.green}
            onClick={() => history.push(`/labs/${labId}/experiments/new`)}
          >
            New experiment
          </Button>
        </div>
      </div>
      {experiments !== undefined && (
        <ExperimentList labId={labId} experiments={experiments} />
      )}
    </PageWidth>
  );
}
