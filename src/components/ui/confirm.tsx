import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

interface Props {
    open: boolean;
    handleClose: any;
    handleSubmit: any;
    content: string;
    loading?: boolean;
}

export default function Confirm({ open, handleClose, handleSubmit, content, loading }: Props) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="save-template-title"
            aria-describedby="save-template-description"
        >
            <DialogTitle id="save-template-title">Confirm Save</DialogTitle>
            <DialogContent>
                <DialogContentText id="save-template-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained" disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" autoFocus disabled={loading}>
                    {loading ? <CircularProgress size={24}/> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
