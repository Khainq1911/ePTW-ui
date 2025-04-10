import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { formatDate } from "../../../utils/dayjs";
import { useState } from "react";
import TemplateDialog from "./templateDialog";
import { useNavigate } from "react-router-dom";

export default function TemplateCard({ item }: { item: any }) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Card sx={{ width: 240, p: 1 }}>
      <header className="flex justify-between items-center py-1">
        <Checkbox />

        <Button onClick={() => navigate(`/template/update/${item?.id}`)}>
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
        <Button size="small" onClick={handleOpenDialog}>
          Preview
        </Button>
      </CardActions>

      <TemplateDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        item={item}
      />
    </Card>
  );
}
