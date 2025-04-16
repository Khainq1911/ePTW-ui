import { useReducer } from "react";
import TemplateContent from "../components/ui/templates/addTemplate/addTemplateContent";
import SidebarTemplate from "../components/ui/templates/addTemplate/AddTemplateSidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { initialState, reducer } from "../hooks/reducer/templateReducer";
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
