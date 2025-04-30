import { Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface Props {
    startTime: Dayjs | null;
    endTime: Dayjs | null;
    setStartTime: (value: any) => void;
    setEndTime: (value: any) => void;
}

export default function Data({ startTime, endTime, setStartTime, setEndTime }: Props) {
    return (
        <div>
            <h2 className="text-gray-500 my-3">DATA</h2>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={4}>
                    <h3 className="font-medium">Start Time:</h3>
                </Grid>
                <Grid size={8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                sx={{ paddingTop: 0 }}
                                maxDate={endTime || undefined}
                                label="Start Time"
                                value={startTime}
                                slotProps={{
                                    field: { clearable: true, onClear: () => setStartTime(null) },
                                    textField: { sx: { pt: 0 }, fullWidth: true },
                                }}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                <Grid size={4}>
                    <h3 className="font-medium">End:</h3>
                </Grid>
                <Grid size={8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                slotProps={{
                                    field: { clearable: true, onClear: () => setEndTime(null) },
                                    textField: { fullWidth: true },
                                }}
                                minDate={startTime || undefined}
                                label="End Time"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </div>
    );
}
