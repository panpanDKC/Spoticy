import type { IconType } from "react-icons";
import { MdSunny } from "react-icons/md";
import {
    BsFillCloudSunFill,
    BsFillCloudsFill,
    BsFillCloudSnowFill,
} from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import { IoThunderstorm } from "react-icons/io5";

export interface CurrentAndNextWeatherData {
    location: {
        city: string;
        country: string;
    };
    current_day: WeatherData;
    next_day: WeatherData | null;
}

export interface WeatherData {
    temp: {
        temp_c: number;
        temp_f_l: number;
        temp_min: number;
        temp_max: number;
    };
    condition: number;
    wind: {
        speed: number;
        angle: number;
    };
    rain: {
        level: number;
        humidity: number;
        pressure: number;
    };
    sky: {
        uv: number;
        cloud: number;
    };
}

export const IconWeatherMapping: {
    [key: number]: { text: string; icon: IconType };
} = {
    1000: { text: "Ensoleillé", icon: MdSunny },
    1003: { text: "Partiellement nuageux", icon: BsFillCloudSunFill },
    1006: { text: "Nuageux", icon: BsFillCloudsFill },
};

// Set icon for raining condition
export const rain_code_list = [
    1063, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246,
];
rain_code_list.forEach((code) => {
    IconWeatherMapping[code] = { text: "Pluie", icon: FaCloudShowersHeavy };
});

// Set icon for snowing condition
export const snow_code_list = [
    1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,
];
snow_code_list.forEach((code) => {
    IconWeatherMapping[code] = { text: "Pluie", icon: BsFillCloudSnowFill };
});

// Set icon for thunder condition
export const thunder_code_list = [1087, 1273, 1276, 1279, 1282];
thunder_code_list.forEach((code) => {
    IconWeatherMapping[code] = { text: "Pluie", icon: IoThunderstorm };
});

export const FakeWeather: CurrentAndNextWeatherData = {
    location: {
        city: "Antony",
        country: "France",
    },
    current_day: {
        temp: {
            temp_c: 29,
            temp_f_l: 31,
            temp_min: 23,
            temp_max: 32,
        },
        condition: 1003,
        wind: {
            speed: 12,
            angle: 60,
        },
        rain: {
            level: 0,
            humidity: 2,
            pressure: 1021,
        },
        sky: {
            uv: 7,
            cloud: 1,
        },
    },
    next_day: null,
};
