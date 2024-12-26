import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface GalleryResponse {
  id: number;
  image: string;
  is_active: number;
  display_order: number;
  images: Image[];
  title_en: string;
  title_np: string;
  description_en: string;
  description_np: string;
}

export interface GalleryFrontResponse {
  id: number;
  image: string;
  title: string;
  description: string;
  images: Image[];
}

export interface Image {
  id: number;
  image: string;
}

const useFetchGalleries = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<GalleryResponse>>({
    url: api.gallery.fetch({ page, perPage, keyword }),
    queryKey: ["galleries", { page, perPage, keyword }],
  });
};

const useFetchGalleryById = (id: string | undefined) => {
  return useFetch<SingleResponse<GalleryResponse>>({
    url: api.gallery.byId.replace(":id", id + ""),
    queryKey: ["gallery", id],
    enabled: !!id,
  });
};

const useAddGallery = () => {
  return useMutate({
    url: api.gallery.index,
    invalidates: ["galleries"],
    message: "Gallery added successfully",
  });
};

const useUpdateGallery = () => {
  return useMutate({
    url: api.gallery.byId,
    method: "POST",
    invalidates: ["galleries"],
    message: "Gallery updated successfully",
  });
};

const useDeleteGallery = () => {
  return useMutate({
    url: api.gallery.byId,
    method: "DELETE",
    invalidates: ["galleries"],
    message: "Gallery deleted successfully",
  });
};

const useFetchFrontGalleries = (lang = "en") => {
  return useFetch<RootResponse<GalleryFrontResponse>>({
    url: api.gallery.front({ lang }),
    queryKey: ["front-galleries"],
  });
};

const useFetchGalleryImages = ({
  lang,
  id,
}: {
  id: string | undefined;
  lang: string;
}) => {
  return useFetch<SingleResponse<GalleryFrontResponse>>({
    url: api.gallery.frontById({
      id: id + "",
      lang,
    }),
    queryKey: ["gallery-images", id],
    enabled: !!id,
  });
};

export {
  useAddGallery,
  useDeleteGallery,
  useFetchFrontGalleries,
  useFetchGalleries,
  useFetchGalleryById,
  useFetchGalleryImages,
  useUpdateGallery,
};
