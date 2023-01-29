import { getThrottle, isThrottleBrew } from "../common/utilsApi";
import { Brew as PrismaBrew } from "@prisma/client";

const brew: PrismaBrew = {
  id: "123",
  dateTime: new Date(2022, 11, 19, 13, 30, 30),
  fact: "This is a fact",
};
const dateNow: number = brew.dateTime.getTime();
const throttleMilliseconds = 1000;

describe("Get throttle brew boolean", () => {
  test("Throttle is active within one second", () => {
    expect(isThrottleBrew(throttleMilliseconds, brew, dateNow + 1000)).toBe(
      false
    );
  });

  test("Throttle is not  active after one second", () => {
    expect(isThrottleBrew(throttleMilliseconds + 1, brew, dateNow + 1000)).toBe(
      true
    );
  });
});

describe("Get throttle milliseconds", () => {
  test("Last brew started 1 sec ago, with 10 sec throttle", () => {
    expect(getThrottle(dateNow + 1000, throttleMilliseconds + 9000, brew)).toBe(
      9000
    );
  });

  test("Last brew started 11 sec ago, with 10 sec throttle", () => {
    expect(
      getThrottle(dateNow + 11000, throttleMilliseconds + 9000, brew)
    ).toBe(0);
  });

  test("No last brew, with 10 sec throttle", () => {
    expect(getThrottle(dateNow, throttleMilliseconds + 9000)).toBe(0);
  });
});
