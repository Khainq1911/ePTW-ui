import { useNavigate, useParams } from 'react-router-dom';
import { SyntheticEvent, useEffect, useReducer, useState } from 'react';
import { getByIdService } from '../services/templates.service';
import { TemplateType } from '../types/template.type';
import { getUser } from '../hooks/useAuth';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { initialState, reducer } from '../hooks/reducer/permitReducer';
import { createPermitService, getPresignUrlService } from '../services/permit.service';
import Confirm from '../components/ui/confirm';
import { useNotification } from '../hooks/useNotify';
import TemplatePreview from '../components/ui/templates/preview/previewTemplate';
import AttachmentFile from '../components/ui/permit/attachmentFile';

export default function AddPermit() {
    const [template, setTemplate] = useState<TemplateType | null>(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<string[] | null>(null);
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

        if (files) {
            for (const file of files) {
                try {
                    const res = await getPresignUrlService(file);
                    const presignedUrl = res.url;

                    await fetch(presignedUrl, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': 'application/pdf',
                        },
                    });
                } catch (err) {
                    console.error(`Failed to upload ${file}`, err);
                }
            }
        }

        try {
            const payload = {
                ...state,
                templateId: template?.id,
                peopleNumber: Number(state?.peopleNumber),
                senderId: getUser()?.id,
                files: files,
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
        <div className="w-screen bg-[#EBEDEF] overflow-y-auto p-4" style={{ height: 'calc(100vh - 70px)' }}>
            <div className="flex justify-between items-center p-4">
                <Button color="primary" startIcon={<ArrowBackIcon />} variant="contained" onClick={() => navigate('/')}>
                    Back
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    color="warning"
                    endIcon={<SaveIcon />}
                    onClick={handleClickOpen}
                    disabled={loading}
                >
                    Save
                </Button>
            </div>

            <div className="overflow-auto">
                <TemplatePreview item={template} userName={getUser()?.name} dispatch={dispatch} state={state} />
            </div>

            <AttachmentFile files={files} setFiles={setFiles} />
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
