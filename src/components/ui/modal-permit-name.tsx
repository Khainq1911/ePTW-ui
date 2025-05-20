import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import React, { useContext, useEffect,useState } from 'react';
import { modalContext } from '../../context/permit-modal-context';
import { listTemplateService } from '../../services/templates.service';
import { useNavigate } from 'react-router-dom';

interface Props {
    selectedTemplate?: string;
    templateArr?: any;
}

export default function PermitModal({ selectedTemplate, templateArr }: Props) {
    const [listTemplate, setListTemplate] = useState([]);
    const [permitName, setPermitName] = useState('');
    const [templateId, setTemplateId] = useState('');
    const context = useContext(modalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const listTemplate = async () => {
            try {
                const res = await listTemplateService();
                setListTemplate(res);
            } catch {}
        };
        if (!templateArr) {
            listTemplate();
        } else {
            setTemplateId(selectedTemplate || '');
            setListTemplate(templateArr);
        }
    }, [templateArr, selectedTemplate]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPermitName(e.target.value);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setTemplateId(event.target.value as string);
    };

    return (
        <Dialog
            open={context?.openModal || false}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        navigate(`/template/${templateId}/${permitName}`);
                        context?.handleModalClose();
                    },
                },
            }}
        >
            <DialogTitle>
                <p className="text-[32px] font-bold text-slate-700">Create New Permit</p>
            </DialogTitle>
            <DialogContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="font-medium text-slate-700">
                            <label htmlFor="permit-name">Permit Name</label>
                        </div>
                        <TextField
                            required
                            fullWidth
                            id="permit-name"
                            placeholder="Enter permit name"
                            value={permitName}
                            onChange={handleNameChange}
                            className="mt-1"
                        />
                    </div>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Template</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={templateId}
                            label="Select Template"
                            onChange={handleChange}
                        >
                            {listTemplate?.map((item: any) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={context?.handleModalClose}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    );
}
