import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { formatDate } from "../../utils/dayjs";
import { useState } from "react";
import TemplateDialog from "./templateDialog";

export default function TemplateCard({ item }: { item: any }) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Card sx={{ width: 240, p: 1 }}>
      <header className="flex justify-between items-center py-1">
        <Checkbox />
        <Button>
          <SettingsTwoToneIcon />
        </Button>
      </header>
      <CardContent sx={{ mt: -2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Id: {item.id}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Created At: {formatDate(item.created_at)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Preview
        </Button>
      </CardActions>

      <TemplateDialog openDialog={openDialog} setOpenDialog={setOpenDialog} item={item}/>
    </Card>
  );
}
