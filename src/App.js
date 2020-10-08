import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import columns from "./components/columns";
import ColumnList from "./components/ColumnList";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const onDragStart = () => {
  document.body.style.backgroundColor = "green";
};

const onDragEnd = (result, columns, setColumns) => {
  document.body.style.backgroundColor = "white";
  if (!result.destination) return;
  const { source, destination, type } = result;
  if (type === "task") {
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  } else if (type === "column") {
    console.log(type);
  }
};

function App() {
  const [col, setCol] = useState(columns);
  return (
    <Container>
      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={(result) => onDragEnd(result, col, setCol)}
      >
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <div {...provided.droppableProps} innerRef={provided.innerRef}>
              <ColumnList col={col} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default App;
