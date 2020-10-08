import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Task = styled.div`
  padding: 16px;
  width: 200px;
  margin: 0 0 18px 0;
  min-height: 50px;
  color: white;
  background-color: ${({ drag }) => (drag ? "black" : "#456C86")};
`;

const TaskList = ({ column }) => {
  return (
    <div>
      {column.items.map((item, index) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
              return (
                <Task
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  drag={snapshot.isDragging}
                >
                  {item.content}
                </Task>
              );
            }}
          </Draggable>
        );
      })}
    </div>
  );
};

export default TaskList;
