import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPermitByIdService, listStatusHistoryService } from '../services/permit.service';
import { Button, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PermitDetail from '../components/ui/permit/permitDetail';
import UpdateStatusForm from '../components/ui/permit/updateStatusForm';
import PermitStatusHistory from '../components/ui/permit/permitStatusHistory';
import { PermitStatus } from '../types/enum';
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
        <div className="w-screen bg-[#EBEDEF] overflow-auto p-4" style={{ height: 'calc(100vh - 70px)' }}>
            <div className="flex justify-between items-center">
                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{ margin: '10px 0' }}
                    onClick={() => navigate('/permit')}
                    variant="contained"
                >
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

            <div className=" overflow-auto mt-4">
                <PermitDetail permit={permit} />
            </div>

            <div className="lg:w-[1200px] lg:mx-auto">
                <h2 className="text-xl font-semibold mt-8">Permit Status History</h2>
                <PermitStatusHistory listStatus={listStatus} />
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
