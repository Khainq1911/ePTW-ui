import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { formatDate } from "../../../utils/dayjs";
import { useState } from "react";
import TemplateDialog from "./preview/dialog";
import { useNavigate } from "react-router-dom";
import { isWorker } from "../../../hooks/useAuth";

export default function TemplateCard({ item }: { item: any }) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Card sx={{ width: 240, p: 1 }}>
      {!isWorker() && (
        <header className="flex justify-between items-center py-1">
          <Tooltip title="Delete" placement="top">
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Update" placement="top">
            <IconButton
              color="primary"
              onClick={() => navigate(`/template/update/${item?.id}`)}
            >
              <SettingsTwoToneIcon />
            </IconButton>
          </Tooltip>
        </header>
      )}
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
        <div>
          <Button size="small" onClick={handleOpenDialog}>
            Preview
          </Button>
          <Button
            size="small"
            onClick={() => navigate(`/template/${item.id}`)}
            sx={{ color: "green" }}
          >
            Use this template
          </Button>
        </div>
      </CardActions>

      <TemplateDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        item={item}
      />
    </Card>
  );
}
