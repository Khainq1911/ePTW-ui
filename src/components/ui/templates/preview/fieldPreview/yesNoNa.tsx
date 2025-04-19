import { Grid, ToggleButton } from "@mui/material";
import { StyledToggleButtonGroup } from "../../../../../utils/customizeToggleBtn";
import { TYPE } from "../../../../../constants/templateFieldType";

export default function YesNoNaPreview({ item, dispatch }: any) {
 
  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <Grid size={8}>
        <StyledToggleButtonGroup
          value={item.value}
          onChange={(_, value) =>
            dispatch({
              type: "SET_VALUE",
              payload: { id: item.id, value },
            })
          }
          exclusive
        >
          <ToggleButton value="yes">Yes</ToggleButton>
          <ToggleButton value="no">No</ToggleButton>
          {item.type === TYPE.YES_NO ? null : (
            <ToggleButton value="na">NA</ToggleButton>
          )}
        </StyledToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
