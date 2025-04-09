import { Grid2, TextField } from "@mui/material";

export default function SingleLineInput() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={4}>
        <TextField label="Title" fullWidth />
      </Grid2>
      <Grid2 size={8} sx={{bgcolor: ""}}>
        <TextField fullWidth placeholder="Single line" disabled />
      </Grid2>
    </Grid2>
  );
}
