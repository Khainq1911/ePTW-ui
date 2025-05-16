import { ToggleButton } from '@mui/material';
import { StyledToggleButtonGroup } from '../../../utils/customizeToggleBtn';
import { TYPE } from '../../../constants/templateFieldType';

export default function YesNoNaPreview({ item, dispatch }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="bg-slate-50 rounded-md p-3 flex items-center h-full">
                <label className="font-medium text-slate-700">{item.label}</label>
            </div>
            <div className="md:col-span-2">
                <StyledToggleButtonGroup
                    value={item.value}
                    onChange={(_, value) => {
                        if (dispatch) {
                            dispatch({
                                type: 'SET_VALUE',
                                payload: { id: item.id, value },
                            });
                        }
                    }}
                    exclusive
                >
                    <ToggleButton value="yes">Yes</ToggleButton>
                    <ToggleButton value="no">No</ToggleButton>
                    {item.type === TYPE.YES_NO ? null : <ToggleButton value="na">NA</ToggleButton>}
                </StyledToggleButtonGroup>
            </div>
        </div>
    );
}
