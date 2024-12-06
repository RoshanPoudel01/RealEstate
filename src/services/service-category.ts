export interface CategoryResponse {
  id: number;
  slug: string;
  is_active: number;
  display_order: number;
  items: Item[];
  image: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  lang: string;
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
  useUpdateCategory,
};
