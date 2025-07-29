import axios from "axios";
import { filterWeatherData } from "../models/weather_data.js";
import { WEATHER_API_KEY } from "../const.js";

export async function getWeather(position_lat, position_lng, period, date) {
    console.log("=================================");
    console.log("params", position_lat, position_lng, period, date);
    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?q=${position_lat}%2C${position_lng}&days=${period}&dt=${date}&lang=fr&key=${WEATHER_API_KEY}`
        );
        return filterWeatherData(response.data);
    } catch (error) {
        console.error("Error fetching next stop:", error);
        throw error;
    }
}
