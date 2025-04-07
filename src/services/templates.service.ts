import { instances } from "../configs/axios.config";

const listTemplatesService = async (q: string) => {
  const response = await instances.get("/template", { params: { q: q } });
  return response.data;
};

const createTemplateService = async (payload: any) => {
  const response = await instances.post("/template", payload);
  return response.data;
};

const getByIdService = async (id: number) => {
  const response = await instances.get(`/template/${id}`);
  return response.data;
};

const updateTemplateService = async (payload: any, id: number) => {
  const response = await instances.patch(`/template/${id}`, payload);
  return response.data;
};
export {
  listTemplatesService,
  createTemplateService,
  updateTemplateService,
  getByIdService,
};
