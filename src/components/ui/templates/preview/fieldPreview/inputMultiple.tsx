import { Grid, TextField } from '@mui/material';

export default function MultipleInput({ item, dispatch }: any) {
    return (
        <Grid container spacing={2}>
            <Grid size={4} sx={{ fontWeight: '500' }}>
                {item.label}
            </Grid>
            <Grid size={8}>
                <TextField
                    multiline
                    fullWidth
                    placeholder="Type text..."
                    value={item?.value}
                    onChange={(e) =>
                        dispatch({
                            type: 'SET_VALUE',
                            payload: { id: item.id, value: e.target.value },
                        })
                    }
                />
            </Grid>
        </Grid>
    );
}
