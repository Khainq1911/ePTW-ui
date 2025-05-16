import { JSX, useEffect, useMemo, useState } from 'react';
import Bars from '../components/ui/dashboard/bars';
import Pie from '../components/ui/dashboard/pie';
import { TypeChart } from '../types/enum';
import Visualise from '../components/ui/dashboard/visualise';
import Source from '../components/ui/dashboard/source';
import Data from '../components/ui/dashboard/data';
import { getDashboardService } from '../services/dashboard.service';
import { dashboardType } from '../types/dashboard.type';
import { Dayjs } from 'dayjs';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routeConfig } from '../configs/router.config';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { isWorker } from '../hooks/useAuth';

export default function Dashboard() {
    const [showAs, setShowAs] = useState(TypeChart.BAR as string);
    const [template, setTemplate] = useState<string>('');
    const [dashboard, setDashboard] = useState<dashboardType | undefined>(undefined);
    const [createdBy, setCreateddBy] = useState<string>('');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);

    const navigate = useNavigate();

    const handleGetDashboard = async () => {
        try {
            const payload = {
                start: startTime?.toISOString(),
                end: endTime?.toISOString(),
                templateId: Number(template) === 0 ? null : Number(template),
                senderId: Number(createdBy) === 0 ? null : Number(createdBy),
            };
            const res = await getDashboardService(payload);
            setDashboard(res);
        } catch {}
    };

    useEffect(() => {
        handleGetDashboard();
    }, [startTime, endTime, createdBy, template]);

    const statusCountArray = useMemo(() => {
        return [
            {
                label: 'Total Permits',
                key: 'total_permits',
                icon: <AssignmentIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
                showPercent: false,
            },
            {
                label: 'Pending',
                key: 'pending',
                icon: <HourglassEmptyIcon sx={{ fontSize: 32, color: 'warning.main' }} />,
            },
            {
                label: 'Accept',
                key: 'accept',
                icon: <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main' }} />,
            },
            {
                label: 'Revise',
                key: 'revise',
                icon: <EditNoteIcon sx={{ fontSize: 32, color: 'info.main' }} />,
            },
            {
                label: 'Close',
                key: 'close',
                icon: <CancelIcon sx={{ fontSize: 32, color: 'error.main' }} />,
            },
            {
                label: 'Suspend',
                key: 'suspend',
                icon: <PauseCircleFilledIcon sx={{ fontSize: 32, color: 'grey.600' }} />,
            },
        ];
    }, [dashboard]);

    return (
        <div className="w-full h-screen px-5 py-8 bg-[#F9FAFB] overflow-auto">
            <div className="md:flex md:justify-between md:items-center">
                <div>
                    <h1 className="text-[32px] font-bold">Dashboard</h1>
                    <p className="font-medium text-gray-500">Welcome to your Permit to Work dashboard</p>
                </div>
                <Button
                    sx={{ display: isWorker() ? 'none' : 'inline-flex' }}
                    variant="contained"
                    color="warning"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate(routeConfig.addTemplate)}
                >
                    New Template
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-6 my-10">
                {(
                    statusCountArray as {
                        label: string;
                        key: keyof dashboardType;
                        icon: JSX.Element;
                        showPercent?: boolean;
                    }[]
                ).map((item) => {
                    const value = dashboard?.[item.key] ?? 0;
                    const total = dashboard?.total_permits ?? 0;
                    const percent =
                        total > 0 && item.showPercent !== false ? `${((value / total) * 100).toFixed(1)}%` : null;

                    return (
                        <Card key={item.label}>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <Typography gutterBottom sx={{ fontSize: 16, fontWeight: '600' }}>
                                        {item.label}
                                    </Typography>
                                    {item.icon}
                                </div>
                                <Typography gutterBottom sx={{ fontSize: 32, fontWeight: '700' }}>
                                    {value}
                                </Typography>
                                {percent && (
                                    <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                                        {percent} of total permits
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className=" bg-white rounded-[5px] p-4 mb-10 border border-gray-200">
                <h1 className="font-bold mb-8">Permit Status</h1>
                {showAs === TypeChart.BAR ? <Bars dashboard={dashboard} /> : <Pie dashboard={dashboard} />}
            </div>

            <div className=" bg-white min-h-20 rounded-[5px] p-4  border border-gray-200">
                <h1 className="font-bold">Setting</h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Source template={template} setTemplate={setTemplate} />
                    <Data startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} />
                    <Visualise
                        setShowAs={setShowAs}
                        showAs={showAs}
                        createdBy={createdBy}
                        setCreatedBy={setCreateddBy}
                    />
                </div>
            </div>
        </div>
    );
}
