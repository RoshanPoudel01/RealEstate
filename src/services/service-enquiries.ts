import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";

const useFetchEnquiries = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch({
    url: api.messages.fetchEnquiries({ page, perPage, keyword }),
    queryKey: ["enquiries"],
  });
};

const useFetchMessages = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch({
    url: api.messages.fetchProperties({ page, perPage, keyword }),
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
