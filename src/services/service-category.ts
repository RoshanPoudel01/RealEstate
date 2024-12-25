export interface CateGoryListResponse {
  id: number;
  name_en: string;
  name_np: string;
}

export interface CategoryFrontResponse {
  id: number;
  name: string;
}

export interface CategoryResponse {
  id: number;
  is_active: number;
  display_order: number;
  name_en: string;
  name_np: string;
  description_en: string;
  description_np: string;
  image: string;
}

import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

const useFetchCategories = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<CategoryResponse>>({
    url: api.categories.fetch({ page, perPage, keyword }),
    queryKey: [`categories`],
  });
};

const useFetchCategoryById = (id: string) => {
  return useFetch<SingleResponse<CategoryResponse>>({
    url: api.categories.fetchById.replace(":id", id),
    queryKey: [`category`],
    enabled: !!id,
  });
};

const useFetchCategoryList = () => {
  return useFetch<RootResponse<CateGoryListResponse>>({
    url: api.categories.list,
    queryKey: [`category-list`],
  });
};

const useFetchCategoryFrontList = ({ lang }: { lang: string }) => {
  return useFetch<RootResponse<CategoryFrontResponse>>({
    url: api.categories.frontList({ lang }),
    queryKey: [`category-list`],
  });
};

const useCreateCategory = () => {
  return useMutate({
    url: api.categories.create,
    queryKey: [`create-category`],
    invalidates: [`categories`],
    message: "Category created successfully",
  });
};

const useUpdateCategory = () => {
  return useMutate({
    url: api.categories.update,
    queryKey: [`update-category`],
    invalidates: [`categories`, `category`],
    method: `POST`,
    message: `Category updated successfully`,
  });
};

const useDeleteCategory = () => {
  return useMutate({
    url: api.categories.delete,
    queryKey: [`delete-category`],
    invalidates: [`categories`],
    method: `DELETE`,
    message: `Category deleted successfully`,
  });
};

export {
  useCreateCategory,
  useDeleteCategory,
  useFetchCategories,
  useFetchCategoryById,
  useFetchCategoryFrontList,
  useFetchCategoryList,
  useUpdateCategory,
};
