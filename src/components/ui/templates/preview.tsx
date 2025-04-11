import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Divider } from "@mui/material";
import { renderPreviewTemplate } from "../../../utils/renderPreviewTemplate";

interface PreviewProps {
  item: any;
}

export default function TemplatePreview({ item }: PreviewProps) {
  return (
    <div className="h-full shadow bg-white p-10 rounded-xl grid gap-8">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-4xl">{item.name}</p>
        <div>
          <strong className="text-[16px] mr-2">[User Full Name]</strong>
          <AccountCircleRoundedIcon sx={{ fontSize: "32px" }} />
        </div>
      </div>
      <Divider />
      <div className="grid gap-8">
        {item.fields.map((field: any, index: number) => (
          <div key={index}>{renderPreviewTemplate(field.type, field)}</div>
        ))}
      </div>
    </div>
  );
}
