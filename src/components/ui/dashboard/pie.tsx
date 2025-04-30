import { PieChart } from '@mui/x-charts';
import { dashboardType } from '../../../types/dashboard.type';
import { PermitStatus } from '../../../types/enum';

export default function Pie({ dashboard }: { dashboard: dashboardType | undefined }) {
    return (
        <PieChart
            series={[
                {
                    data: [
                        {
                            id: 0,
                            value: dashboard?.accept || 0,
                            label: PermitStatus.ACCEPT,
                            color: '#3b82f6',
                        },
                        {
                            id: 1,
                            value: dashboard?.suspend || 0,
                            label: PermitStatus.SUSPEND,
                            color: '#f59e0b',
                        },
                        {
                            id: 2,
                            value: dashboard?.revise || 0,
                            label: PermitStatus.REVISE,
                            color: '#10b981',
                        },
                        {
                            id: 3,
                            value: dashboard?.close || 0,
                            label: PermitStatus.CLOSE,
                            color: '#ef4444',
                        },
                        {
                            id: 4,
                            value: dashboard?.pending || 0,
                            label: PermitStatus.PENDING,
                            color: '#a855f7',
                        },
                    ],
                },
            ]}
            width={300}
            height={300}
        />
    );
}
