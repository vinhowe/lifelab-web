/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import IssueListItem from "./IssueListItem";
import { Issue } from "../types/issue";
import { listStyle, smallListStyle } from "../theme/styles";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const draggingItemStyle = css`
  border: solid #ccc 1px;
  border-radius: 4px;
`;

// a little function to help us with reordering the result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reorder = <T1 extends any>(
  list: T1[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ReorderableIssueList({
  issues,
  labId,
  onIssuesReorder,
  small,
}: {
  issues: Issue[];
  labId: number;
  onIssuesReorder?: (issues: number[]) => void;
  small?: boolean;
}): JSX.Element {
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination || !onIssuesReorder) {
      return;
    }

    onIssuesReorder(
      reorder(issues, result.source.index, result.destination.index).map(
        ({ id }) => id
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            css={small ? smallListStyle : listStyle}
          >
            {issues.length > 0 &&
              issues.map((issue, index) => (
                <Draggable
                  key={issue.id}
                  draggableId={issue.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      css={snapshot.isDragging ? draggingItemStyle : undefined}
                    >
                      <IssueListItem
                        key={index}
                        issue={issue}
                        labId={labId}
                        small={small}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
