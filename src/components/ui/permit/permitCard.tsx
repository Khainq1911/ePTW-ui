import { Avatar, Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'; // <- add this
import { formatDate } from '../../../utils/dayjs';
import { useNavigate } from 'react-router-dom';
import { PermitStatus } from '../../../types/enum';

export default function PermitCard({ item }: { item: any }) {
    const navigate = useNavigate();

    return (
        <Card className="w-[300px]">
            <CardHeader
                avatar={
                    <Avatar>
                        <PersonOutlineOutlinedIcon />
                    </Avatar>
                }
                title={<span className="font-semibold text-[18px]">{'Khai Nguyen'}</span>}
            />
            <CardContent className="grid gap-2">
                <p className="font-medium">
                    Permit ID:<span className="ml-1">{item.id}</span>
                </p>
                <p className="font-medium">
                    Status:<span className="ml-1">{item.status}</span>
                </p>
                <p className="font-medium">
                    Expiry:
                    <span className="ml-1">{formatDate(item.end, 'MMMM DD, YYYY')}</span>
                </p>
                <p className="font-medium text-gray-400">
                    Created:
                    <span className="ml-1">{formatDate(item.created_at, 'MMM DD, YYYY hh:mm A')}</span>
                </p>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button endIcon={<RemoveRedEyeIcon />} onClick={() => navigate(`/permit/${item?.id}`)}>
                    View
                </Button>
                <Button
                    color="error"
                    endIcon={<ModeEditOutlineIcon />}
                    onClick={() => navigate(`/permit/revise/${item?.id}`)}
                    sx={{ display: `${item?.status === PermitStatus.REVISE ? '' : 'none'}` }}
                >
                    Revise
                </Button>
            </CardActions>
        </Card>
    );
}
