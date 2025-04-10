import { useReducer } from "react";
import TemplateContent from "../components/ui/addTemplateV2/templateContent";
import SidebarTemplate from "../components/ui/addTemplateV2/sidebar";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { initialState, reducer } from "../hooks/reducer/templateReducerV2";
export default function CreateTemplateV2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDragEnd = (result: DropResult) => {
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ height: "calc(100vh - 70px)" }}>
        <SidebarTemplate />
        <TemplateContent
          id={"1"}
          items={state.fields}
          dispatch={dispatch}
          state={state}
        />
      </div>
    </DragDropContext>
  );
}
