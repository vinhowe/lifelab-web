/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { smallListStyle } from "../theme/styles";
import React, { useEffect, useState } from "react";
import { ApiObject } from "../types/api";

const checkItemContainer = css`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

export default function LabItemChecklist<T extends ApiObject>({
  loadItemsFn,
  selected,
  onSelectedChanged,
  children,
}: {
  loadItemsFn: () => Promise<T[]>;
  selected: T[];
  onSelectedChanged: (items: T[]) => void;
  children: (value: T, index: number, array?: T[]) => React.ReactNode;
}): JSX.Element {
  const [items, setItems] = useState<T[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadItemsFn().then((loadedItems) => {
      const itemsMap = loadedItems.reduce<Record<string, T>>((accum, value) => {
        accum[value.url] = value;
        return accum;
      }, {});
      setItems(Object.values(itemsMap));
    });
  }, [loadItemsFn]);

  useEffect(() => {
    items.forEach((value) => {
      if (selected.find(({ url }) => url == value.url) == undefined) {
        return;
      }

      selectedItems.add(value.url);
    });

    setSelectedItems(new Set(selectedItems));
  }, [items, selected]);

  return (
    <div css={smallListStyle}>
      {items.length > 0 &&
        items.map((value, index) => (
          <div key={index} css={checkItemContainer}>
            <input
              type="checkbox"
              checked={selectedItems.has(value.url)}
              onChange={(event) => {
                if (event.target.checked) {
                  selectedItems.add(value.url);
                } else {
                  selectedItems.delete(value.url);
                }
                onSelectedChanged(
                  items.filter((item) => selectedItems.has(item.url))
                );
              }}
            />
            {children(value, index)}
          </div>
        ))}
    </div>
  );
}
