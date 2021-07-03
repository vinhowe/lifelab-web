/** @jsx jsx */
import { jsx } from "@emotion/core";
import { listStyle, smallListStyle } from "../theme/styles";
import React from "react";

export default function LabItemList<T>({
  items,
  children,
  small,
}: {
  items: T[];
  children: (value: T, index: number, array: T[]) => React.ReactNode;
  small?: boolean;
}): JSX.Element {
  return (
    <div css={small ? smallListStyle : listStyle}>
      {items.length > 0 && items.map(children)}
    </div>
  );
}
