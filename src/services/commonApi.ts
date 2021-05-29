// export const API_ROOT = (host: string): string => `http://${host}/api`;
import isDev from "../utilities/environment";

export const API_ROOT = (host: string): string =>
  isDev() ? `http://${host}:7000/api` : `http://${host}/api`;
