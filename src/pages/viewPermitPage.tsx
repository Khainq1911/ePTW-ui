import { useEffect, useState } from 'react';
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

    useEffect(() => {
        getStatusHistory();
        getPermitById();
    }, [id]);

    return (
        <div style={{ height: 'calc(100vh - 70px)' }} className="overflow-x-auto p-4">
            <div className="w-[1200px] h-screen mx-auto ">
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
                        title={
                            permit?.status === PermitStatus.CLOSE
                                ? 'This permit is closed and cannot be updated'
                                : 'Click to update status'
                        }
                        arrow
                    >
                        <span>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={handleOpenDialog}
                                disabled={permit?.status === PermitStatus.CLOSE}
                            >
                                Status
                            </Button>
                        </span>
                    </Tooltip>
                </div>

                <div className="w-full min-h-[600px] rounded p-4 border border-gray-300">
                    <PermitDetail permit={permit} />
                </div>

                <div className="w-full mt-8">
                    <h2 className="text-xl font-semibold mb-4">Status History</h2>
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
