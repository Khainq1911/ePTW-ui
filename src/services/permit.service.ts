import { instances } from "../configs/axios.config";

const listPermitService = async () => {
  const response = await instances.get("/permit");
  return response.data;
};

export { listPermitService };
