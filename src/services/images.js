import { apiClient } from "../services/API/config";

export const getImageList = () => {
    return apiClient.get("https://picsum.photos/v2/list?page=2&limit=100");
};