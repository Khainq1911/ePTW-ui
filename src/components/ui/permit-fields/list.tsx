import { Grid, ToggleButton } from '@mui/material';
import { StyledToggleButtonGroup } from '../../../utils/customizeToggleBtn';

export default function PermitList({ item }: any) {
    return (
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid size={4} sx={{ fontWeight: '500' }}>
                {item.label}
            </Grid>
            <Grid size={8}>
                <StyledToggleButtonGroup value={item?.value} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {item?.options?.map((option: string, index: number) => (
                        <ToggleButton value={option} key={index}>
                            {option}
                        </ToggleButton>
                    ))}
                </StyledToggleButtonGroup>
            </Grid>
        </Grid>
    );
}
