import { useParams } from "react-router-dom";
import { getByIdService } from "../services/templates.service";
import { useEffect, useReducer } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { handleDragEnd } from "../utils/dragEnd";
import SidebarTemplate from "../components/ui/addTemplateV2/sidebar";
import TemplateContent from "../components/ui/addTemplateV2/templateContent";
import { initialState, reducer } from "../hooks/reducer/templateReducerV2";

export default function UpdateTemplate() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await getByIdService(Number(id));
        dispatch({ type: "SET_INITAL_DATA", payload: res });
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    if (id) {
      fetchTemplate();
    }
  }, [id]);

  return (
    <DragDropContext
      onDragEnd={(result) => handleDragEnd(result, dispatch, state)}
    >
      <div style={{ height: "calc(100vh - 70px)" }}>
        <SidebarTemplate />
        <TemplateContent
          id={"1"}
          updateId={id}
          items={state.fields}
          dispatch={dispatch}
          state={state}
        />
      </div>
    </DragDropContext>
  );
}
