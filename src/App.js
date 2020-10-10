import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./styles.css";
const initialItems = [
  { id: "1", content: "first item" },
  { id: "2", content: "second item" },
  { id: "3", content: "third item" },
  { id: "4", content: "fourth item" },
  { id: "5", content: "fifth item" },
  { id: "6", content: "sixth item" }
];
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function App() {
  const [listItems, setListItems] = useState(initialItems);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(
      listItems,
      result.source.index,
      result.destination.index
    );
    setListItems(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
