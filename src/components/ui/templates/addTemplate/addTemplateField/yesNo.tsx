import {
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export default function YesNo({ dispatch, value, id, type }: any) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: "center",
      }}
    >
      <Grid>
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
      <Grid>
        <ToggleButtonGroup exclusive value={null} size="small" disabled>
          <ToggleButton value={"yes"}>Yes</ToggleButton>
          <ToggleButton value={"no"}>No</ToggleButton>
          {type === "yesNoNa" ? (
            <ToggleButton value={"na"}>NA</ToggleButton>
          ) : null}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
