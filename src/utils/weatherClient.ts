import axios, { AxiosInstance } from "axios";
export function weatherClientFactory(): AxiosInstance {
    return axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/`,
    });
}

export const weatherClient = weatherClientFactory();