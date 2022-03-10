import { createBrew, getBrews } from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";

export const useCreateBrew = () => {
  const queryClient = useQueryClient();
  return useMutation(() => createBrew(), {
    onSuccess: () => {
      console.log(queryClient);
      queryClient.invalidateQueries("brews");
    },
  });
};

export const useGetBrews = () => {
  return useQuery<Brew[]>("brews", getBrews);
};
