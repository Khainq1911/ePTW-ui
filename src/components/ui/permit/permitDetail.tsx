import { Divider, Grid } from '@mui/material';
import { formatDate } from '../../../utils/dayjs';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { handleRenderStatus, renderPermitItem } from '../../../utils/renderPermitItem';

interface Props {
    permit: any;
}

export default function PermitDetail({ permit }: Props) {
   
    return (
        <div>
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

            <Grid container spacing={6} sx={{ marginTop: 6 }}>
                <Grid size={4} sx={{ fontWeight: '500' }}>
                    <p>Company name</p>
                </Grid>
                <Grid size={8}>
                    <p>{permit?.companyName}</p>
                </Grid>

                <Grid size={4} sx={{ fontWeight: '500' }}>
                    <p>Duration</p>
                </Grid>
                <Grid size={8}>
                    <p>
                        {formatDate(permit?.startTime, 'dd, MM, DD, YYYY')}
                        <span className="mx-2">-</span>
                        {formatDate(permit?.endTime, 'dd, MM, DD, YYYY')}
                    </p>
                </Grid>

                <Grid size={4} sx={{ fontWeight: '500' }}>
                    <p>Number of people</p>
                </Grid>
                <Grid size={8}>
                    <p>{permit?.peopleNumber}</p>
                </Grid>

                <Grid size={4} sx={{ fontWeight: '500' }}>
                    <p>Equipments</p>
                </Grid>
                <Grid size={8}>
                    <p>{permit?.equipments}</p>
                </Grid>

                <Grid size={4} sx={{ fontWeight: '500' }}>
                    <p>Location</p>
                </Grid>
                <Grid size={8}>
                    <p>{permit?.location}</p>
                </Grid>
            </Grid>

            <div className=" grid gap-10 mt-10">
                {permit?.data.map((item: any) => <div key={item?.id}>{renderPermitItem(item)}</div>)}
            </div>
        </div>
    );
}
