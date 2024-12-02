const service = `internal-service`;
export const api = {
  auth: {
    login: `${service}/api/auth/login`,
    refreshToken: `${service}/api/auth/refreshToken`,
    logout: `${service}/api/auth/logout`,
  },
};
