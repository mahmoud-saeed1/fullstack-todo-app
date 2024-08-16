import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IUseReactQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useReactQuery = ({ queryKey, url, config }: IUseReactQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);
      return data;
    },
  });
};

export default useReactQuery;
