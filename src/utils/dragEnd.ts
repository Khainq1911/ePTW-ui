import { DropResult } from "@hello-pangea/dnd";

export const handleDragEnd = (
  result: DropResult,
  dispatch: any,
  state: any,
) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;

  if (source.droppableId === "sidebar" && destination.droppableId === "1") {
    const newItem = {
      id: `${draggableId}-${Date.now()}`,
      type: draggableId,
      label: "",
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
  }

  //note to repair
  if (
    source.droppableId === "1" &&
    destination.droppableId === "1" &&
    source.index !== destination.index
  ) {
    const reorderedItems = Array.from(state?.fields);
    const [moved] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, moved);
    dispatch({ type: "REORDER_ITEM", payload: reorderedItems });
  }
};
