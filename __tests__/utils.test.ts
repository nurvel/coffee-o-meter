import { isThrottleBrew } from "../common/utilsApi";
import { Brew as PrismaBrew } from "@prisma/client";

const brew: PrismaBrew = {
  id: "123",
  dateTime: new Date(2022, 11, 19, 13, 30, 30),
  fact: "This is a fact",
};
const dateNow: number = brew.dateTime.getTime() + 1000;
const throttleSeconds = 1;

describe("Get throttle brew status", () => {
  test("Throttle is active within one second", () => {
    expect(isThrottleBrew(throttleSeconds, brew, dateNow)).toBe(false);
  });

  test("Throttle is not  active after one second", () => {
    expect(isThrottleBrew(throttleSeconds + 1, brew, dateNow)).toBe(true);
  });
});
