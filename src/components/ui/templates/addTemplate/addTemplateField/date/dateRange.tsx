import { Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DateRange({ dispatch, value, id }: any) {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center">
            <DatePicker disabled sx={{ bgcolor: "#F6F6F6" }} />
            <span className="mx-2">-</span>
            <DatePicker disabled sx={{ bgcolor: "#F6F6F6" }} />
          </div>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
