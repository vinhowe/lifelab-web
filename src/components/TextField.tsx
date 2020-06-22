/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { CSSProperties } from "react";
import { colors } from "../theme/theme";

const inputStyle = css`
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 15px 0;
  font-family: "Lato", sans-serif;
  box-shadow: rgba(80, 80, 80, 0.1) 0 2px;
  padding: 8px 10px;
  width: 100%;
  transition: all 60ms ease-out;

  &:active:enabled {
    outline: none;
  }

  &:focus:enabled:not(:active) {
    outline: none;
    box-shadow: 0 0 0 4px ${colors.highlightBorderColor};
  }
`;

export interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  style?: CSSProperties;
}

export default function TextField({
  value,
  onChange,
  style,
}: TextFieldProps): JSX.Element {
  return (
    <input
      type="text"
      css={inputStyle}
      value={value}
      style={style}
      placeholder={"Start writing..."}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
