import { Grid2, TextField } from "@mui/material";

export default function MultipleLineInput() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={4}>
        <TextField label="Title" fullWidth />
      </Grid2>
      <Grid2 size={8} sx={{bgcolor: ""}}>
        <TextField multiline fullWidth disabled placeholder="Multiple Line"/>
      </Grid2>
    </Grid2>
  );
}
