import { instances } from '../configs/axios.config';
import { dashboardParams } from '../types/dashboard.type';

const getDashboardService = async (payload: dashboardParams) => {
    const res = await instances.get('/dashboard', {
        params: { start: payload.start, end: payload.end, templateId: payload.templateId, senderId: payload.senderId },
    });
    return res.data;
};

export { getDashboardService };
