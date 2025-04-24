import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPermitByIdService } from '../services/permit.service';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PermitDetail from '../components/ui/permit/permitDetail';
import UpdateStatusForm from '../components/ui/permit/updateStatusForm';
export default function ViewPermitPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [permit, setPermit] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const getPermitById = async () => {
        try {
            const res = await getPermitByIdService(Number(id));
            setPermit(res);
        } catch (error) {}
    };
    useEffect(() => {
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
                    <Button variant="contained" color="warning" onClick={handleOpenDialog}>
                        Status
                    </Button>
                </div>

                <div className="w-full min-h-[600px] rounded p-4 border border-gray-300  ">
                    <PermitDetail permit={permit} />
                </div>
            </div>
            <UpdateStatusForm
                getPermitById={getPermitById}
                permit={permit}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
        </div>
    );
}
