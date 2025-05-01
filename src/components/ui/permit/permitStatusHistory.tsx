import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { handleRenderStatus } from '../../../utils/renderPermitItem';
import { formatDate } from '../../../utils/dayjs';
export default function PermitStatusHistory({ listStatus }: any) {
    return (
        <div >
            {listStatus?.map((item: any) => (
                <div key={item?.id} className="flex flex-col gap-4 p-4 border-b border-[#0267F5]">
                    <div className="flex gap-2 items-center">
                        <AccountCircleOutlinedIcon />
                        <p className="font-semibold">{item?.changedBy?.name}</p>
                        <p className="text-gray-500 text-sm">{formatDate(item?.created_at)}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <InfoOutlinedIcon />
                        <p className="font-semibold">Status</p>
                        {handleRenderStatus(item?.status)}
                    </div>
                    <div className="flex gap-2 items-center">
                        <CommentOutlinedIcon />
                        <p className="font-semibold">Reason</p>
                        <p className="text-gray-500 text-sm">{item?.reason}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
