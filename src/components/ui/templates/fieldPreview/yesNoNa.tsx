import { Grid, ToggleButton } from "@mui/material";
import { StyledToggleButtonGroup } from "../../../../utils/customizeToggleBtn";
import { TYPE } from "../../../../constants/templateFieldType";
import { useState } from "react";

export default function YesNoNAPreview({ item }: any) {
  const [selected, setSelected] = useState("");

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    value: string | null,
  ) => {
    if (value !== null) {
      setSelected(value);
    }
  };

  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <Grid size={8}>
        <StyledToggleButtonGroup value={selected} onChange={handleChange} exclusive>
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
