import { ApiError, Brew, BrewService } from "./generated";
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

export const getBrews = async (): Promise<Brew[]> => {
  return client
    .findAllBrews()
    .then((brews: Brew[]) => {
      return brews;
    })
    .catch((err: ApiError) => {
      console.log(err);
      return [];
    });
};

export const getLatestBrews = async (): Promise<Brew | null> => {
  return client
    .findLatestBrew()
    .then((brew: Brew) => {
      return brew;
    })
    .catch((err: ApiError) => {
      console.log(err);
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
      console.log(err);
      return null;
    });
};
