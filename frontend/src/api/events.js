import axiosReady from "./axiosConfig";

export const apiGetEvents = async () => {
    const res = await axiosReady.get("/api/v1/events");
    return res;
}; 