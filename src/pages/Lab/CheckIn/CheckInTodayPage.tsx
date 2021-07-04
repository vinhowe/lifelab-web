/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PageWidth from "../../../components/PageWidth";
import { useCallback, useEffect, useRef, useState } from "react";
import { Prompt, useParams } from "react-router-dom";
import { CheckIn, CheckInEdits } from "../../../types/issue";
import {
  getCheckInToday,
  updateCheckInToday,
} from "../../../services/checkInApi";
import { Experiment } from "../../../types/experiment";
import axios from "axios";
import ExperimentList from "../../../components/ExperimentList";
import EditPreview from "../../../components/EditPreview/EditPreview";
import Button from "../../../components/Button";
import preventUnloadEventHandler from "../../../utilities/preventUnloadEventHandler";

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
  const beforeUnloadListenerRef = useRef<(e: BeforeUnloadEvent) => void>();

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

  useEffect(() => {
    const hasEdits = Object.keys(checkInEdits).length > 0;

    if (hasEdits && beforeUnloadListenerRef.current === undefined) {
      beforeUnloadListenerRef.current = preventUnloadEventHandler;
      window.addEventListener("beforeunload", beforeUnloadListenerRef.current);
    } else if (!hasEdits && beforeUnloadListenerRef.current !== undefined) {
      window.removeEventListener(
        "beforeunload",
        beforeUnloadListenerRef.current
      );
    }
  }, [checkInEdits]);

  const saveCheckInEdits = useCallback(async () => {
    // noinspection JSIgnoredPromiseFromCall
    await updateCheckInToday(labId, checkInEdits);
    setCheckIn({ ...checkIn, ...(checkInEdits as CheckIn) });
    setCheckInEdits({});
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
          <ExperimentList
            labId={labId}
            experiments={experiments}
            openInNewTab
          />
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
      <Prompt
        message="You have unsaved work. Are you sure you want to leave?"
        when={Object.keys(checkInEdits).length > 0}
      />
    </PageWidth>
  );
}
