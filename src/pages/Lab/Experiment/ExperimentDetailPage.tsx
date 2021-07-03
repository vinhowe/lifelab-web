/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Prompt, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageWidth from "../../../components/PageWidth";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import ReactMarkdown from "react-markdown";
import EditPreview from "../../../components/EditPreview/EditPreview";
import { Experiment, ExperimentEdits } from "../../../types/experiment";
import {
  getExperiment,
  updateExperiment,
} from "../../../services/experimentApi";
import ExperimentStateIndicator from "../../../components/ExperimentStateIndicator";
import ExperimentStateSelector from "../../../components/ExperimentStateSelector";
import preventUnloadEventHandler from "../../../utilities/preventUnloadEventHandler";
import { getIssues } from "../../../services/issueApi";
import { Issue } from "../../../types/issue";
import LabItemChecklist from "../../../components/LabItemChecklist";
import IssueListItem from "../../../components/IssueListItem";
import LabItemList from "../../../components/LabItemList";

const experimentHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const experimentNumberStyle = css`
  color: rgba(0, 0, 0, 0.6);
  font-weight: normal;
`;

const experimentSubheadingContainerStyle = css`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: solid #ccc 1px;
`;

const editButtonsContainerStyle = css`
  display: flex;

  button {
    margin-left: 8px;
  }
`;

const experimentSubheadingExtraInfoStyle = css`
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.6);
`;

export default function ExperimentDetailPage(): JSX.Element {
  const { labId, experimentNumber } = useParams();
  const [experiment, setExperiment] = useState<Experiment>();
  const [experimentEdits, setExperimentEdits] = useState<ExperimentEdits>();
  const editing = experimentEdits !== undefined;
  const [linkedIssues, setLinkedIssues] = useState<Issue[]>();

  useEffect(() => {
    // TODO: Fix this incredibly inefficient way of doing things
    getIssues(labId).then((issues) => {
      setLinkedIssues(
        issues.filter((issue) => experiment?.issues.includes(issue.url))
      );
    });
  }, [experiment, labId]);

  const updateLinkedIssues = useCallback(
    async (newLinkedIssues: Issue[]) => {
      await updateExperiment(labId, experimentNumber, {
        issues: newLinkedIssues.map((issue) => issue.url),
      });
      setLinkedIssues(newLinkedIssues);
    },
    [experimentNumber, labId]
  );

  const toggleEditing = async () => {
    if (!editing) {
      setExperimentEdits({});
      window.addEventListener("beforeunload", preventUnloadEventHandler);
      return;
    }

    window.removeEventListener("beforeunload", preventUnloadEventHandler);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.keys(experimentEdits as any).length > 0) {
      const updatedExperiment = await updateExperiment(
        labId,
        experimentNumber,
        experimentEdits
      );
      setExperiment(updatedExperiment);
    }

    setExperimentEdits(undefined);
  };

  const cancelEdits = () => {
    setExperimentEdits(undefined);
    // noinspection JSIgnoredPromiseFromCall
    toggleEditing();
  };

  const getIssuesCallback = useCallback(() => getIssues(labId), []);

  useEffect(() => {
    getExperiment(labId, experimentNumber).then(setExperiment);

    return () =>
      window.removeEventListener("beforeunload", preventUnloadEventHandler);
  }, []);

  return (
    <PageWidth>
      {experiment && (
        <div>
          <div css={experimentHeadingContainerStyle}>
            {editing ? (
              <TextField
                value={experimentEdits?.title || experiment.title}
                style={{ width: "100%" }}
                onChange={(title) =>
                  title !== experiment.title &&
                  setExperimentEdits({ ...experimentEdits, title })
                }
              />
            ) : (
              <h1>
                <span css={experimentNumberStyle}>#{experiment.number}</span>{" "}
                {experiment.title}
              </h1>
            )}
            {editing ? (
              <div css={editButtonsContainerStyle}>
                <Button onClick={toggleEditing}>Save</Button>
                <Button onClick={cancelEdits}>Cancel</Button>
              </div>
            ) : (
              <div css={editButtonsContainerStyle}>
                <Button onClick={toggleEditing}>Edit</Button>
              </div>
            )}
          </div>
          <div css={experimentSubheadingContainerStyle}>
            {!editing ? (
              <ExperimentStateIndicator
                state={experimentEdits?.state || experiment.state}
              />
            ) : (
              <ExperimentStateSelector
                state={experimentEdits?.state || experiment.state}
                onChange={(state) =>
                  setExperimentEdits({ ...experiment, state })
                }
              />
            )}
            {!editing && (
              <span css={experimentSubheadingExtraInfoStyle}>
                Created {new Date(experiment.created).toDateString()}, ends{" "}
                {new Date(experiment.endDate).toDateString()}
              </span>
            )}
          </div>
          {(linkedIssues?.length || editing) && <h3>Linked issues</h3>}
          <div>
            {linkedIssues &&
              (editing ? (
                <LabItemChecklist
                  loadItemsFn={getIssuesCallback}
                  selected={linkedIssues}
                  onSelectedChanged={async (items) => {
                    await updateLinkedIssues(items);
                  }}
                >
                  {(value, index) => (
                    <IssueListItem
                      key={index}
                      issue={value}
                      labId={labId}
                      small
                    />
                  )}
                </LabItemChecklist>
              ) : (
                <LabItemList items={linkedIssues}>
                  {(value, index) => (
                    <IssueListItem
                      key={index}
                      issue={value}
                      labId={labId}
                      small
                    />
                  )}
                </LabItemList>
              ))}
          </div>
          {editing && <h3>End date</h3>}
          {editing && (
            <TextField
              type="date"
              value={experimentEdits?.endDate || experiment?.endDate}
              onChange={(endDate) =>
                setExperimentEdits({ ...experiment, endDate })
              }
            />
          )}
          {(editing || experiment.description) && <h3>Description</h3>}
          {editing && (
            <EditPreview
              value={experimentEdits?.description || experiment.description}
              onChange={(description) =>
                setExperimentEdits({ ...experimentEdits, description })
              }
              autoFocus
            />
          )}
          {!editing && experiment.description && (
            <ReactMarkdown>{experiment.description}</ReactMarkdown>
          )}
          <h3>Terms</h3>
          {editing ? (
            <EditPreview
              value={experimentEdits?.terms || experiment.terms}
              onChange={(terms) =>
                setExperimentEdits({ ...experimentEdits, terms })
              }
              autoFocus
            />
          ) : (
            <ReactMarkdown>{experiment.terms}</ReactMarkdown>
          )}
        </div>
      )}
      <Prompt
        message="You have unsaved work. Are you sure you want to leave?"
        when={editing}
      />
    </PageWidth>
  );
}
