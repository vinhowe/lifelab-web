/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import { initialNewIssue, NewIssue } from "../../../types/issue";
import PageWidth from "../../../components/PageWidth";
import Button from "../../../components/Button";
import { createIssue } from "../../../services/issueApi";
import TextField from "../../../components/TextField";
import EditPreview from "../../../components/EditPreview/EditPreview";
import { buttonColors } from "../../../theme/colors";
import { initialNewExperiment, NewExperiment } from "../../../types/experiment";
import { createExperiment } from "../../../services/experimentApi";

const experimentHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const submitButtonContainerStyle = css`
  margin-left: 8px;
`;

export default function NewExperimentPage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  const [experiment, setExperiment] = useState<NewExperiment>(
    initialNewExperiment
  );

  const validate = () => !!experiment.title && !!experiment.terms;

  const postExperiment = async (): Promise<void> => {
    if (!validate()) {
      return;
    }

    const newNumber = (
      await createExperiment(labId, experiment)
    ).number.toString();

    history.push(`/labs/${labId}/experiments/${newNumber}`);
  };

  return (
    <PageWidth>
      {experiment && (
        <div>
          <div css={experimentHeadingContainerStyle}>
            <TextField
              value={experiment.title}
              style={{ width: "100%" }}
              onChange={(title) =>
                title !== experiment.title &&
                setExperiment({ ...experiment, title })
              }
            />
            <div css={submitButtonContainerStyle}>
              <Button
                onClick={() => postExperiment()}
                disabled={!validate()}
                color={buttonColors.green}
              >
                Submit
              </Button>
            </div>
          </div>
          <h3>End date</h3>
          <TextField
            type="date"
            value={experiment?.endDate || ""}
            onChange={(endDate) => setExperiment({ ...experiment, endDate})}
          />
          <h3>Description</h3>
          <EditPreview
            value={experiment?.description || ""}
            onChange={(description) =>
              setExperiment({ ...experiment, description })
            }
            autoFocus
          />
          <h3>Terms</h3>
          <EditPreview
            value={experiment?.terms || ""}
            onChange={(terms) => setExperiment({ ...experiment, terms })}
            autoFocus
          />
        </div>
      )}
    </PageWidth>
  );
}
