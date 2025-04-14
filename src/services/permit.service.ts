import { instances } from "../configs/axios.config";

const listPermitService = async () => {
  const response = await instances.get("/permit");
  return response.data;
};

const createPermitService = async (payload: any) => {
  const response = await instances.post("/permit", payload);
  return response;
};

export { listPermitService, createPermitService };
