/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

const pageWrapperStyle = css`
  display: flex;
  justify-content: center;
`;

const pageStyle = css`
  width: 600px;
`;

export default function Page({ children }: { children: any }): JSX.Element {
  return (
    <main css={pageWrapperStyle}>
      <div css={pageStyle}>{children}</div>
    </main>
  );
}
