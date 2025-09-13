import { Divider } from '@mui/material';
import { formatDate } from '../../../utils/dayjs';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { handleRenderStatus, renderPermitItem } from '../../../utils/renderPermitItem';

interface Props {
    permit: any;
}

export default function PermitDetail({ permit }: Props) {
    return (
        <div className="bg-white p-8 rounded-2xl lg:w-[60%] h-fit border border-gray-300 ">
            <header className="flex justify-between items-center mb-4">
                <div>
                    <p className="mb-2">
                        <span className="font-medium mr-2">Template ID:</span>
                        {permit?.template?.id}
                    </p>
                    <p>
                        <span className="font-medium mr-2">Status:</span>
                        <span>{handleRenderStatus(permit?.status)}</span>
                    </p>
                </div>
                <p>
                    <span className="font-medium mr-2">Receiver:</span>
                    {permit?.receiver?.name}
                </p>
            </header>

            <Divider sx={{ borderBottom: '3px solid #0267F5' }} />

            <div className="flex justify-between items-center mt-6">
                <p className="text-3xl font-semibold">{permit?.template?.name}</p>
                <div className="flex justify-center items-center gap-2">
                    <div>
                        <p className="text-[16px] font-medium text-end">{permit?.sender?.name}</p>
                        <p className="text-gray-400 text-[14px] font-medium text-end">
                            Created
                            <span className="ml-1">{formatDate(permit?.created_at, 'dd, MM, DD, YYYY HH:MM A')}</span>
                        </p>
                    </div>
                    <AccountCircleRoundedIcon sx={{ fontSize: '32px' }} />
                </div>
            </div>

            <div className="grid gap-6 border border-gray-300 rounded p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-lg">
                    <div className="bg-slate-100 p-4 flex items-center h-full">
                        <h3 className="font-medium text-slate-800 text-sm">Company name</h3>
                    </div>
                    <div className="lg:col-span-2 p-4 bg-white">
                        <p className="text-slate-700">{permit?.companyName || 'Not specified'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-lg">
                    <div className="bg-slate-100 p-4 flex items-center h-full">
                        <h3 className="font-medium text-slate-800 text-sm">Duration</h3>
                    </div>
                    <div className="lg:col-span-2 p-4 bg-white">
                        <p className="text-slate-700">
                            {formatDate(permit?.startTime, 'dd, MM, DD, YYYY')}
                            <span className="mx-2">-</span>
                            {formatDate(permit?.endTime, 'dd, MM, DD, YYYY')}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-lg">
                    <div className="bg-slate-100 p-4 flex items-center h-full">
                        <h3 className="font-medium text-slate-800 text-sm">Number of people</h3>
                    </div>
                    <div className="lg:col-span-2 p-4 bg-white">
                        <p className="text-slate-700">{permit?.peopleNumber}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-lg">
                    <div className="bg-slate-100 p-4 flex items-center h-full">
                        <h3 className="font-medium text-slate-800 text-sm">Equipments</h3>
                    </div>
                    <div className="lg:col-span-2 p-4 bg-white">
                        <p className="text-slate-700">{permit?.equipments}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-lg">
                    <div className="bg-slate-100 p-4 flex items-center h-full">
                        <h3 className="font-medium text-slate-800 text-sm">Location</h3>
                    </div>
                    <div className="lg:col-span-2 p-4 bg-white">
                        <p className="text-slate-700">{permit?.equipments}</p>
                    </div>
                </div>
            </div>

            <div className=" grid gap-10 mt-10">
                {permit?.data.map((item: any) => <div key={item?.id}>{renderPermitItem(item)}</div>)}
            </div>
        </div>
    );
}
