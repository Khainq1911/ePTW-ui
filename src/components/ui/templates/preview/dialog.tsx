import { Alert, Button, Dialog, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TemplatePreview from "./preview";
import { useNavigate } from "react-router-dom";

interface Props {
  openDialog: boolean;
  handleCloseDialog: () => void;
  item: any;
}

export default function TemplateDialog({
  openDialog,
  handleCloseDialog,
  item,
}: Props) {
  const navigate = useNavigate();
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen>
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
            onClick={handleCloseDialog}
          >
            <span className="ml-2">go back</span>
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/template/${item.id}`)}
          >
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

          <div className="w-[70%] mx-auto">
            <TemplatePreview item={item} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
