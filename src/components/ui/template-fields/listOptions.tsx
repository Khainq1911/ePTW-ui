import { ToggleButton } from '@mui/material';
import { StyledToggleButtonGroup } from '../../../utils/customizeToggleBtn';

export default function ListOptions({ item, dispatch }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                <label className="font-medium text-slate-700">{item.label}</label>
            </div>
            <div className="md:col-span-2">
                <StyledToggleButtonGroup
                    onChange={(_, value) => {
                        if (dispatch) {
                            dispatch({
                                type: 'SET_VALUE',
                                payload: { id: item.id, value },
                            });
                        }
                    }}
                    value={item?.value}
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                >
                    {item?.options?.map((option: string, index: number) => (
                        <ToggleButton value={option} key={index}>
                            {option}
                        </ToggleButton>
                    ))}
                </StyledToggleButtonGroup>
            </div>
        </div>
    );
}
