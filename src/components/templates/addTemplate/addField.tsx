import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  openDialog: boolean;
  part: any;
  handleCloseDialog: () => void;
  dispatch: (type: any, payload?: any) => void;
  handleRenderChip: any;
}

enum Part {
  ATTACHMENTS = "attachments",
  PPE_REQUIRED = "ppe_required",
  PREWORK_CHECKS = "prework_checks",
}

export default function AddField({
  part,
  openDialog,
  handleCloseDialog,
  dispatch,
  handleRenderChip,
}: Props) {
  const [input, setInput] = useState("");

  const handleAddField = () => {
    if (input.trim() === "") return;
    setInput("");
    switch (part.alias) {
      case Part.ATTACHMENTS:
        return dispatch({ type: "ADD_ATTACHMENTS", payload: input });
      case Part.PPE_REQUIRED:
        return dispatch({ type: "ADD_PPE_REQUIRED", payload: input });
      case Part.PREWORK_CHECKS:
        return dispatch({ type: "ADD_PREWORK_CHECKS", payload: input });
      default:
        return;
    }
  };


  const GetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("submit");
          },
        },
      }}
      fullWidth
    >
      <DialogTitle>{part?.name}</DialogTitle>
      <DialogContent>
        <div className="flex items-center mt-2 mb-6 gap-4">
          <TextField label="New Item" value={input} autoFocus={true} onChange={GetInputValue} />
          <Button color="primary" variant="outlined" onClick={handleAddField}>
            Add Item
          </Button>
        </div>
        <div className="italic">{handleRenderChip(part?.alias)}</div>
      </DialogContent>
    </Dialog>
  );
}
