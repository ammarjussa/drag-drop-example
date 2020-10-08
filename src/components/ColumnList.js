import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskList from "./TaskList";

const ColumnContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Column = styled.div`
  padding: 4px;
  width: 250px;
  padding: 30px;
  min-height: 500px;
  background-color: ${({ drag }) => (drag ? "lightblue" : "lightgray")};
`;

const FlexContainer = styled.div`
  display: flex;
  justifycontent: space-around;
`;

const ColumnList = ({ col }) => {
  return (
    <FlexContainer>
      {Object.entries(col).map(([columnId, column], index) => {
        return (
          <Draggable draggableId={columnId} index={index}>
            {(provided) => (
              <div {...provided.draggableProps} innerRef={provided.innerRef}>
                <ColumnContainer key={columnId}>
                  <h2 {...provided.dragHandleProps}>{column.name}</h2>
                  <div>
                    <Droppable
                      droppableId={columnId}
                      key={columnId}
                      type="task"
                    >
                      {(provided, snapshot) => {
                        return (
                          <Column
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            drag={snapshot.isDraggingOver}
                          >
                            <TaskList column={column} />
                            {provided.placeholder}
                          </Column>
                        );
                      }}
                    </Droppable>
                  </div>
                </ColumnContainer>
              </div>
            )}
          </Draggable>
        );
      })}
    </FlexContainer>
  );
};

export default ColumnList;
