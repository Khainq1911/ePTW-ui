import { Grid, TextField } from "@mui/material";

export default function Input({ item, dispatch, data }: any) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <Grid size={8}>
        <TextField
          fullWidth
          placeholder="Type text..."
          onChange={(e) =>
            dispatch({
              type: "SET_VALUE",
              payload: { id: item.id, value: e.target.value },
            })
          }
        />
      </Grid>
    </Grid>
  );
}
