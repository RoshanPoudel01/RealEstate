export interface TokenDetails {
  accessToken: string;
  refreshToken: string;
}

export interface StateTokenDetails {
  refreshToken: string;
  exp: number;
}

export enum Authorities {
  "admin" = "admin",
}
export const authTokenKey = "authToken";

function setToken(token: TokenDetails) {
  try {
    localStorage.setItem("token", token.accessToken);
    localStorage.setItem("refreshToken", token.refreshToken);
  } catch (e) {
    console.error("Error storing token", e);
  }
}

function getToken() {
  try {
    return {
      accessToken: localStorage.getItem("token") ?? "",
      refreshToken: localStorage.getItem("refreshToken") ?? "",
    } as TokenDetails;
  } catch (e) {
    return null;
  }
}

function getTokenDetails(): StateTokenDetails | null {
  try {
    const token = getToken();

    return token
      ? (JSON.parse(
          window.atob(token.accessToken.split(".")[1])
        ) as StateTokenDetails)
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails.exp * 1000 > Date.now();
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;
