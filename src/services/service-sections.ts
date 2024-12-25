import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { SingleResponse } from "./service-interface";

interface SectionBackResponse {
  id: number;
  section: string;
  slug: string;
  title_en: string;
  title_np: string;
  caption_en: string;
  caption_np: string;
  description_en: string;
  description_np: string;
  image: string;
}

interface SectionFrontResponse {
  id: number;
  section: string;
  slug: string;
  title: string;
  description: string;
  caption: string;
  image: string;
}

const useFetchSection = (slug: string) => {
  return useFetch<SingleResponse<SectionBackResponse>>({
    url: api.sections.bySlug.replace(":slug", slug),
    queryKey: ["section-back", slug],
  });
};

const useUpdateSection = () => {
  return useMutate({
    method: "POST",
    url: api.sections.byId,
    invalidates: ["section-back"],
    message: "Section updated successfully",
  });
};

const useFetchFrontSection = (slug: string, lang: string) => {
  return useFetch<SingleResponse<SectionFrontResponse>>({
    url: api.sections.front({ slug, lang }),
    queryKey: ["section", slug],
  });
};

export { useFetchFrontSection, useFetchSection, useUpdateSection };
