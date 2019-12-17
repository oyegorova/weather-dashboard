import { get } from "./config";
export const Temperature = {
  byDay: sensors => get(`/sensors/v1/day?sensors=${sensors}`),
  byPeriod: (sensors, fromEpochMillis, toEpochMillis) =>
    get(
      `sensors/v1/period?sensors=${sensors}&fromEpochMillis=${fromEpochMillis}&toEpochMillis=${toEpochMillis}`
    ),
  realTime: () => get(`/sensors/v1/realtime`)
};

export const WebSocket_ENDPOINT = "ws://172.18.200.166:8080/sensors/v1/realtime";

export const sensorNames = ['centerRoom', 'outside', 'nearWindow'];
