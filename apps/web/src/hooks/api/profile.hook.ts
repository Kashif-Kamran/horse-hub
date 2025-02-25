import { getRequest } from "@/lib/client/common";
import { UserProfileResponse } from "@repo/shared";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useMe = (
  options?: UseQueryOptions<
    UserProfileResponse,
    Error,
    UserProfileResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["accounts/me"],
    queryFn: () => getRequest<UserProfileResponse>("/accounts/me"),
    ...options,
  });

  return {
    data,
    ...rest,
  };
};
