import { Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface Props {
  dispatch: any;
  state: any;
}

export default function PermitInformation({ dispatch, state }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "ADD_INFOR",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };
  const handleChangeDate = (name: string, value: any) => {
    console.log(state);
    dispatch({
      type: "ADD_INFOR",
      payload: {
        name,
        value: value ? value.toISOString() : "",
      },
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid size={4} className="font-semibold">
        Name Of Company
      </Grid>

      <Grid size={8}>
        <TextField
          placeholder="Type text..."
          variant="outlined"
          fullWidth
          value={state?.companyName || ""}
          name="companyName"
          onChange={handleChange}
        />
      </Grid>

      <Grid size={4} className="font-semibold">
        No of persons covered in permit
      </Grid>
      <Grid size={8}>
        <TextField
          placeholder="Type text..."
          fullWidth
          variant="outlined"
          name="peopleNumber"
          value={state?.peopleNumber || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid size={4} className="font-semibold">
        Permit Period
      </Grid>
      <Grid size={8} className="col-span-2 flex items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Start Date"
              value={state?.start_date ? dayjs(state.startTime) : null}
              onChange={(newValue) => handleChangeDate("startTime", newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <span className="mx-3 border w-3 border-gray-400"></span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="End Date"
              value={state?.end_date ? dayjs(state.endTime) : null}
              onChange={(newValue) => handleChangeDate("endTime", newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      <Grid size={4} className="font-semibold">
        Work Activity
      </Grid>
      <Grid size={8}>
        <TextField
          placeholder="Type text..."
          fullWidth
          variant="outlined"
          name="workActivities"
          value={state?.workActivities || ""}
          onChange={handleChange}
        />
      </Grid>

      <Grid size={4} className="font-semibold">
        Tools/Equipment to be used
      </Grid>
      <Grid size={8}>
        <TextField
          placeholder="Type text..."
          fullWidth
          variant="outlined"
          name="equipments"
          value={state?.equipments || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid size={4} className="font-semibold">
        Location (provide plot plan if needed)
      </Grid>
      <Grid size={8}>
        <TextField
          placeholder="Type text..."
          fullWidth
          variant="outlined"
          name="location"
          value={state?.location || ""}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
