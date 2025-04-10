import { Grid, TextField } from "@mui/material";

export default function MultipleLineInput({ dispatch, value, id }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <TextField
          label="Title"
          fullWidth
          value={value}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_TITLE",
              payload: { title: e.target.value, id },
            })
          }
        />
      </Grid>
      <Grid size={8} sx={{ bgcolor: "#F6F6F6" }}>
        <TextField multiline fullWidth disabled placeholder="Multiple Line" />
      </Grid>
    </Grid>
  );
}
