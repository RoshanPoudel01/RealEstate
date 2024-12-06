export interface ServiceResponse {
  id: number;
  display_order: number;
  is_active: number;
  title_en: string;
  title_np: string;
  description_en: string;
  description_np: string;
  image: string;
}

import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

const useFetchServices = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<ServiceResponse>>({
    url: api.services.fetch({ page, perPage, keyword }),
    queryKey: [`services`],
  });
};

const useFetchServiceById = (id: string) => {
  return useFetch<SingleResponse<ServiceResponse>>({
    url: api.services.fetchById.replace(":id", id),
    queryKey: [`service-${id}`],
    enabled: !!id,
  });
};

const useCreateService = () => {
  return useMutate({
    url: api.services.create,
    queryKey: [`create-service`],
    invalidates: [`services`],
    message: "Service created successfully",
  });
};

const useUpdateService = () => {
  return useMutate({
    url: api.services.update,
    queryKey: [`update-service`],
    invalidates: [`services`],
    method: `POST`,
    message: `Service updated successfully`,
  });
};

const useDeleteService = () => {
  return useMutate({
    url: api.services.delete,
    queryKey: [`delete-service`],
    invalidates: [`services`],
    method: `DELETE`,
    message: `Service deleted successfully`,
  });
};

export {
  useCreateService,
  useDeleteService,
  useFetchServiceById,
  useFetchServices,
  useUpdateService,
};
