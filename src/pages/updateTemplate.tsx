import { useParams } from "react-router-dom";
import { getByIdService } from "../services/templates.service";
import { useEffect, useReducer } from "react";
import {
  initialState,
  reducer,
} from "../components/hooks/reducer/templateReducer";
import TemplateAction from "../components/ui/addTemplate/templateAction";

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
    <div>
      <TemplateAction state={state} dispatch={dispatch} />
    </div>
  );
}
