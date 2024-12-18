import { PropertyParams } from "./service-properties";

// const service = `internal-service`;
export const api = {
  auth: {
    login: `admin/login`,
    refreshToken: `refreshToken`,
    logout: `logout`,
    me: `user`,
  },
  settings: {
    front: `setting`,
    statistics: `statistics`,

    fetch: `admin/setting`,
    update: `admin/setting`,
  },
  sliders: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/slider?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    fetchById: `admin/slider/:id`,
    create: `admin/slider`,
    update: `admin/slider/:id`,
    delete: `admin/slider/:id`,
  },
  categories: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/category?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    list: "admin/category/get-list",
    fetchById: `admin/category/:id`,
    create: `admin/category`,
    update: `admin/category/:id`,
    delete: `admin/category/:id`,
  },
  services: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/service?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    byId: `admin/service/:id`,
    create: `admin/service`,
    front: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/service?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
  },
  teams: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/team?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },

    byId: `admin/team/:id`,
    index: `admin/team`,
    front: `team`,
  },
  properties: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/property?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    fetchById: `admin/property/:id`,
    create: `admin/property`,
    images: `admin/property/images/:id`,
    amenity: `admin/property/amenity/:id`,
    faqs: `admin/faq/:id`,
    getList: ({ categoryId = "", keyword = "" }) => {
      let url = `/admin/property-list`;
      if (categoryId && !keyword) {
        url += `?category_id=${categoryId}`;
      }
      if (keyword && !categoryId) {
        url += `?keyword=${keyword}`;
      }
      if (categoryId && keyword) {
        url += `?category_id=${categoryId}&keyword=${keyword}`;
      }
      return url;
    },
    update: `admin/property/:id`,
    delete: `admin/property/:id`,
    properties: ({ propertyType, language = "en" }: PropertyParams) => {
      return `/property${propertyType ? "/" + propertyType : ""}?lang=${language}`;
    },
    propertyById: `/property/{id}`,
    featured: `admin/property/featured`,
    trending: `admin/property/trending`,
    new: `admin/property/new`,
  },

  testimonials: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/testimonial?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    fetchAll: "/testimonial",
    create: `/admin/testimonial`,
    byId: `/admin/testimonial/:id`,
  },
  messages: {
    fetchMessages: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/message?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    fetchEnquiries: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/property-message?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    send: `/contact-us`,
    fetchById: `admin/message/:id`,
    delete: `admin/message/:id`,
  },
  statistics: {
    index: `admin/statistics`,
    byId: `admin/statistics/:id`,
  },
};
