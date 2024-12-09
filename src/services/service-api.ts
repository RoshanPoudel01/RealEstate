// const service = `internal-service`;
export const api = {
  auth: {
    login: `admin/login`,
    refreshToken: `refreshToken`,
    logout: `logout`,
    me: `user`,
  },
  settings: {
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
    fetchById: `admin/service/:id`,
    create: `admin/service`,
    update: `admin/service/:id`,
    delete: `admin/service/:id`,
  },
  teams: {
    fetch: ({ page = 1, perPage = 10, keyword = "" }) => {
      let url = `/admin/team?page=${page}&per_page=${perPage}`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      return url;
    },
    fetchById: `admin/team/:id`,
    create: `admin/team`,
    update: `admin/team/:id`,
    delete: `admin/team/:id`,
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
    update: `admin/property/:id`,
    delete: `admin/property/:id`,
  },
};
