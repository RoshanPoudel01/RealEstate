import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface PropertyResponse {
  id: number;
  display_order: number;
  is_active: number;
  title_en: string;
  title_np: string;
  caption_en: string;
  caption_np: string;
  image?: string;
}

const useFetchProperties = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<PropertyResponse>>({
    url: api.properties.fetch({ page, perPage, keyword }),
    queryKey: [`properties`],
  });
};

const useFetchPropertyById = (id: string) => {
  return useFetch<SingleResponse<PropertyResponse>>({
    url: api.properties.fetchById.replace(":id", id),
    queryKey: [`property-${id}`],
    enabled: !!id,
  });
};

const useCreateProperty = () => {
  return useMutate({
    url: api.properties.create,
    queryKey: [`create-property`],
    invalidates: [`properties`],
    message: "Property created successfully",
  });
};

const useUpdateProperty = () => {
  return useMutate({
    url: api.properties.update,
    queryKey: [`update-property`],
    invalidates: [`properties`],
    method: `POST`,
    message: `Property updated successfully`,
  });
};

const useDeleteProperty = () => {
  return useMutate({
    url: api.properties.delete,
    queryKey: [`delete-property`],
    invalidates: [`properties`],
    method: `DELETE`,
    message: `Property deleted successfully`,
  });
};

export {
  useCreateProperty,
  useDeleteProperty,
  useFetchProperties,
  useFetchPropertyById,
  useUpdateProperty,
};
