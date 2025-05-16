import { Grid } from "@mui/material";
import { formatDate } from "../../../utils/dayjs";


export default function PermitDateRange({ item }: any) {
  return (
    <Grid container spacing={2}>
      <Grid size={4} sx={{ fontWeight: "500" }}>
        <p>{item?.label}</p>
      </Grid>
      <Grid size={8}>
        <p>
          {formatDate(item?.value?.start, "dd, MM, DD, YYYY")}
          <span className="mx-2">-</span>
          {formatDate(item?.value?.start, "dd, MM, DD, YYYY")}
        </p>
      </Grid>
    </Grid>
  );
}
