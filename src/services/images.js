import { get } from "../services/API/config";

export const getImageList = () => {
    return get("https://picsum.photos/v2/list");
};