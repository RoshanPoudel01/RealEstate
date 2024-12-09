import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface FaqResponse {
  id: number;
  question_en: string;
  question_np: string;
  answer_en: string;
  answer_np: string;
}

const useFetchFaqs = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<FaqResponse>>({
    url: api.faqs.fetch({ page, perPage, keyword }),
    queryKey: [`faqs`],
  });
};

const useFetchFaqById = (id: string) => {
  return useFetch<SingleResponse<FaqResponse>>({
    url: api.faqs.fetchById.replace(":id", id),
    queryKey: [`faq`],
    enabled: !!id,
  });
};

const useCreateFaq = () => {
  return useMutate({
    url: api.faqs.create,
    queryKey: [`create-faq`],
    invalidates: [`faqs`],
    message: "Faq created successfully",
  });
};

const useUpdateFaq = () => {
  return useMutate({
    url: api.faqs.update,
    queryKey: [`update-faq`],
    invalidates: [`faqs`, `faq`],
    method: `POST`,
    message: `Faq updated successfully`,
  });
};

const useDeleteFaq = () => {
  return useMutate({
    url: api.faqs.delete,
    queryKey: [`delete-faq`],
    invalidates: [`faqs`],
    method: `DELETE`,
    message: `Faq deleted successfully`,
  });
};

export {
  useCreateFaq,
  useDeleteFaq,
  useFetchFaqById,
  useFetchFaqs,
  useUpdateFaq,
};
