/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import LabNavTab from "./LabNavTab";
import { Link } from "react-router-dom";
import Button from "../Button";
import { buttonColors } from "../../theme/colors";

const navStyle = css`
  display: flex;
  border-bottom: solid #ccc 1px;
  padding-right: 16px;
  margin-bottom: 24px;
  padding-left: 8px;
`;

const labTitleStyle = css`
  font-weight: bold;
  margin: 0;
`;

const labInfoStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const labActionButtonsContainerStyle = css``;

export interface LabNavProps {
  labId: string;
}

export default function LabNav({ labId }: LabNavProps): JSX.Element {
  return (
    <header>
      <div css={labInfoStyle}>
        <h3 css={labTitleStyle}>
          <Link to={`/labs/${labId}`}>Lab {labId}</Link>
        </h3>
        <div css={labActionButtonsContainerStyle}>
          <Button color={buttonColors.green}>Check-in</Button>
        </div>
      </div>
      <nav css={navStyle}>
        <LabNavTab route={"/labs/:labId/issues"} labId={labId}>
          Issues
        </LabNavTab>
        <LabNavTab route={"/labs/:labId/experiments"} labId={labId}>
          Experiments
        </LabNavTab>
      </nav>
    </header>
  );
}
