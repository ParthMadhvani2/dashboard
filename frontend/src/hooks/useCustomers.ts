import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: api.getCustomers,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, 
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
