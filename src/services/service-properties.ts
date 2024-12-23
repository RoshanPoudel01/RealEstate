import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";
export interface PropertyBackResponse {
  id: number;
  category_id: number;
  price: string;
  land_area: string;
  floor?: string;
  is_road_access: number;
  built_year?: string;
  map: string;
  is_parking: number;
  is_furnished: number;
  is_garden: number;
  is_active: number;
  status: string;
  images: any[];
  title_en: string;
  title_np: string;
  description_en: string;
  description_np: string;
  address_en: string;
  address_np: string;
  city_en: string;
  city_np: string;
  image?: string;
}

export interface PropertyFrontResponse {
  id: number;
  category_id: number;
  price: string;
  land_area: string;
  floor?: string;
  is_road_access: number;
  built_year?: string;
  map: string;
  is_parking: number;
  is_furnished: number;
  is_garden: number;
  is_active: number;
  status: string;
  title: string;
  description: string;
  address: string;
  city: string;
  image?: string;
  images: Images[];
  faqs: FaqFrontResponse[];
}

interface Images {
  id: number;
  image: string;
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

export interface FaqFrontResponse {
  id: number;
  display_order: number;
  question?: string;
  answer?: string;
}

export interface ImagesResponse {
  id: number;
  image: string;
}
export interface PropertyParams {
  id?: string;
  propertyType: string;
  language?: string;
  keyword?: string;
}

const useFetchProperties = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<PropertyBackResponse>>({
    url: api.properties.fetch({ page, perPage, keyword }),
    queryKey: [`properties`],
  });
};

const useFetchAllProperties = ({
  propertyType,
  language,
  keyword,
}: PropertyParams) => {
  return useFetch<RootResponse<PropertyFrontResponse>>({
    url: api.properties.properties({
      propertyType,
      language,
      keyword,
    }),
    queryKey: [propertyType, keyword ?? ""],
  });
};

const useGetPropertyDetails = (id: string | undefined, language: string) => {
  return useFetch<SingleResponse<PropertyFrontResponse>>({
    url: api.properties.propertyById({
      id: id!,
      language,
    }),
    queryKey: [`property-${id}`],
    enabled: !!id,
  });
};
const useFetchPropertyById = (id: string) => {
  return useFetch<SingleResponse<PropertyBackResponse>>({
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

const useFetchPropertyList = ({
  categoryId,
  keyword,
}: {
  categoryId: string;
  keyword: string;
}) => {
  return useFetch<RootResponse<PropertyBackResponse>>({
    url: api.properties.getList({ categoryId, keyword }),
    queryKey: [`property-list`],
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

const useFetchAmenities = (id: string) => {
  return useFetch<SingleResponse<AmenityResponse>>({
    url: api.properties.amenity.replace(":id", id),
    queryKey: [`amenities`],
    enabled: !!id,
  });
};

const useUpdateAmenities = () => {
  return useMutate({
    url: api.properties.amenity,
    queryKey: [`update-amenity`],
    invalidates: [`amenities`],
    method: `POST`,
    message: `Amenity updated successfully`,
  });
};

const useFetchImages = (id: string) => {
  return useFetch<RootResponse<ImagesResponse>>({
    url: api.properties.images.replace(":id", id),
    queryKey: [`images`],
    enabled: !!id,
  });
};

const useUpdateImages = () => {
  return useMutate({
    url: api.properties.images,
    queryKey: [`update-images`],
    method: `POST`,
    invalidates: [`images`],
    message: `Images updated successfully`,
  });
};

const useFetchFaqs = (id: string) => {
  return useFetch<RootResponse<FaqResponse>>({
    url: api.properties.faqs.replace(":id", id),
    queryKey: [`faqs`],
    message: `FAQs created successfully`,
  });
};

const useUpdateFaqs = () => {
  return useMutate({
    url: api.properties.faqs,
    queryKey: [`update-faqs`],
    method: `POST`,
    invalidates: [`faqs`],
    message: `FAQs updated successfully`,
  });
};

const useFetchTrendingProperties = () => {
  return useFetch<RootResponse<PropertyBackResponse>>({
    url: api.properties.trending,
    queryKey: [`trending-properties`],
  });
};

const useAddTrendingProperties = () => {
  return useMutate({
    url: api.properties.trending,
    queryKey: [`add-trending-property`],
    invalidates: [`trending-properties`],
    message: `Property added to trending successfully`,
  });
};

const useFetchFeaturedProperties = () => {
  return useFetch<RootResponse<PropertyFrontResponse>>({
    url: api.properties.featured,
    queryKey: [`featured-properties`],
  });
};

const useAddFeaturedProperties = () => {
  return useMutate({
    url: api.properties.featured,
    queryKey: [`add-featured-property`],
    invalidates: [`featured-properties`],
    message: `Property added to featured successfully`,
  });
};

const useFetchNewProperties = () => {
  return useFetch<RootResponse<PropertyFrontResponse>>({
    url: api.properties.new,
    queryKey: [`new-properties`],
  });
};

const useAddNewProperties = () => {
  return useMutate({
    url: api.properties.new,
    queryKey: [`add-new-property`],
    invalidates: [`new-properties`],
    message: `Property added to new successfully`,
  });
};

const useFetchRelatedProperties = (id: string, language = "en") => {
  return useFetch<RootResponse<PropertyFrontResponse>>({
    url: api.properties.relatedProperties({ id, language }),
    queryKey: [`related-properties`, id],
    enabled: !!id,
  });
};

export {
  useAddFeaturedProperties,
  useAddNewProperties,
  useAddTrendingProperties,
  useCreateProperty,
  useDeleteProperty,
  useFetchAllProperties,
  useFetchAmenities,
  useFetchFaqs,
  useFetchFeaturedProperties,
  useFetchImages,
  useFetchNewProperties,
  useFetchProperties,
  useFetchPropertyById,
  useFetchPropertyList,
  useFetchRelatedProperties,
  useFetchTrendingProperties,
  useGetPropertyDetails,
  useUpdateAmenities,
  useUpdateFaqs,
  useUpdateImages,
  useUpdateProperty,
};