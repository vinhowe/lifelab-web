/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import PageWidth from "../../../components/PageWidth";
import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { buttonColors } from "../../../theme/colors";
import TextField from "../../../components/TextField";
import { getExperiments } from "../../../services/experimentApi";
import { Experiment, ExperimentState } from "../../../types/experiment";
import ExperimentList from "../../../components/ExperimentList";
import { itemListPageSectionStyle } from "../../../theme/styles";

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
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [activeExperiments, setActiveExperiments] = useState<Experiment[]>([]);
  const [committedExperiments, setCommittedExperiments] = useState<
    Experiment[]
  >([]);
  const [inactiveExperiments, setInactiveExperiments] = useState<Experiment[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filterFunction = useCallback(
    (experiment: Experiment, state: ExperimentState) => {
      return (
        experiment.state === state &&
        (searchQuery === "" ||
          experiment.title.toLowerCase().includes(searchQuery))
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

  // Filter and group experiments
  useEffect(() => {
    setActiveExperiments([
      ...experiments.filter((experiment) =>
        filterFunction(experiment, ExperimentState.ACTIVE)
      ),
    ]);
    setCommittedExperiments([
      ...experiments.filter((experiment) =>
        filterFunction(experiment, ExperimentState.COMMITTED)
      ),
    ]);
    setInactiveExperiments([
      ...experiments.filter((experiment) =>
        filterFunction(experiment, ExperimentState.INACTIVE)
      ),
    ]);
  }, [experiments, filterFunction, labId, searchQuery]);

  useEffect(() => {
    getExperiments(labId).then(setExperiments);
  }, [labId]);

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
            onClick={() => history.push(`/labs/${labId}/experiments/new`)}
          >
            New experiment
          </Button>
        </div>
      </div>
      {activeExperiments.length !== 0 && (
        <div css={itemListPageSectionStyle}>
          <h3>Active</h3>
          <ExperimentList labId={labId} experiments={activeExperiments} />
        </div>
      )}
      {committedExperiments.length !== 0 && (
        <div css={itemListPageSectionStyle}>
          <h3>Committed</h3>
          <ExperimentList labId={labId} experiments={committedExperiments} />
        </div>
      )}
      {inactiveExperiments.length !== 0 && (
        <div css={itemListPageSectionStyle}>
          <h3>Inactive</h3>
          <ExperimentList labId={labId} experiments={inactiveExperiments} />
        </div>
      )}
    </PageWidth>
  );
}
