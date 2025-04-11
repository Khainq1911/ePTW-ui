import { Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function Date({ dispatch, value, id }: any) {
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
      <Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disabled sx={{ bgcolor: "#F6F6F6" }} />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
