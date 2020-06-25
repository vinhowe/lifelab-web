/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { CSSProperties } from "react";
import { colors } from "../theme/colors";
import { shadows } from "../theme/styles";
import { buttonColors } from "../theme/colors";

const inputStyle = css`
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 15px 0;
  font-family: "Lato", sans-serif;
  box-shadow: ${shadows.buttonDrop};
  padding: 8px 10px;
  width: calc(100% - 20px);
  transition: all 60ms ease-out;

  &:active:enabled {
    outline: none;
  }

  &:disabled {
    background: ${buttonColors.white.disabled};
    border-color: ${buttonColors.white.disabled};
  }

  &:focus:enabled:not(:active) {
    outline: none;
    box-shadow: 0 0 0 4px ${colors.highlightBorderColor};
  }
`;

export interface TextFieldProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  style?: CSSProperties;
  type?: string;
}

export default function TextField({
  value,
  placeholder,
  disabled,
  onChange,
  style,
  type = "text",
}: TextFieldProps): JSX.Element {
  return (
    <input
      type={type}
      css={inputStyle}
      value={value}
      style={style}
      placeholder={placeholder || "Start writing..."}
      disabled={disabled || !onChange}
      onChange={(e) => !!onChange && onChange(e.target.value)}
    />
  );
}
