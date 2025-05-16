import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { useEffect, useState } from 'react';
import { listUserByRole } from '../../services/auth.service';
import { formatDate } from '../../utils/dayjs';
import PermitInformation from './template-information';
import { renderPreviewTemplate } from '../../utils/renderPreviewTemplate';
import ReceiverSelect from './receiver-select';

interface PreviewProps {
    template: any;
    userName?: string | undefined;
    dispatch?: any;
    state?: any;
}

export default function TemplatePreview({ template, userName, dispatch, state }: PreviewProps) {
    const [listUsers, setListUsers] = useState([]);

    const listUser = async () => {
        if (listUsers.length > 0) return;
        try {
            const res = await listUserByRole(2);
            setListUsers(res);
        } catch {}
    };
    useEffect(() => {
        listUser();
    }, []);

    return (
        <div className="bg-white w-full lg:w-[70%] lg:mx-auto p-10 rounded-xl grid gap-8 ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
                <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-slate-800 break-words">
                    {template?.name || 'Untitled Template'}
                </h1>

                <div className="flex items-center gap-2 flex-row-reverse md:flex-row">
                    <div className="text-left md:text-right">
                        <p className="text-sm sm:text-base font-medium">{userName || '[User Full Name]'}</p>
                        <p className="text-slate-500 text-xs sm:text-sm flex flex-wrap justify-end">
                            <span>Created</span>
                            <span className="ml-1">{formatDate(template?.created_at, 'dd, MM, DD, YYYY HH:MM A')}</span>
                        </p>
                    </div>
                    <AccountCircleRoundedIcon sx={{ fontSize: '40px' }} />
                </div>
            </div>
            <ReceiverSelect template={template} listUsers={listUsers} state={state} dispatch={dispatch} />

            <div className="flex gap-4 items-center">
                <FeedOutlinedIcon sx={{ fontSize: '32px' }} />
                <h2 className="text-[28px] font-semibold">Permit Information</h2>
            </div>

            <PermitInformation dispatch={dispatch} state={state} />

            <div className="border border-slate-300 rounded-lg p-5 space-y-2 text-[#5187F0] bg-[#EFF6FE]">
                <h2 className="flex gap-2 items-center font-semibold text-2xl">
                    <FeedOutlinedIcon sx={{ fontSize: '28px' }} />
                    <span>Plan Information</span>
                </h2>
                <p className='font-medium'>This section contains important information about the permit plan and safety requirements.</p>
            </div>

            <div className="grid gap-8">
                {(state ? state?.data : template?.fields)?.map((field: any, index: number) => (
                    <div key={index}>{renderPreviewTemplate(field, dispatch)}</div>
                ))}
            </div>
        </div>
    );
}
