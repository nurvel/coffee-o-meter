import {
  ApiError,
  Brew,
  BrewService,
  OpenAPIConfig,
} from "api";

const openAPIConfig: OpenAPIConfig = {
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  VERSION: "1.0.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
const client = new BrewService(openAPIConfig).default;

export const getBrews = async (): Promise<Brew[]> => {
  return client
    .findAllBrews()
    .then((brews: Brew[]) => {
      return brews;
    })
    .catch((err) => {
      console.log("GET /brews API client error", err);
      return [];
    });
};

export const getLatestBrew = async (): Promise<Brew | null> => {
  return client
    .findLatestBrew()
    .then((brew: Brew) => {
      return brew;
    })
    .catch((err: ApiError) => {
      console.log("GET /last brew API client error", err);
      return null;
    });
};

export const createBrew = async (): Promise<Brew | null> => {
  return client
    .addBrew()
    .then((brew: Brew) => {
      return brew;
    })
    .catch((err: ApiError) => {
      console.log("POST /brews API client error", err);
      return null;
    });
};
