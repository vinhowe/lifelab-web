/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { MouseEventHandler } from "react";

const buttonStyle = (color: ButtonColor) => css`
  background: ${color.default};
  padding: 6px 10px;
  border-radius: 4px;
  border: solid ${color.defaultBorder} 1px;
  font-size: 90%;
  color: ${color.isDark ? "#fafafa" : "#212121"};
  box-shadow: inset 0 1px 0 0 rgba(250, 250, 250, 0.5),
    rgba(80, 80, 80, 0.1) 0 2px;
  transition: box-shadow 100ms ease-out;

  &:hover:enabled {
    cursor: pointer;
    border-color: ${color.hoverBorder};
    background: ${color.hover};
  }

  &:active:enabled {
    //cursor: pointer;
    box-shadow: none;
    background: ${color.active};
    border-color: ${color.activeBorder};
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

export const ButtonColors: Record<string, ButtonColor> = {
  white: {
    default: "#fdfdfd",
    defaultBorder: "#d0d0d0",
    hover: "#f0f0f0",
    hoverBorder: "#c8c8c8",
    active: "#e2e2e2",
    activeBorder: "#b8b8b8",
    disabled: "#f2f2f2",
  },
  green: {
    default: "#21d04c",
    defaultBorder: "#21ba47",
    hover: "#22c44a",
    hoverBorder: "#20a140",
    active: "#21aa43",
    activeBorder: "#1f933c",
    disabled: "#82c79b",
    isDark: true,
  },
  red: {
    default: "#d02121",
    defaultBorder: "#ba2121",
    hover: "#c42222",
    hoverBorder: "#a12020",
    active: "#aa2121",
    activeBorder: "#931f1f",
    disabled: "#c78282",
    isDark: true,
  },
};

interface ButtonProps {
  color?: ButtonColor;
  onClick?: MouseEventHandler;
  children: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  color = ButtonColors.white,
}: ButtonProps): JSX.Element {
  return (
    <button css={buttonStyle(color)} onClick={onClick} disabled={!onClick}>
      {children}
    </button>
  );
}
