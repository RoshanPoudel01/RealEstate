import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface SliderResponse {
  id: number;
  display_order: number;
  is_active: number;
  title_en: string;
  title_np: string;
  caption_en: string;
  caption_np: string;
  image?: string;
}

const useFetchSliders = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<SliderResponse>>({
    url: api.sliders.fetch({ page, perPage, keyword }),
    queryKey: [`sliders`],
  });
};

const useFetchSliderById = (id: string) => {
  return useFetch<SingleResponse<SliderResponse>>({
    url: api.sliders.fetchById.replace(":id", id),
    queryKey: [`slider-${id}`],
    enabled: !!id,
  });
};

const useCreateSlider = () => {
  return useMutate({
    url: api.sliders.create,
    queryKey: [`create-slider`],
    invalidates: [`sliders`],
    message: "Slider created successfully",
  });
};

const useUpdateSlider = () => {
  return useMutate({
    url: api.sliders.update,
    queryKey: [`update-slider`],
    invalidates: [`sliders`],
    method: `POST`,
    message: `Slider updated successfully`,
  });
};

const useDeleteSlider = () => {
  return useMutate({
    url: api.sliders.delete,
    queryKey: [`delete-slider`],
    invalidates: [`sliders`],
    method: `DELETE`,
    message: `Slider deleted successfully`,
  });
};

const useFetchFrontSliders = () => {
  return useFetch<RootResponse<SliderResponse>>({
    url: api.sliders.front,
    queryKey: [`front-sliders`],
  });
};

export {
  useCreateSlider,
  useDeleteSlider,
  useFetchFrontSliders,
  useFetchSliderById,
  useFetchSliders,
  useUpdateSlider,
};
