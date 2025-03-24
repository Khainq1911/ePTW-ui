import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
export default function AddTemplate() {
  const fields = [
    { label: "Attached Documents", alias: "attachments" },
    { label: "PPE Requires", alias: "ppe_required" },
    { label: "Pre-work Checks", alias: "prework_checks" },
  ];

  const listFields = useMemo(() => {
    const value = fields.map((item, index) => (
      <div key={index} className="border border-gray-300 p-5 rounded">
        <Divider
          textAlign="left"
          className="font-semibold text-2xl text-gray-500"
        >
          {item.label}
        </Divider>
        <div className="flex justify-between my-5">
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
            >
              <MenuItem>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Yes/No/NA</MenuItem>
              <MenuItem value={20}>Check</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="success">
            Add
          </Button>
        </div>

        <div className="italic">
          There's nothong to be added!
        </div>
      </div>
    ));
    return value;
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Back to home
      </Button>

      <div className="w-[70%] mx-auto p-8 rounded shadow grid gap-8">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Template Name" />
          <TextField
            label="Template Description"
            sx={{ columnSpan: 2 }}
            multiline
          />
        </div>
        {listFields}
      </div>
    </div>
  );
}
