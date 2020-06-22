/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import Page from "../../components/Page";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/Button";

const navButtonsContainerStyle = css`
  button {
    margin-right: 4px;
  }
`;

export default function LabPage(): JSX.Element {
  const { labId } = useParams();
  const history = useHistory();
  return (
    <Page>
      <h1>Lab #{labId}</h1>
      <div css={navButtonsContainerStyle}>
        <Button onClick={() => history.push(`/labs/${labId}/issues/`)}>
          Issues
        </Button>
        <Button>Experiments (coming soon)</Button>
      </div>
    </Page>
  );
}
