import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Filter() {
  return (
    <div className=" flex justify-between items-center">
      <TextField variant="outlined" label="Search" />
      <Button variant="contained" startIcon={<AddIcon />}>
        Add Template
      </Button>
    </div>
  );
}
