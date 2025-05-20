import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ReceiverSelect({ listUsers, dispatch, state }: any) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
            <div className="space-y-4">
                <div>
                    <label className="text-slate-700 font-medium">Select Receiver</label>
                </div>
                <FormControl fullWidth>
                    <InputLabel id="receiver">Receiver</InputLabel>
                    <Select
                        labelId="receiver"
                        id="receiver"
                        label="Receiver"
                        value={state?.receiverId  || ''}
                        onChange={(e: any) => dispatch({ type: 'SET_RECEIVER', payload: e.target.value })}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {listUsers.map((user: any) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
