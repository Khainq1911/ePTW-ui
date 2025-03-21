import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
export default function TemplateCard({ item }: { item: any }) {
  return (
    <Card sx={{ width: 240 }}>
      <header className="flex justify-between items-center py-1">
        <Checkbox />
        <Button> 
          <SettingsTwoToneIcon />
        </Button>
      </header>
      <CardContent sx={{ marginTop: "-20px" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {item.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Id: {item.id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Preview</Button>
      </CardActions>
    </Card>
  );
}
