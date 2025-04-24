import { instances } from '../configs/axios.config';

const listPermitService = async () => {
    const response = await instances.get('/permit');
    return response.data;
};

const createPermitService = async (payload: any) => {
    const response = await instances.post('/permit', payload);
    return response?.data;
};

const getPermitByIdService = async (id: number) => {
    const response = await instances.get(`/permit/${id}`);
    return response.data;
};

const updatePermitStatus = async (id: number, payload: any) => {
    const response = await instances.patch(`permit/${id}`, payload);
    return response.data;
};

const listStatusHistoryService = async (id: number) => {
    const response = await instances.get(`/status/${id}`);
    return response.data;
};

export { listStatusHistoryService, listPermitService, createPermitService, getPermitByIdService, updatePermitStatus };
