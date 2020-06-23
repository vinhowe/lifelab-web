/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/core";
import { buttonColors, colors } from "./colors";

export const sansFontFamily = css`
  font-family: "Lato", sans-serif;
`;

export const tabStyle = (
  active: boolean,
  small?: boolean
): SerializedStyles => css`
  background: ${active
    ? buttonColors.white.active
    : buttonColors.white.default};
  border: solid
    ${active
      ? buttonColors.white.activeBorder
      : buttonColors.white.defaultBorder}
    1px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: none;
  padding: ${small ? "6px 10px" : "8px 12px"};
  ${!small && "font-size: 90%"};
  cursor: pointer;
  transition: all 60ms ease-out;
  margin: 0 ${small ? 2 : 4}px -1px 0;
  ${sansFontFamily};

  &:active {
    box-shadow: none;
    outline: none;
  }

  &:focus:not(:active) {
    outline: none;
    box-shadow: 0 0 0 4px ${colors.highlightBorderColor};
  }
`;

export const shadows = {
  buttonDrop: "rgba(80, 80, 80, 0.1) 0 1.5px 1px",
};
