import { apiClient } from "../API/config";

export const Temperature = {
  byDay: sensors => apiClient.get(`/sensors/v1/day?sensors=${sensors}`),
  byPeriod: (sensors, fromEpochMillis, toEpochMillis) =>
    apiClient.get(
      `sensors/v1/period?sensors=${sensors}&fromEpochMillis=${fromEpochMillis}&toEpochMillis=${toEpochMillis}`
    ),
  realTime: () => apiClient.get(`/sensors/v1/realtime`)
};



export const sensorNames = ['centerRoom', 'nearWindow', 'outside'];
