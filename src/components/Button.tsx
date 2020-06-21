/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { MouseEventHandler } from "react";

const buttonStyle = css``;

export default function Button({
  children,
  onClick,
  extraProps,
}: {
  children: JSX.Element;
  onClick: MouseEventHandler;
  extraProps: any;
}): JSX.Element {
  return (
    <button css={buttonStyle} onClick={onClick} {...extraProps}>
      {children}
    </button>
  );
}
