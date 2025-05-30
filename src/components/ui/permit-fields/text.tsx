import { Grid } from "@mui/material";

export default function PermitText({ item }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item?.label}
      </Grid>
      <Grid size={8}>
        <p className="whitespace-pre-wrap">{item?.value}</p>
      </Grid>
    </Grid>
  );
}
