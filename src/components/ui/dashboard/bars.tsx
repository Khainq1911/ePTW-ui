import { BarChart } from '@mui/x-charts/BarChart';
import { PermitStatus } from '../../../types/enum';
import { dashboardType } from '../../../types/dashboard.type';

export default function Bars({ dashboard }: { dashboard: dashboardType | undefined }) {
    return (
        <BarChart
            xAxis={[
                {
                    scaleType: 'band',
                    data: [
                        PermitStatus.ACCEPT,
                        PermitStatus.SUSPEND,
                        PermitStatus.REVISE,
                        PermitStatus.CLOSE,
                        PermitStatus.PENDING,
                    ],
                },
            ]}
            series={[
                {
                    data: [
                        dashboard?.accept || 0,
                        dashboard?.suspend || 0,
                        dashboard?.revise || 0,
                        dashboard?.close || 0,
                        dashboard?.pending || 0,
                    ],
                },
            ]}
            height={300}
        />
    );
}
