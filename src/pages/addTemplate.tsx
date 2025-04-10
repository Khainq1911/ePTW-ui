import { useReducer } from "react";
import { initialState, reducer } from "../hooks/reducer/templateReducer";
import TemplateAction from "../components/ui/addTemplate/templateAction";

export default function AddTemplate() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <TemplateAction state={state} dispatch={dispatch} />
    </div>
  );
}
