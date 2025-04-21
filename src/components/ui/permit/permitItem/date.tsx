import { Grid } from "@mui/material";

export default function PermitDatePicker({ item }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4} sx={{ fontWeight: "500" }}>{item?.label}</Grid>
      <Grid size={8}>{item?.value}</Grid>
    </Grid>
  );
}
