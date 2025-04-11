import { Grid, ToggleButton } from "@mui/material";
import { StyledToggleButtonGroup } from "../../../../utils/customizeToggleBtn";
import { useState } from "react";

export default function ListOptions({ item }: any) {
  const [listOptions, setListOptions] = useState<string[]>([]);


  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newOptions: string[],
  ) => {
    setListOptions(newOptions);
  };

  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        {item.label}
      </Grid>
      <Grid size={8}>
        <StyledToggleButtonGroup
          onChange={handleChange}
          value={listOptions}
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
