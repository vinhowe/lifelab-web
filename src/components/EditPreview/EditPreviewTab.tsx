/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropsWithChildren } from "react";
import { colors } from "../../theme/theme";

// noinspection CssReplaceWithShorthandSafely
const tabStyle = (active: boolean) => css`
  background: ${active ? "#eaeaea" : "#ffffff"};
  border: solid ${active ? "#a0a0a0" : "#ccc"} 1px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: none;
  font-size: 80%;
  padding: 6px 10px;
  margin: 0 2px 0 0;
  cursor: pointer;
  transition: all 60ms ease-out;

  &:active {
    box-shadow: none;
    outline: none;
  }

  &:focus:not(:active) {
    outline: none;
    box-shadow: 0 0 0 4px ${colors.highlightBorderColor};
  }
`;

interface EditPreviewTabProps {
  active: boolean;
  onClick?: () => void;
}

export default function EditPreviewTab({
  active,
  children,
  onClick,
}: PropsWithChildren<EditPreviewTabProps>): JSX.Element {
  return (
    <div role="button" onClick={onClick} tabIndex={0} css={tabStyle(active)}>
      {children}
    </div>
  );
}
