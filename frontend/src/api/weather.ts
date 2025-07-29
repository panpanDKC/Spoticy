import axios from "axios";
import { WEATHER_APP_API_URL } from "../const";
import { type CurrentAndNextWeatherData } from "../models/weatherData";

export async function getWeather(lat: number, lng: number) {
    const period = 2;
    const date = "2025-07-29";
    try {
        const resp = await axios.get(
            `${WEATHER_APP_API_URL}/weather?lat=${lat}&lng=${lng}&period=${period}&date=${date}`
        );
        return resp.data as CurrentAndNextWeatherData;
    } catch (err) {
        console.log(`error: ${err}`);

        console.log(`api ? ${err}`);
        console.error(err);
        throw err; // Re-throw the error for further handling if needed
    }
}
