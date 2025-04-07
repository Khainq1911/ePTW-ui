import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { formatDate } from "../../utils/dayjs";

export default function PermitCard({ item }: { item: any }) {
  return (
    <Card
      className="w-[300px]"
      sx={{ "&:hover": { backgroundColor: "#f3f4f6" } }}
    >
      <CardHeader
        avatar={
          <Avatar>
            <PersonOutlineOutlinedIcon />
          </Avatar>
        }
        title={
          <span className="font-semibold text-[18px]">{"Khai Nguyen"}</span>
        }
      />
      <CardContent className="grid gap-2">
        <p className="font-medium">
          Permit ID:<span className="ml-1">{item.id}</span>
        </p>
        <p className="font-medium">
          Status:<span className="ml-1">{item.status}</span>
        </p>
        <p className="font-medium">
          Expiry:
          <span className="ml-1">{formatDate(item.end, "MMMM DD, YYYY")}</span>
        </p>
        <p className="font-medium text-gray-400">
          Created:
          <span className="ml-1">
            {formatDate(item.created_at, "MMM DD, YYYY hh:mm A")}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
