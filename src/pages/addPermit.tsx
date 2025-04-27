import { useNavigate, useParams } from 'react-router-dom';
import { SyntheticEvent, useEffect, useReducer, useState } from 'react';
import { getByIdService } from '../services/templates.service';
import { TemplateType } from '../types/template.type';
import { getUser } from '../hooks/useAuth';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { initialState, reducer } from '../hooks/reducer/permitReducer';
import { createPermitService } from '../services/permit.service';
import Confirm from '../components/ui/confirm';
import { useNotification } from '../hooks/useNotify';
import TemplatePreview from '../components/ui/templates/preview/previewTemplate';

export default function AddPermit() {
    const [template, setTemplate] = useState<TemplateType | null>(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const { notify } = useNotification();
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getTemplate = async () => {
            try {
                const res = await getByIdService(Number(id));
                dispatch({ type: 'SET_DATA', payload: res.fields });
                setTemplate(res);
            } catch (error) {}
        };

        getTemplate();
    }, []);

    const handleCreatePermit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!state?.receiverId || !state?.companyName || !state?.peopleNumber || !state?.startTime || !state?.endTime) {
            notify('Please fill in all required fields', 'error', 'Error');
            setOpen(false);
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...state,
                templateId: template?.id,
                peopleNumber: Number(state?.peopleNumber),
                senderId: getUser()?.id,
            };
            const res = await createPermitService(payload);
            setOpen(false);
            if (res) {
                notify('Permit created successfully', 'success', 'Success');
                navigate('/permit');
            }
        } catch (err: any) {
            notify('An error occurred while saving the permit', 'error', 'Error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-[80%] mx-auto p-4 ">
            <div className="flex justify-between items-center my-4">
                <Button color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
                    Back
                </Button>

                <Button
                    type="submit"
                    color="warning"
                    startIcon={<SaveIcon />}
                    onClick={handleClickOpen}
                    disabled={loading}
                >
                    Save
                </Button>
            </div>

            <TemplatePreview item={template} userName={getUser()?.name} dispatch={dispatch} state={state} />

            <Confirm
                open={open}
                loading={loading}
                handleClose={handleClose}
                handleSubmit={handleCreatePermit}
                content="Are you sure you want to create this permit?"
            />
        </div>
    );
}
