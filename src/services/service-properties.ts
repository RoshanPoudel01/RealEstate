import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface PropertyResponse {
  id: number;
  display_order: number;
  is_active: number;
  title_en: string;
  title_np: string;
  description_en: string;
  description_np: string;
  image?: string;
}

export interface AmenityResponse {
  is_road_access: number;
  floor: string;
  is_parking: number;
  is_furnished: number;
  is_garden: number;
}

export interface FaqResponse {
  id: number;
  display_order: number;
  question_en?: string;
  question_np?: string;
  answer_en?: string;
  answer_np?: string;
}

export interface ImagesResponse {
  id: number;
  image: string;
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

const useFetchAmenities = (id:string) => {
  return useFetch<SingleResponse<AmenityResponse>>({
    url: api.properties.amenity.replace(":id", id),
    queryKey: [`amenities`],
    enabled: !!id,
  });
}

const useUpdateAmenities = () => {
  return useMutate({
    url: api.properties.amenity,
    queryKey: [`update-amenity`],
    invalidates: [`amenities`],
    method: `POST`,
    message: `Amenity updated successfully`,
  });
}

const useFetchImages = (id: string) => {
  return useFetch<RootResponse<ImagesResponse>>({
    url: api.properties.images.replace(":id", id),
    queryKey: [`images`],
    enabled: !!id,
  });
}

const useUpdateImages = () => {
  return useMutate({
    url: api.properties.images,
    queryKey: [`update-images`],
    method: `POST`,
    invalidates: [`images`],
    message: `Images updated successfully`,
  });
}

const useFetchFaqs = (id:string) => {
  return useFetch<RootResponse<FaqResponse>>({
    url: api.properties.faqs.replace(":id", id),
    queryKey: [`faqs`],
    message: `FAQs created successfully`,
  });
}

const useUpdateFaqs = () => {
  return useMutate({
    url: api.properties.faqs,
    queryKey: [`update-faqs`],
    method: `POST`,
    invalidates: [`faqs`],
    message: `FAQs updated successfully`,
  })
}

const useFetchTrendingProperties = () => {
  return useFetch<RootResponse<PropertyResponse>>({
    url: api.properties.trending,
    queryKey: [`trending-properties`],
  });
}

const useAddTrendingProperties = () => {
  return useMutate({
    url: api.properties.trending,
    queryKey: [`add-trending-property`],
    invalidates: [`trending-properties`],
    message: `Property added to trending successfully`,
  });
}

const useFetchFeaturedProperties = () => {
  return useFetch<RootResponse<PropertyResponse>>({
    url: api.properties.featured,
    queryKey: [`featured-properties`],
  });
}

const useAddFeaturedProperties = () => {
  return useMutate({
    url: api.properties.featured,
    queryKey: [`add-featured-property`],
    invalidates: [`featured-properties`],
    message: `Property added to featured successfully`,
  });
}

const useFetchNewProperties = () => {
  return useFetch<RootResponse<PropertyResponse>>({
    url: api.properties.new,
    queryKey: [`new-properties`],
  });
}

const useAddNewProperties = () => {
  return useMutate({
    url: api.properties.new,
    queryKey: [`add-new-property`],
    invalidates: [`new-properties`],
    message: `Property added to new successfully`,
  });
}

export {
  useAddFeaturedProperties, useAddNewProperties, useAddTrendingProperties, useCreateProperty,
  useDeleteProperty, useFetchAmenities, useFetchFaqs, useFetchFeaturedProperties, useFetchImages, useFetchNewProperties, useFetchProperties,
  useFetchPropertyById, useFetchTrendingProperties, useUpdateAmenities, useUpdateFaqs, useUpdateImages, useUpdateProperty
};

