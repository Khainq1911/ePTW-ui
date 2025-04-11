import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DateRangePreview({ item }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>{item.label}</Grid>
      <Grid size={8}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center">
            <DatePicker label="Start date" />
            <span className="mx-2">-</span>
            <DatePicker label="End date" />
          </div>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
