import { instances } from '../configs/axios.config';

const queryTemplatesService = async ({ q, limit, page }: { q: string; limit: number; page: number }) => {
    const response = await instances.get('/template', { params: { q, limit, page } });
    return response.data;
};

const listTemplateService = async () => {
    const response = await instances.get('/template/list');
    return response.data;
};

const createTemplateService = async (payload: any) => {
    const response = await instances.post('/template', payload);
    return response.data;
};

const getTemplateByIdService = async (id: number) => {
    const response = await instances.get(`/template/${id}`);
    return response.data;
};

const updateTemplateService = async (payload: any, id: number) => {
    const response = await instances.patch(`/template/${id}`, payload);
    return response.data;
};
export {
    listTemplateService,
    queryTemplatesService,
    createTemplateService,
    updateTemplateService,
    getTemplateByIdService,
};
