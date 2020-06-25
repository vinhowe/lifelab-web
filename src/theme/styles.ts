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

export const listStyle = css`
  > * {
    border: solid #ccc 1px;
    border-top: none;
    transition: background-color 60ms ease-out;
  }

  > *:hover {
    background-color: #f0f0f0;
  }

  > *:first-child {
    border-top: solid #ccc 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  > *:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const listItemContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;

  > :last-child {
    margin-left: 16px;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: initial;
  }
`;

export const shadows = {
  buttonDrop: "rgba(80, 80, 80, 0.1) 0 1.5px 1px",
};
