import { Grid, ToggleButton } from "@mui/material";
import { StyledToggleButtonGroup } from "../../../../utils/customizeToggleBtn";

export default function ListOptions({ item, dispatch }: any) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <Grid size={8}>
        <StyledToggleButtonGroup
          onChange={(_, value) =>
            dispatch({
              type: "SET_VALUE",
              payload: { id: item.id, value },
            })
          }
          value={item?.value}
        >
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
