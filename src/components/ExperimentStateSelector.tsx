/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ExperimentState } from "../types/experiment";
import ExperimentStateIndicator from "./ExperimentStateIndicator";

export interface ExperimentStateSelectorProps {
  state: ExperimentState;
  onChange: (state: ExperimentState) => void;
}

const states = [
  ExperimentState.INACTIVE,
  ExperimentState.ACTIVE,
  ExperimentState.COMMITTED,
];

const buttonsContainerStyle = css`
  display: flex;

  > * {
    margin-right: 8px;
  }
`;

const buttonStyle = (active: boolean) => css`
  ${!active ? "opacity: 0.2" : ""};
  cursor: pointer;
`;

export default function ExperimentStateSelector({
  state,
  onChange,
}: ExperimentStateSelectorProps): JSX.Element {
  return (
    <div css={buttonsContainerStyle}>
      {states.map((buttonState) => (
        <div
          key={buttonState}
          css={buttonStyle(buttonState === state)}
          onClick={() => onChange(buttonState)}
        >
          <ExperimentStateIndicator state={buttonState} />
        </div>
      ))}
    </div>
  );
}
