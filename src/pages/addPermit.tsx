import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { getByIdService } from "../services/templates.service";
import { TemplateType } from "../types/template.type";
import TemplatePreview from "../components/ui/templates/preview";
import { getUser } from "../hooks/useAuth";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { initialState, reducer } from "../hooks/reducer/permitReducer";
import { createPermitService } from "../services/permit.service";

export default function AddPermit() {
  const [template, setTemplate] = useState<TemplateType | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getTemplate = async () => {
      try {
        const res = await getByIdService(Number(id));
        dispatch({ type: "SET_DATA", payload: res.fields });
        setTemplate(res);
      } catch (error) {}
    };

    getTemplate();
  }, []);

  const handleCreatePermit = async () => {
    const payload = {
      ...state,
      peopleNumber: Number(state.peopleNumber),
      templateId: template?.id,
      senderId: getUser()?.id,
    };
    try {
      await createPermitService(payload);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[80%] mx-auto p-4 ">
      <div className="flex justify-between items-center my-4">
        <Button
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
        <Button
          color="warning"
          startIcon={<SaveIcon />}
          onClick={handleCreatePermit}
        >
          Save
        </Button>
      </div>

      <TemplatePreview
        item={template}
        userName={getUser()?.name}
        dispatch={dispatch}
        state={state}
      />
    </div>
  );
}
