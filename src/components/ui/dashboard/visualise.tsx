import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TypeChart } from '../../../types/enum';
import { totalUserService } from '../../../services/auth.service';
import { useState } from 'react';
interface Props {
    showAs: string;
    createdBy: string;
    setShowAs: (value: string) => void;
    setCreatedBy: (value: string) => void;
}
export default function Visualise({ setShowAs, showAs, createdBy, setCreatedBy }: Props) {
    const [userOptions, setUserOptions] = useState<any>();
    const listUser = async () => {
        try {
            if (!userOptions) {
                const res = await totalUserService();
                const userOptions = res?.map((user: { id: number; name: string }) => ({
                    id: user?.id,
                    name: user?.name,
                }));
                setUserOptions(userOptions);
            }
        } catch (error) {}
    };

    const handleChangeChartType = (event: SelectChangeEvent) => {
        setShowAs(event.target.value as string);
    };

    const handleChangeCreatedBy = (event: SelectChangeEvent) => {
        setCreatedBy(event.target.value as string);
    };
    return (
        <div>
            <h2 className="text-gray-500 my-3">VISUALISE</h2>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={4}>
                    <h3 className="font-medium">Show as:</h3>
                </Grid>
                <Grid size={8}>
                    <FormControl fullWidth sx={{ marginTop: '8px' }}>
                        <InputLabel id="chart-type-select-label">Chart Type</InputLabel>
                        <Select
                            labelId="chart-type-select-label"
                            id="chart-type-select"
                            value={showAs}
                            label="Chart Type"
                            onChange={handleChangeChartType}
                        >
                            <MenuItem value={TypeChart.BAR}>Bar chart</MenuItem>
                            <MenuItem value={TypeChart.PIE}>Pie chart</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={4}>
                    <h3 className="font-medium">Created by:</h3>
                </Grid>
                <Grid size={8}>
                    <FormControl fullWidth sx={{ marginTop: '8px' }}>
                        <InputLabel id="created-by-select-label">Created By</InputLabel>
                        <Select
                            onFocus={listUser}
                            onChange={handleChangeCreatedBy}
                            labelId="created-by-select-label"
                            id="created-by-select"
                            value={createdBy}
                            label="Created By"
                        >
                            <MenuItem value="">None</MenuItem>
                            {userOptions?.map((item: { id: number; name: string }) => (
                                <MenuItem key={item?.id} value={item?.id}>
                                    {item?.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}
