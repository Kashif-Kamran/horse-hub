import { getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  AnimalListResponse,
  AnimalResponse,
  CreateAnimalReq,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const ANIMALS_QUERY_KEY = "animals" as const;

export const useAnimals = (
  query?: string,
  options?: UseQueryOptions<
    AnimalListResponse,
    Error,
    AnimalListResponse,
    QueryKey
  >
) => {
  const queryKey = [ANIMALS_QUERY_KEY, "list", query ?? ""];
  const { data, ...rest } = useQuery({
    queryFn: () => {
      let url = "/animals";
      if (query) url += `?q=${encodeURIComponent(query)}`;
      return getRequest<AnimalListResponse>(url);
    },
    queryKey: queryKey,
    ...options,
  });

  return { ...data, ...rest };
};

export const useCreateAnimal = (
  options?: MutationOptions<AnimalResponse, Error, CreateAnimalReq>
) => {
  return useMutation({
    mutationFn: (payload: CreateAnimalReq) =>
      postRequest<AnimalResponse>("/animals", payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: [ANIMALS_QUERY_KEY, "list"] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useAnimalById = (
  animalId: string,
  options?: UseQueryOptions<AnimalResponse, Error, AnimalResponse, QueryKey>
) => {
  const { data, ...rest } = useQuery({
    queryKey: [ANIMALS_QUERY_KEY, animalId],
    queryFn: () => getRequest<AnimalResponse>(`/animals/${animalId}`),
    ...options,
  });
  return { data, ...rest };
};
