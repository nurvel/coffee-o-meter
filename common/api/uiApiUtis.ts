import { ApiError, Brew, Brews, BrewService } from "./generated";
import { OpenAPIConfig } from "./generated/core/OpenAPI";

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

export const getBrews = async (): Promise<Brews | ApiError> => {
  return client
    .findAllBrews()
    .then((brews: Brews) => {
      return brews;
    })
    .catch((err: ApiError) => err);
};

export const getLatestBrews = async (): Promise<Brew | ApiError> => {
  return client
    .findLatestBrew()
    .then((brew: Brew) => {
      return brew;
    })
    .catch((err: ApiError) => err);
};

export const createBrew = async (): Promise<Brew | ApiError> => {
  return client
    .addBrew()
    .then((brew: Brew) => {
      return brew;
    })
    .catch((err: ApiError) => err);
};
