import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface Props {
    dispatch: any;
    state: any;
}
export default function PermitInformation({ dispatch, state }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (dispatch) {
            dispatch({
                type: 'ADD_INFOR',
                payload: {
                    name: e.target.name,
                    value: e.target.value,
                },
            });
        }
    };
    const handleChangeDate = (name: string, value: any) => {
        if (dispatch) {
            dispatch({
                type: 'ADD_INFOR',
                payload: {
                    name,
                    value: value ? value.toISOString() : '',
                },
            });
        }
    };
    return (
        <div className="grid gap-6 border border-gray-300 rounded p-4">
            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                    <label className="font-medium text-slate-700">Name Of Company</label>
                </div>
                <div className="md:col-span-2">
                    <TextField
                        required
                        placeholder="Type text..."
                        fullWidth
                        value={state?.companyName || ''}
                        name="companyName"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                    <label className="font-medium text-slate-700"> No of persons covered in permit</label>
                </div>
                <div className="md:col-span-2">
                    <TextField
                        placeholder="Type number..."
                        required
                        type="number"
                        name="peopleNumber"
                        value={state?.peopleNumber || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>
            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                    <label className="font-medium text-slate-700"> Permit Period</label>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                label="Start Date"
                                value={state?.startTime ? dayjs(state.startTime) : null}
                                onChange={(newValue) => handleChangeDate('startTime', newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                label="End Date"
                                value={state?.endTime ? dayjs(state.endTime) : null}
                                onChange={(newValue) => handleChangeDate('endTime', newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                    <label className="font-medium text-slate-700">Tools/Equipment to be used</label>
                </div>
                <div className="md:col-span-2">
                    <TextField
                        required
                        placeholder="Type text..."
                        fullWidth
                        variant="outlined"
                        name="equipments"
                        value={state?.equipments || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                    <label className="font-medium text-slate-700"> Location (provide plot plan if needed)</label>
                </div>
                <div className="md:col-span-2">
                    <TextField
                        required
                        placeholder="Type text..."
                        fullWidth
                        variant="outlined"
                        name="location"
                        value={state?.location || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}
