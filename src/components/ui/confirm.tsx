import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose: any;
  handleSubmit: any;
  content: string;
}

export default function Confirm({ open, handleClose, handleSubmit, content }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="save-template-title"
      aria-describedby="save-template-description"
    >
      <DialogTitle id="save-template-title">Confirm Save</DialogTitle>
      <DialogContent>
        <DialogContentText id="save-template-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
