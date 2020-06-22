/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import PageWidth from "../../components/PageWidth";
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
    <PageWidth>
      <div css={navButtonsContainerStyle}>
        <Button onClick={() => history.push(`/labs/${labId}/issues/`)}>
          Issues
        </Button>
        <Button>Experiments (coming soon)</Button>
      </div>
    </PageWidth>
  );
}
