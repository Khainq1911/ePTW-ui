import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DatePickerPreview({ item }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date" />
      </LocalizationProvider>
    </Grid>
  );
}
