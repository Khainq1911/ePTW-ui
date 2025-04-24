import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import React, { useState } from 'react';
import { updatePermitStatus } from '../../../services/permit.service';
import { getUser } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotify';

interface Props {
    openDialog: boolean;
    permit: any;
    getPermitById: () => void;
    handleCloseDialog: () => void;
    getStatusHistory: () => void;
}

export default function UpdateStatusForm({
    openDialog,
    permit,
    getStatusHistory,
    getPermitById,
    handleCloseDialog,
}: Props) {
    const [status, setStatus] = useState<string | null>(null);
    const [reason, setReason] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { notify } = useNotification();

    const handleSetStatus = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
        setStatus(value);
    };

    const handleSetReason = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReason(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const id = permit?.id;
            const payload = {
                changedBy: getUser()?.id,
                status: status,
                reason: reason,
                permitId: id,
                senderId: permit?.sender?.id,
            };

            await updatePermitStatus(id, payload);
            getPermitById();
            handleCloseDialog();
            getStatusHistory();
            notify('update success', 'success', 'Success');
        } catch (error) {
            console.log(error);
            notify('update success', 'error', 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={openDialog} fullWidth>
            <DialogTitle>Update Permit Status</DialogTitle>
            <DialogContent>
                <ToggleButtonGroup
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    value={status}
                    onChange={handleSetStatus}
                    exclusive
                >
                    <ToggleButton color="primary" value="Accept">
                        Accept
                    </ToggleButton>
                    <ToggleButton color="error" value="Suspend">
                        Suspend
                    </ToggleButton>
                    <ToggleButton color="warning" value="Revise">
                        Revise
                    </ToggleButton>
                    <ToggleButton color="success" value="Close">
                        Close
                    </ToggleButton>
                </ToggleButtonGroup>
                <TextField fullWidth label="Reason" rows={3} multiline onChange={handleSetReason} />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleCloseDialog} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                    {!loading ? 'Send' : <CircularProgress />}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
