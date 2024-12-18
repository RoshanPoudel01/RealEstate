import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse } from "./service-interface";

export interface EnquiryResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  question: string;
  property?: {
    id: number;
    name: string;
  };
}

const useFetchEnquiries = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<EnquiryResponse>>({
    url: api.messages.fetchEnquiries({ page, perPage, keyword }),
    queryKey: ["enquiries"],
  });
};

const useFetchMessages = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<EnquiryResponse>>({
    url: api.messages.fetchMessages({ page, perPage, keyword }),
    queryKey: ["messages"],
  });
};

const useSendMessage = () => {
  return useMutate({
    url: api.messages.send,
    message: "Message sent successfully",
  });
};

export { useFetchEnquiries, useFetchMessages, useSendMessage };
