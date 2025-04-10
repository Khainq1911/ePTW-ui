import { TemplateType } from "../../../types/template.type";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { getUser } from "../../../hooks/useAuth";
import { Divider, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface TemplateProps {
  template: TemplateType | null;
}

export default function Template({ template }: TemplateProps) {
  const user = getUser();

  if (!template) return <div>Loading...</div>;

  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-4xl">{template.name}</p>
        <div>
          <strong className="text-[16px] mr-2">{user?.name}</strong>
          <AccountCircleRoundedIcon sx={{ fontSize: "32px" }} />
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-3">
        <h2 className="font-semibold">Name Of Company</h2>
        <div>
          <TextField label="Company" variant="outlined" />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <h2 className="font-semibold">Permit Applicant</h2>
        <div>
          <TextField label="Applicant" variant="outlined" />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <h2 className="font-semibold">No of persons covered in permit</h2>
        <TextField label="Number of people" variant="outlined" />
      </div>
      <div className="grid grid-cols-3">
        <h2 className="font-semibold">Permit Period</h2>
        <div className="col-span-2 flex items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Start Date" />
            </DemoContainer>
          </LocalizationProvider>
          <span className="mx-3 border w-3 border-gray-400"></span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="End Date" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <h2 className="font-semibold">Work Activity</h2>
        <TextField
          multiline
          placeholder="Type text..."
          className="col-span-2"
        />
      </div>
      <div className="grid grid-cols-3 cols">
        <h2 className="font-semibold">Tools/Equipment to be used</h2>
        <TextField
          multiline
          placeholder="Type text..."
          className="col-span-2"
        />
      </div>
      <div className="grid grid-cols-3">
        <h2 className="font-semibold">
          Location (provide plot plan if needed)
        </h2>
        <TextField
          multiline
          placeholder="Type text..."
          className="col-span-2"
        />
      </div>
    </div>
  );
}
