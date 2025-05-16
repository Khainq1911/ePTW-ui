import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function DateRangePreview({ item, dispatch }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                <label className="font-medium text-slate-700">{item.label}</label>
            </div>
            <div className="md:col-span-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DatePicker
                            label="Start date"
                            value={item?.value?.start ? dayjs(item?.value?.start) : null}
                            onChange={(value) => {
                                if (dispatch) {
                                    dispatch({
                                        type: 'SET_START_DATE',
                                        payload: { id: item?.id, start: value?.toISOString() },
                                    });
                                }
                            }}
                        />

                        <DatePicker
                            label="End date"
                            value={item?.value?.end ? dayjs(item?.value?.end) : null}
                            onChange={(value) => {
                                if (dispatch) {
                                    dispatch({
                                        type: 'SET_END_DATE',
                                        payload: { id: item?.id, end: value?.toISOString() },
                                    });
                                }
                            }}
                        />
                    </div>
                </LocalizationProvider>
            </div>
        </div>
    );
}
