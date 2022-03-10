import { createBrew, getBrews } from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";

// import { queryClient } from "../../pages/_app";

export const useCreateBrew = () => {
  const queryClient = useQueryClient();
  //const { mutate, isLoading, isSuccess, isError, error }
  return useMutation((data) => createBrew(), {
    onSuccess: () => {
      console.log(queryClient);
      queryClient.invalidateQueries("brews");
    },
  });
};

export const useGetBrews = () => {
  return useQuery<Brew[]>("brews", getBrews);
};
