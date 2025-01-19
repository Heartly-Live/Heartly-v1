import axios from "axios";
import { localStorage } from "../helper";

const getAxiosInstance = () => {
  // const [getTokenParams] = useSearchParams();
  // let token = getTokenParams.get("token");

  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  };
  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getAuthToken();
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );
  return instance;
};

export default getAxiosInstance();
