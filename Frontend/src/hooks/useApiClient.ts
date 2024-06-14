import axios from "axios";
import { Configuration } from "../api/babel__generated";
import { DefaultApi } from "../api/babel__generated";

export const useApiClient = () => {
    const basepath = "/api";   
    const axiosInstance = axios.create({
        baseURL: basepath,
        headers: {
        },
    }); 

    const config = new Configuration({basePath: basepath});
    return new DefaultApi(config,basepath,axiosInstance);
}
