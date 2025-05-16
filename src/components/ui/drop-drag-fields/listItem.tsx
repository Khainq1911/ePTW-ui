import { Grid, IconButton, InputBase, Paper, TextField, ToggleButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { StyledToggleButtonGroup } from '../../../utils/customizeToggleBtn';

export default function ListItem({ dispatch, value, id, options }: any) {
    const [optionInput, setOptionInput] = useState('');

    const handleAddOption = (e: React.FormEvent) => {
        e.preventDefault();
        if (!optionInput.trim()) return;

        dispatch({
            type: 'ADD_OPTION',
            payload: {
                id,
                option: optionInput.trim(),
            },
        });
        setOptionInput('');
    };

    return (
        <Grid container spacing={2}>
            <Grid size={4}>
                <TextField
                    label="Title"
                    fullWidth
                    value={value}
                    onChange={(e) =>
                        dispatch({
                            type: 'UPDATE_TITLE',
                            payload: { title: e.target.value, id },
                        })
                    }
                />
            </Grid>

            <Grid size={8}>
                <Paper
                    component="form"
                    onSubmit={handleAddOption}
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        mb: 1,
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter option"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        inputProps={{ 'aria-label': 'enter option' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="add">
                        <AddIcon />
                    </IconButton>
                </Paper>

                <StyledToggleButtonGroup>
                    {options?.map((opt: string, index: number) => (
                        <ToggleButton key={index} value={opt} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {opt}

                            <CloseIcon
                                fontSize="small"
                                onClick={() =>
                                    dispatch({
                                        type: 'DELETE_OPTION',
                                        payload: { id, option: opt },
                                    })
                                }
                            />
                        </ToggleButton>
                    ))}
                </StyledToggleButtonGroup>
            </Grid>
        </Grid>
    );
}
