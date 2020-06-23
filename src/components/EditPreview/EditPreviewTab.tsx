/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { PropsWithChildren } from "react";
import { tabStyle } from "../../theme/styles";

// noinspection CssReplaceWithShorthandSafely
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
    <button onClick={onClick} css={tabStyle(active)}>
      {children}
    </button>
  );
}
