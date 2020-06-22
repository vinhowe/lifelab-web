/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { MouseEventHandler } from "react";
import { buttonColors, colors, shadows } from "../theme/theme";

const buttonStyle = (color: ButtonColor) => css`
  background: ${color.default};
  padding: 6px 10px;
  border-radius: 4px;
  border: solid ${color.defaultBorder} 1px;
  font-size: 80%;
  color: ${color.isDark ? "#fafafa" : "#212121"};
  box-shadow: inset 0 1px 0 0 rgba(250, 250, 250, 0.3), ${shadows.buttonDrop};
  transition: all 60ms ease-out;
  outline: none;
  font-weight: bold;

  &:hover:enabled {
    cursor: pointer;
    border-color: ${color.hoverBorder};
    background: ${color.hover};
  }

  &:active:enabled {
    box-shadow: none;
    background: ${color.active};
    border-color: ${color.activeBorder};
    outline: none;
  }

  &:focus:enabled:not(:active) {
    outline: none;
    box-shadow: inset 0 1px 0 0 rgba(250, 250, 250, 0.5),
      0 0 0 4px ${colors.highlightBorderColor};
  }

  &:disabled {
    background: ${color.disabled};
    border-color: ${color.disabled};
    box-shadow: none;
    color: ${color.isDark ? "#f0f0f0" : "#808080"};
  }
`;

interface ButtonColor {
  default: string;
  defaultBorder: string;
  hover: string;
  hoverBorder: string;
  active: string;
  activeBorder: string;
  disabled: string;
  isDark?: boolean;
}

interface ButtonProps {
  color?: ButtonColor;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  color = buttonColors.white,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      css={buttonStyle(color)}
      onClick={onClick}
      disabled={!onClick || disabled}
    >
      {children}
    </button>
  );
}
