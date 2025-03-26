import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useMemo, useReducer, useState } from "react";
import AddField from "../components/templates/addTemplate/addField";
import { initialState, reducer } from "../hooks/reducer/templateReducer";
import { createTemplateService } from "../services/templates.service";
import { useNotification } from "../hooks/useNotify";

enum Part {
  ATTACHMENTS = "attachments",
  PPE_REQUIRED = "ppe_required",
  PREWORK_CHECKS = "prework_checks",
}

export default function AddTemplate() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fields = [
    { name: "Attached Documents", alias: "attachments" },
    { name: "PPE Requires", alias: "ppe_required" },
    { name: "Pre-work Checks", alias: "prework_checks" },
  ];
  const [item, setItem] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (value: any) => {
    setOpenDialog(true);
    setItem(value);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItem(undefined);
  };

  const { notify } = useNotification();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createTemplateService(state);
      notify("Template created successfully", "success", "Success");
      navigate("/");
    } catch {
      notify("An error occurred while saving the template", "error", "Error");
    }
  };

  const handleDeleteField = (part: any, value: any) => {
    switch (part) {
      case Part.ATTACHMENTS:
        return dispatch({ type: "DELETE_ATTACHMENTS", payload: value });
      case Part.PPE_REQUIRED:
        return dispatch({ type: "DELETE_PPE_REQUIRED", payload: value });
      case Part.PREWORK_CHECKS:
        return dispatch({ type: "DELETE_PREWORK_CHECKS", payload: value });
      default:
        return;
    }
  };

  const handleRenderChip = (part: string) => {
    const items = state.fields?.[part]?.fields || [];

    return items && items.length > 0 ? (
      <div className="flex gap-2 flex-wrap">
        {items.map((item: any, index: number) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleDeleteField(part, item)}
          />
        ))}
      </div>
    ) : (
      <div className="italic text-gray-500">No fields available</div>
    );
  };

  const listFields = useMemo(() => {
    const value = fields.map((item, index) => (
      <div key={index} className="border border-gray-300 p-5 rounded">
        <Divider
          textAlign="left"
          className="font-semibold text-2xl text-gray-500"
        >
          {item.name}

        </Divider>
        <div className="flex justify-between my-5">
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={state.fields[item.alias]?.type || ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_TYPE",
                  part: item.alias,
                  payload: e.target.value,
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Yes/No/NA">Yes/No/NA</MenuItem>
              <MenuItem value="Check">Check</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Title" required />
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog(item)}
          >
            New Fields
          </Button>
        </div>

        <div className="italic">
         {handleRenderChip(item.alias) || "There is no field added!"}
        </div>
      </div>
    ));
    return value;
  }, [state]);

  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit}>
      <AddField
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        part={item}
        dispatch={dispatch}
        handleRenderChip={handleRenderChip}
      />
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Back to home
      </Button>

      <div className="w-[70%] mx-auto p-8 rounded shadow grid gap-8">
        <header className="flex justify-end">
          <Button variant="outlined" color="warning">
            Preview
          </Button>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Template Name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
            required
          />
          <TextField
            label="Template Description"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            sx={{ columnSpan: 2 }}
            multiline
            required
          />
        </div>
        {listFields}
        <footer className="flex justify-end">
          <Button variant="contained" type="submit">
            submit
          </Button>
        </footer>
      </div>
    </form>

  );
}
