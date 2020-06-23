/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import LabNavTab from "./LabNavTab";

const navStyle = css`
  display: flex;
  border-bottom: solid #ccc 1px;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 24px;
`;

const labTitleStyle = css`
  display: flex;
  align-items: center;
  margin-right: 16px;
  font-weight: bold;
`;

export interface LabNavProps {
  labId: string;
}

export default function LabNav({ labId }: LabNavProps): JSX.Element {
  return (
    <nav css={navStyle}>
      <span css={labTitleStyle}>Lab {labId}</span>
      <LabNavTab route={"/labs/:labId/issues"} labId={labId}>
        Issues
      </LabNavTab>
      <LabNavTab route={"/labs/:labId/experiments"} labId={labId}>
        Experiments
      </LabNavTab>
    </nav>
  );
}
