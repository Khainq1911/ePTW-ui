import { instances } from "./axios.config";

const listTemplatesService = async () => {
  const response = await instances.get("/template");
  return response.data;
};

const createTemplateService = async (payload: any) => {
  const response = await instances.post("/template", payload);
  return response.data;
};
export { listTemplatesService, createTemplateService };
