import { useEffect, useReducer, useState } from 'react';
import { initialState, reducer } from '../reducer/permitReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { getPermitByIdService, revisePermitService } from '../services/permit.service';
import TemplatePreview from '../components/ui/template-form';
import { getUser } from '../hooks/useAuth';
import { TemplateType } from '../types/template.type';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Confirm from '../components/ui/confirm';
import { PermitStatus } from '../types/enum';
import { useNotification } from '../hooks/useNotify';

export default function RevisePermit() {
    const { id } = useParams();
    const { notify } = useNotification();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [template, setTemplate] = useState<TemplateType | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const getPermitById = async () => {
            try {
                const res = await getPermitByIdService(Number(id));
                const { template, ...payload } = res;
                dispatch({ type: 'SET_INITAL_DATA', payload: payload });
                setTemplate(template);
            } catch (error) {}
        };
        getPermitById();
    }, [id]);

    const handleRevisePermit = async () => {
        setLoading(true);
        try {
            const payload = {
                ...state,
                templateId: template?.id,
                peopleNumber: Number(state?.peopleNumber),
                status: PermitStatus.PENDING,
            };
            await revisePermitService(state?.id, payload);
            setOpen(false);
            notify('Permit created successfully', 'success', 'Success');
            navigate('/permit');
        } catch (error) {
            notify('An error occurred while saving the permit', 'error', 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 max-w-[1400px] overflow-auto mx-auto">
            <div className="flex justify-between items-center my-4">
                <Button color="primary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/permit')}>
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

            <TemplatePreview template={template} userName={getUser()?.name} dispatch={dispatch} state={state} />

            <Confirm
                open={open}
                loading={loading}
                handleClose={handleClose}
                handleSubmit={handleRevisePermit}
                content="Are you sure you want to create this permit?"
            />
        </div>
    );
}
