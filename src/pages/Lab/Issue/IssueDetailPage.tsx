/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Prompt, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Issue, IssueEdits, IssueState } from "../../../types/issue";
import IssueStateIndicator from "../../../components/IssueStateIndicator";
import PageWidth from "../../../components/PageWidth";
import Button from "../../../components/Button";
import { getIssue, updateIssue } from "../../../services/issueApi";
import TextField from "../../../components/TextField";
import ReactMarkdown from "react-markdown";
import EditPreview from "../../../components/EditPreview/EditPreview";
import preventUnloadEventHandler from "../../../utilities/preventUnloadEventHandler";
import LabItemChecklist from "../../../components/LabItemChecklist";
import LabItemList from "../../../components/LabItemList";
import { Experiment } from "../../../types/experiment";
import { getExperiments } from "../../../services/experimentApi";
import ExperimentListItem from "../../../components/ExperimentListItem";
import Dialog from "../../../components/Dialog";

const issueHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const issueNumberStyle = css`
  color: rgba(0, 0, 0, 0.6);
  font-weight: normal;
`;

const issueSubheadingContainerStyle = css`
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

const issueSubheadingExtraInfoStyle = css`
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.6);
`;

export default function IssueDetailPage(): JSX.Element {
  const { labId, issueNumber } = useParams();
  const [issue, setIssue] = useState<Issue>();
  const [issueEdits, setIssueEdits] = useState<IssueEdits>();
  const editing = issueEdits !== undefined;
  const [linkedExperiments, setLinkedExperiments] = useState<Experiment[]>();
  const [linkedExperimentsDialogOpen, setLinkedExperimentsDialogOpen] =
    useState(false);

  useEffect(() => {
    // TODO: Fix this incredibly inefficient way of doing things
    getExperiments(labId).then((experiments) => {
      setLinkedExperiments(
        experiments.filter((experiment) =>
          issue?.experiments.includes(experiment.url)
        )
      );
    });
  }, [issue, labId]);

  const updateLinkedExperiments = useCallback(
    async (newLinkedExperiments: Experiment[]) => {
      await updateIssue(labId, issueNumber, {
        experiments: newLinkedExperiments.map((issue) => issue.url),
      });
      setLinkedExperiments(newLinkedExperiments);
    },
    [issueNumber, labId]
  );

  const updateIssueStatus = useCallback(
    async (state: IssueState) => {
      if (!issue) {
        return;
      }

      const responseIssue = await updateIssue(labId, issueNumber, {
        state,
      });

      setIssue({ ...issue, state: responseIssue.state });
    },
    [issue, issueNumber, labId]
  );

  const openLinkedExperimentsDialog = useCallback(
    () => setLinkedExperimentsDialogOpen(true),
    [setLinkedExperimentsDialogOpen]
  );

  const toggleEditing = async () => {
    if (!editing) {
      setIssueEdits({});
      window.addEventListener("beforeunload", preventUnloadEventHandler);
      return;
    }

    window.removeEventListener("beforeunload", preventUnloadEventHandler);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Object.keys(issueEdits as any).length > 0) {
      const updatedIssue = await updateIssue(labId, issueNumber, issueEdits);
      setIssue(updatedIssue);
    }

    setIssueEdits(undefined);
  };

  const cancelEdits = () => {
    setIssueEdits(undefined);
    // noinspection JSIgnoredPromiseFromCall
    toggleEditing();
  };

  useEffect(() => {
    getIssue(labId, issueNumber).then(setIssue);
  }, [issueNumber, labId]);

  const getExperimentsCallback = useCallback(
    () => getExperiments(labId),
    [labId]
  );

  return (
    <PageWidth>
      {issue && (
        <div>
          <div css={issueHeadingContainerStyle}>
            {editing ? (
              <TextField
                value={
                  issueEdits?.title == null ? issue.title : issueEdits?.title
                }
                style={{ width: "100%" }}
                onChange={(title) =>
                  title !== issue.title &&
                  setIssueEdits({ ...issueEdits, title })
                }
              />
            ) : (
              <h1>
                <span css={issueNumberStyle}>#{issue.number}</span>{" "}
                {issue.title}
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
          <div css={issueSubheadingContainerStyle}>
            <IssueStateIndicator state={issueEdits?.state || issue.state} />
            <div style={{ marginLeft: "10px", display: "inline-block" }}>
              <Button
                onClick={() =>
                  updateIssueStatus(
                    (issueEdits?.state || issue.state) === IssueState.OPEN
                      ? IssueState.CLOSED
                      : IssueState.OPEN
                  )
                }
              >
                {(issueEdits?.state || issue.state) === IssueState.OPEN
                  ? "Close"
                  : "Open"}{" "}
                this issue
              </Button>
            </div>
            <span css={issueSubheadingExtraInfoStyle}>
              Created {new Date(issue.created).toDateString()}
            </span>
          </div>
          <h3>
            <span
              style={{
                marginRight: "8px",
              }}
            >
              Linked experiments
            </span>
            <Button onClick={openLinkedExperimentsDialog}>Edit</Button>
          </h3>
          {linkedExperiments && (
            <div>
              {
                <Dialog
                  onClose={() => setLinkedExperimentsDialogOpen(false)}
                  open={linkedExperimentsDialogOpen}
                >
                  <LabItemChecklist
                    loadItemsFn={getExperimentsCallback}
                    selected={linkedExperiments}
                    onSelectedChanged={updateLinkedExperiments}
                  >
                    {(value, index) => (
                      <ExperimentListItem
                        key={index}
                        experiment={value}
                        labId={labId}
                        small
                      />
                    )}
                  </LabItemChecklist>
                </Dialog>
              }
              <LabItemList items={linkedExperiments}>
                {(value, index) => (
                  <ExperimentListItem
                    key={index}
                    experiment={value}
                    labId={labId}
                    small
                  />
                )}
              </LabItemList>
            </div>
          )}
          <h3>Description</h3>
          {editing ? (
            <EditPreview
              value={issueEdits?.description || issue.description}
              onChange={(description) =>
                setIssueEdits({ ...issueEdits, description })
              }
              autoFocus
            />
          ) : (
            <ReactMarkdown>{issue.description}</ReactMarkdown>
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
