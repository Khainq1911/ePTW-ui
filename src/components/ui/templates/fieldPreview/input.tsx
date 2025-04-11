import { Grid, TextField } from "@mui/material";

export default function Input({ item }: any) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <Grid size={8}>
        <TextField fullWidth placeholder="Type text..." />
      </Grid>
    </Grid>
  );
}
