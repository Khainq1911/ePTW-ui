import { useEffect, useState } from 'react';
import Bars from '../components/ui/dashboard/bars';
import Pie from '../components/ui/dashboard/pie';
import { TypeChart } from '../types/enum';
import Visualise from '../components/ui/dashboard/visualise';
import Source from '../components/ui/dashboard/source';
import Data from '../components/ui/dashboard/data';
import { getDashboardService } from '../services/dashboard.service';
import { dashboardType } from '../types/dashboard.type';
import { Dayjs } from 'dayjs';

export default function Dashboard() {
    const [showAs, setShowAs] = useState(TypeChart.BAR as string);
    const [template, setTemplate] = useState<string>('');
    const [dashboard, setDashboard] = useState<dashboardType | undefined>(undefined);
    const [createdBy, setCreateddBy] = useState<string>('');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
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

    return (
        <div className="p-5 w-screen bg-[#EBEDEF] overflow-auto" style={{ height: 'calc(100vh - 70px)' }}>
            <div className="max-w-[1400px] mx-auto bg-white rounded-[5px] p-4 mt-5 mb-10">
                <h1 className="font-bold">
                    Total Permit:<span className="ml-1">{dashboard?.total_permits}</span>
                </h1>
                {showAs === TypeChart.BAR ? <Bars dashboard={dashboard} /> : <Pie dashboard={dashboard} />}
            </div>

            <div className="max-w-[1400px] mx-auto bg-white min-h-20 rounded-[5px] p-4">
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
