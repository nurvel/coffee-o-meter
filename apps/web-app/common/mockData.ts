import { Brew } from "./api/generated/models/Brew";
import { PotSize } from "./api/generated/models/PotSize";

export const mockData: {
  brew: Brew;
  brews: Brew[];
} = {
  brew: {
    id: 123,
    dateTime: "2022-01-30T08:30:00Z",
    potSize: PotSize.FULL,
  },
  brews: [
    {
      id: 111,
      dateTime: "2022-01-30T08:30:00Z",
      potSize: PotSize.FULL,
    },
    {
      id: 222,
      dateTime: "2022-02-22T014:32:00Z",
      potSize: PotSize.HALF,
    },
  ],
};
