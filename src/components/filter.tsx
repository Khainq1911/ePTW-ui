import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
export default function Filter() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center">
      <TextField variant="outlined" label="Search" />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate("/template/add")}
      >
        Add Template
      </Button>
    </div>
  );
}
