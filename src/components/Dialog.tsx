/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactNode, useCallback } from "react";

const containerStyle = (closed: boolean) => css`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  ${closed ? "display: none;" : ""}
`;

const innerStyle = css`
  width: 400px;
  // TODO: Use styles.ts background
  background: #fafafa;
  border-radius: 8px;
  // TODO: Handle this in the child components
  padding: 16px;
  max-height: 300px;
  overflow-y: scroll;
  z-index: 1001;
`;

export default function Dialog({
  children,
  open,
  onClose,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  const onInnerClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <div css={containerStyle(!open)} onClick={onClose}>
      <div css={innerStyle} onClick={onInnerClick}>
        {children}
      </div>
    </div>
  );
}
