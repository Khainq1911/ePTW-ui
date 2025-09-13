import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { handleRenderStatus } from '../../../utils/renderPermitItem';
import { formatDate } from '../../../utils/dayjs';
export default function PermitStatusHistory({ listStatus }: any) {
    return (
        <div className="w-full bg-white border border-gray-300 rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-4">Permit Status History</h2>
            {listStatus?.map((statusItem: any) => (
                <div key={statusItem?.id} className="flex flex-col gap-4 p-4 border-b border-[#0267F5]">
                    <div className="flex items-center gap-2">
                        <AccountCircleOutlinedIcon />
                        <p className="font-semibold">{statusItem?.changedBy?.name}</p>
                        <p className="text-sm text-gray-500">{formatDate(statusItem?.created_at)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <InfoOutlinedIcon />
                        <p className="font-semibold">Status:</p>
                        {handleRenderStatus(statusItem?.status)}
                    </div>

                    <div className="flex items-center gap-2">
                        <CommentOutlinedIcon />
                        <p className="font-semibold">Reason:</p>
                        <p className="text-sm text-gray-500">{statusItem?.reason}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
