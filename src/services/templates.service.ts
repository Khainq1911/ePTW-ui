import { instances } from "./axios.config"

const listTemplatesService = async () => {
    const response = await instances.get("/template")
    return response.data
}

export {listTemplatesService}