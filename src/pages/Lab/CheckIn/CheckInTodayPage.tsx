/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PageWidth from "../../../components/PageWidth";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckIn, CheckInEdits } from "../../../types/issue";
import {
  getCheckInToday,
  updateCheckInToday,
} from "../../../services/checkInApi";
import { Experiment } from "../../../types/experiment";
import axios from "axios";
import ExperimentList from "../../../components/ExperimentList";
import EditPreview from "../../../components/EditPreview/EditPreview";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";

const checkInHeadingContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function CheckInTodayPage(): JSX.Element {
  const { labId } = useParams();
  const [checkIn, setCheckIn] = useState<CheckIn>();
  const [experiments, setExperiments] = useState<Experiment[]>();
  const [checkInEdits, setCheckInEdits] = useState<CheckInEdits>({});

  useEffect(() => {
    getCheckInToday(labId).then(setCheckIn);
  }, []);

  useEffect(() => {
    if (!checkIn || experiments) {
      return;
    }

    Promise.all(
      checkIn.experiments.map(
        async (url) => (await axios.get<Experiment>(url)).data
      )
    ).then(setExperiments);
  }, [checkIn]);

  const saveCheckInEdits = useCallback(() => {
    updateCheckInToday(labId, checkInEdits);
  }, [labId, checkInEdits]);

  return (
    <PageWidth>
      {checkIn && experiments !== undefined && (
        <div>
          <div css={checkInHeadingContainerStyle}>
            <h1>Check-in</h1>
            <Button onClick={() => saveCheckInEdits()}>Save</Button>
          </div>
          <h3>Active experiments</h3>
          <p>Tweak these as needed.</p>
          <ExperimentList labId={labId} experiments={experiments} />
          <h3>Retrospective</h3>
          <EditPreview
            value={checkIn.retrospective || checkInEdits.retrospective || ""}
            onChange={(retrospective) =>
              setCheckInEdits({ ...checkInEdits, retrospective })
            }
            autoFocus
          />
        </div>
      )}
    </PageWidth>
  );
}
