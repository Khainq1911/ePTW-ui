import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { isWorker } from "../../hooks/useAuth";
export default function Filter({
  handleChange,
  query,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
}) {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center">
      <TextField
        variant="outlined"
        value={query}
        label="Search"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{ display: isWorker() ? "none" : "inline-flex" }}
        startIcon={<AddIcon />}
        onClick={() => navigate("/template/add")}
      >
        Add Template
      </Button>
    </div>
  );
}
