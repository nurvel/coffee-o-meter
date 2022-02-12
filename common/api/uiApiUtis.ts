import { ApiError, Brew, Brews, BrewService } from "./generated";

const client = new BrewService().default;

export const getBrews = async (): Promise<Brews | ApiError> => {
  return client
    .getBrews()
    .then((brews: Brews) => {
      return brews;
    })
    .catch((err: ApiError) => err);
};

export const createBrew = async (brew: Brew): Promise<Brew | ApiError> => {
  return client
    .postBrews(brew)
    .then((brews: Brew) => {
      return brews;
    })
    .catch((err: ApiError) => err);
};
