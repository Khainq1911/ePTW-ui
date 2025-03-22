import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

interface Props {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  item: any;
}

export default function TemplateDialog({
  openDialog,
  setOpenDialog,
  item,
}: Props) {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen>
      <div className="w-full h-full bg-[#F4F6F8] overflow-y-scroll">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #D1D9E0",
            bgcolor: "#fff",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setOpenDialog(false)}
          >
            <span className="ml-2">go back</span>
          </Button>
          <Button variant="contained" color="success">
            use this template
          </Button>
        </Toolbar>
        <div className="mt-[70px]">
          <Alert
            severity="info"
            sx={{ borderRadius: "10px", width: "800px", margin: "10px auto" }}
          >
            This is a <strong>preview only</strong>. Click the "Use this
            template" button in the top right to start creating forms in your
            account
          </Alert>

          <div className="w-[70%] mx-auto h-full shadow bg-white p-10 rounded-xl grid gap-8">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-4xl">{item.name}</p>
              <div>
                <strong className="text-[16px] mr-2">[User Full Name]</strong>
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

            <div className="grid grid-cols-3 ">
              <p className="font-semibold">{item.fields?.attachments?.title}</p>

              <FormGroup>
                {item?.fields?.attachments?.fields?.map(
                  (value: string, index: number) => (
                    <FormControlLabel
                      label={value}
                      key={index}
                      control={<Checkbox />}
                    />
                  ),
                )}
              </FormGroup>
            </div>

            <div className="grid grid-cols-3 ">
              <p className="font-semibold">
                {item.fields?.ppe_required?.title}
              </p>

              <div className="col-span-2">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                        <TableCell>YES/NO/NA</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item?.fields?.ppe_required?.fields?.map(
                        (value: string, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{value}</TableCell>
                            <TableCell>
                              <FormControl fullWidth>
                                <InputLabel id="label">Anwser</InputLabel>
                                <Select
                                  labelId="label"
                                  id="select"
                                  label="Anwser"
                                >
                                  <MenuItem>
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value="yes">Yes</MenuItem>
                                  <MenuItem value="no">No</MenuItem>
                                  <MenuItem value="na">NA</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>

            <div className="grid grid-cols-3 ">
              <p className="font-semibold">{item.fields?.prework_checks?.title}</p>

              <FormGroup className="col-span-2">
                {item?.fields?.prework_checks?.fields?.map(
                  (value: string, index: number) => (
                    <FormControlLabel
                      label={value}
                      key={index}
                      control={<Checkbox />}
                    />
                  ),
                )}
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
