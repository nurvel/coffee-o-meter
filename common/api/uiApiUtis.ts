import { ApiError, Brew, Brews, BrewService } from "./generated";

const client = new BrewService().default;

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

export const createBrew = async (
): Promise<Brew | ApiError> => {
  return client
    .addBrew()
    .then((brew: Brew) => {
      return brew;
    })
    .catch((err: ApiError) => err);
};
