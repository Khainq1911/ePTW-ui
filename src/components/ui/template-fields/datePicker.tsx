import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function DatePickerPreview({ item }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                <label className="font-medium text-slate-700">{item.label}</label>
            </div>
            <div className="md:col-span-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date" sx={{ width: '100%' }} />
                </LocalizationProvider>
            </div>
        </div>
    );
}
