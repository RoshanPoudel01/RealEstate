import { api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleResponse } from "./service-interface";

export interface TestimonialResponse {
    id: number;
  name: string;
  message: string;
  is_active: number;
  image: string;
}

const useFetchTestimonials = ({page=1, perPage=10, keyword=""}) => {
    return useFetch<RootResponse<TestimonialResponse>>({
        url: api.testimonials.fetch({page, perPage, keyword}),
        queryKey: ['testimonials',]
    })
} 

const useFetchTestimonialById = ({id, enabled} : {id: number, enabled: boolean}) => {
    return useFetch<SingleResponse<TestimonialResponse>>({
        url: api.testimonials.byId.replace(":id", id + ""),
        queryKey: ['testimonial'],
        enabled : !!id && enabled
    })
}

const useCreateTestimonial = () => {
    return useMutate({
        url: api.testimonials.create,
        invalidates: ['testimonials']
    })
}

const useUpdateTestimonial = () => {
    return useMutate({
        url: api.testimonials.byId,
        invalidates: ['testimonials'],
        method: 'POST'
    })
}

const useDeleteTestimonial = () => {
    return useMutate({
        url: api.testimonials.byId,
        invalidates: ['testimonials'],
        method: 'DELETE'
    })
}

export {
    useCreateTestimonial, useDeleteTestimonial, useFetchTestimonialById, useFetchTestimonials, useUpdateTestimonial
};

