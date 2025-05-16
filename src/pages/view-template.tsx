import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import TemplatePreview from '../components/ui/template-form';
import { getTemplateByIdService } from '../services/templates.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ViewTemplate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState([]);

    const getTemplate = async () => {
        try {
            const res = await getTemplateByIdService(Number(id));
            console.log(res);
            setTemplate(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTemplate();
    }, []);

    return (
        <div className="w-full h-screen px-5 py-8 bg-[#F9FAFB] overflow-auto">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between ">
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/template')}>
                    Back to templates
                </Button>
                <Button variant="contained" color="warning" endIcon={<FileCopyIcon />}>
                    Use this template
                </Button>
            </div>

            <div className="my-5">
                <h1 className="text-[32px] font-bold">Template Details</h1>
                <p className="font-medium text-gray-500">
                    Review the information and structure of this permit template
                </p>
            </div>

            <TemplatePreview template={template} />
        </div>
    );
}
