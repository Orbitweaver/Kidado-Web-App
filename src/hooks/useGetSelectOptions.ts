import { getSelectorValues } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

const useGetSelectOptions = () => {
  return useQuery({
    queryKey: ["select-options"],
    queryFn: getSelectorValues,
  });
};

export default useGetSelectOptions;
