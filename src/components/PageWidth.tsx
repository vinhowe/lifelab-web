/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const pageWrapperStyle = css`
  display: flex;
  justify-content: center;
`;

const pageStyle = css`
  width: 600px;
`;

export default function PageWidth({
  children,
}: {
  children: any;
}): JSX.Element {
  return (
    <main css={pageWrapperStyle}>
      <div css={pageStyle}>{children}</div>
    </main>
  );
}
