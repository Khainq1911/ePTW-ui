import { useReducer } from "react";
import TemplateContent from "../components/ui/addTemplateV2/templateContent";
import SidebarTemplate from "../components/ui/addTemplateV2/sidebar";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { initialState, reducer } from "../hooks/reducer/templateReducerV2";
import { handleDragEnd } from "../utils/dragEnd";
export default function CreateTemplateV2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DragDropContext
      onDragEnd={(result) => handleDragEnd(result, dispatch, state)}
    >
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
