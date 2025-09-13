import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPermitByIdService, listStatusHistoryService } from '../services/permit.service';
import { Button, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PermitDetail from '../components/ui/permit/permit-detail';
import UpdateStatusForm from '../components/ui/permit/updateStatusForm';
import PermitStatusHistory from '../components/ui/permit/permit-status-history';
import { PermitStatus } from '../types/enum';
import PermitFileAttach from '../components/ui/permit/permit-file-attach';
export default function ViewPermitPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [permit, setPermit] = useState<any>();
    const [listStatus, setListStatus] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const getStatusHistory = async () => {
        try {
            const res = await listStatusHistoryService(Number(id));
            setListStatus(res);
        } catch (error) {}
    };

    const getPermitById = async () => {
        try {
            const res = await getPermitByIdService(Number(id));
            setPermit(res);
        } catch (error) {}
    };

    const isClosed = useMemo(() => {
        return permit?.status === PermitStatus.CLOSE;
    }, [permit]);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([getPermitById(), getStatusHistory()]);
        };
        fetchData();
    }, [id]);

    return (
        <div className="w-full px-5 py-8 bg-[#F9FAFB] overflow-auto space-y-8">
            <div className="flex justify-between items-center">
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/permit')} variant="contained">
                    Back
                </Button>
                <Tooltip
                    title={isClosed ? 'This permit is closed and cannot be updated' : 'Click to update status'}
                    arrow
                >
                    <span>
                        <Button variant="contained" color="warning" onClick={handleOpenDialog} disabled={isClosed}>
                            Status
                        </Button>
                    </span>
                </Tooltip>
            </div>

            <div className="my-8">
                <h1 className="text-3xl font-bold tracking-tight">Permit Details</h1>
                <p className="font-medium text-gray-500">View and manage permit information</p>
            </div>

            <div className="w-full flex gap-4 flex-col lg:flex-row">
                <PermitDetail permit={permit} />

                <div className='lg:w-[40%] space-y-4'>
                    <PermitFileAttach />
                    <PermitStatusHistory listStatus={listStatus} />
                </div>
            </div>

            <UpdateStatusForm
                getPermitById={getPermitById}
                permit={permit}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                getStatusHistory={getStatusHistory}
            />
        </div>
    );
}
