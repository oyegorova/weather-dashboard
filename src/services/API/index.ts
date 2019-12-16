import { get, post, put, destroy } from "./config";
export const Temperature = {
  byDay: sensors => get(`/sensors/v1/day?sensors=${sensors}`),
  byPeriod: (sensors, fromEpochMillis, toEpochMillis) =>
    get(
      `sensors/v1/period?sensors=${sensors}&fromEpochMillis=${fromEpochMillis}&toEpochMillis=${toEpochMillis}`
    ),
  realTime: () => get(`/sensors/v1/realtime`)
};
