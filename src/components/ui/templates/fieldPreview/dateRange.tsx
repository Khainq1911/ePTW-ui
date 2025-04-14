import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function DateRangePreview({ item, dispatch }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>{item.label}</Grid>
      <Grid size={8}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center">
            <DatePicker
              label="Start date"
              value={item?.value?.start ? dayjs(item?.value?.start) : null}
              onChange={(value) =>
                dispatch({
                  type: "SET_START_DATE",
                  payload: { id: item?.id, start: value?.toISOString() },
                })
              }
            />
            <span className="mx-2">-</span>
            <DatePicker
              label="End date"
              value={item?.value?.end ? dayjs(item?.value?.end) : null}
              onChange={(value) =>
                dispatch({
                  type: "SET_END_DATE",
                  payload: { id: item?.id, end: value?.toISOString() },
                })
              }
            />
          </div>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
