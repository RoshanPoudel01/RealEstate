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
export interface PropertyFrontResponse {
  id: number;
  category_id: number;
  price: string;
  land_area: string;
  floor: string;
  is_road_access: number;
  built_year: string;
  map: string;
  is_parking: number;
  is_furnished: number;
  is_garden: number;
  is_active: number;
  status: string;
  title_en: string;
  title_np: string;
  description_en: string;
  description_np: string;
  address_en: string;
  address_np: string;
  city_en: string;
  city_np: string;
}

export interface AmenityResponse {
  is_road_access: number;
  floor: string;
  is_parking: number;
  is_furnished: number;
  is_garden: number;
}

export interface ImagesResponse {
  id: number;
  image: string;
}
export interface PropertyParams {
  propertyType: string;
  language?: string;
}

const useFetchProperties = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<PropertyResponse>>({
    url: api.properties.fetch({ page, perPage, keyword }),
    queryKey: [`properties`],
  });
};

const useFetchAllProperties = ({ propertyType, language }: PropertyParams) => {
  return useFetch<RootResponse<PropertyFrontResponse>>({
    url: api.properties.properties({
      propertyType: propertyType,
      language: language,
    }),
    queryKey: [propertyType],
  });
};

const useGetPropertyDetails = (id: number | null) => {
  return useFetch<SingleResponse<PropertyFrontResponse>>({
    url: api.properties.propertyById.replace("{id}", id + ""),
    queryKey: [`property-${id}`],
    enabled: !!id,
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
  useFetchAllProperties,
  useFetchProperties,
  useFetchPropertyById,
  useGetPropertyDetails,
  useUpdateProperty,
};
