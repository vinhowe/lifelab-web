/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Issue, IssueEdits, IssueState } from "../../../types/issue";
import IssueStateIndicator from "../../../components/IssueStateIndicator";
import PageWidth from "../../../components/PageWidth";
import Button from "../../../components/Button";
import { getIssue, updateIssue } from "../../../services/issueApi";
import TextField from "../../../components/TextField";
import ReactMarkdown from "react-markdown";
import EditPreview from "../../../components/EditPreview/EditPreview";
import {
  Experiment,
  ExperimentEdits,
  ExperimentState,
} from "../../../types/experiment";
import {
  getExperiment,
  updateExperiment,
} from "../../../services/experimentApi";
import ExperimentStateIndicator from "../../../components/ExperimentStateIndicator";
import ExperimentStateSelector from "../../../components/ExperimentStateSelector";

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

  const toggleEditing = async () => {
    if (!editing) {
      setExperimentEdits({});
      return;
    }

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

  useEffect(() => {
    getExperiment(labId, experimentNumber).then(setExperiment);
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
                <Button onClick={() => toggleEditing()}>Save</Button>
                <Button onClick={() => setExperimentEdits(undefined)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div css={editButtonsContainerStyle}>
                <Button onClick={() => toggleEditing()}>Edit</Button>
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
                onChange={(state) => setExperiment({ ...experiment, state })}
              />
            )}
            {!editing && (
              <span css={experimentSubheadingExtraInfoStyle}>
                Created {new Date(experiment.created).toDateString()}, ends{" "}
                {new Date(experiment.endDate).toDateString()}
              </span>
            )}
          </div>
          {editing && <h3>End date</h3>}
          {editing && (
            <TextField
              type="date"
              value={experiment?.endDate || ""}
              onChange={(endDate) => setExperiment({ ...experiment, endDate })}
            />
          )}
          <h3>Description</h3>
          {editing ? (
            <EditPreview
              value={experimentEdits?.description || experiment.description}
              onChange={(description) =>
                setExperimentEdits({ ...experimentEdits, description })
              }
              autoFocus
            />
          ) : (
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
    </PageWidth>
  );
}
