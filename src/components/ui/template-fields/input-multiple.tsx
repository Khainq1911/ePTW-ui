import { TextField } from '@mui/material';

export default function MultipleInput({ item, dispatch }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                <label className="font-medium text-slate-700">{item.label}</label>
            </div>
            <div className="md:col-span-2">
                <TextField
                    multiline
                    fullWidth
                    placeholder="Type text..."
                    value={item?.value}
                    onChange={(e) => {
                        if (dispatch) {
                            dispatch({
                                type: 'SET_VALUE',
                                payload: { id: item.id, value: e.target.value },
                            });
                        }
                    }}
                />
            </div>
        </div>
    );
}
