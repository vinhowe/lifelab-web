// export const API_ROOT = (host: string): string => `http://${host}/api`;
import development from "../utilities/environment";

export const API_ROOT = (host: string): string =>
  development ? `http://${host}:7000/api` : `http://${host}/api`;
