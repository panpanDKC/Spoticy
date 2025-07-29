import GlassCard from "../components/GlassCard";
import {
    FaTemperatureHalf,
    FaQuestion,
    FaLocationArrow,
} from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { TbWind } from "react-icons/tb";
import { IoRainy } from "react-icons/io5";

import "../styles/WeatherApp.css";
import { useEffect, useRef, useState } from "react";
import {
    FakeWeather,
    getWindLabel,
    IconWeatherMapping,
    rain_code_list,
    snow_code_list,
    thunder_code_list,
    type CurrentAndNextWeatherData,
} from "../models/weatherData";
import Rain from "../components/Rain";
import { getWeather } from "../api/weather";

function WeatherApp() {
    const [weatherData, setWeatherData] = useState<CurrentAndNextWeatherData>();
    const [isRaining, setIsRaining] = useState<boolean>(false);
    const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>({
        lat: 48.86,
        lng: 2.33,
    });

    const locationCalled = useRef(false);

    useEffect(() => {
        if (locationCalled.current) {
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error(error.message);
                    // display an error if we cant get the users position
                    console.error("Error getting user location:", error);
                }
            );
        }
        locationCalled.current = true;
    }, []);

    useEffect(() => {
        const clearBackgound = () => {
            const meteo_background =
                document.querySelector("#meteo-background");
            const page_background = document.querySelector(".weather-app-page");

            ["cloudy-heavy-bg", "cloudy-bg", "sunny-bg"].forEach((cls) => {
                meteo_background?.classList.remove(cls);
                page_background?.classList.remove(cls);
            });

            ["meteo-dark-bg", "meteo-clear-bg"].forEach((cls) => {
                meteo_background?.classList.remove(cls);
                page_background?.classList.remove(cls);
                document.body.classList.remove(cls);
            });
        };

        const setEnvironment = (condition_code: number) => {
            clearBackgound();
            const meteo_background =
                document.querySelector("#meteo-background");
            const page_background = document.querySelector(".weather-app-page");
            setIsRaining(
                rain_code_list.includes(condition_code) ||
                    thunder_code_list.includes(condition_code)
            );

            console.log("condition", condition_code);
            if (condition_code === 1000) {
                meteo_background?.classList.add("sunny-bg");
            } else if (condition_code === 1003) {
                meteo_background?.classList.add("cloudy-bg");
            } else {
                meteo_background?.classList.add("cloudy-heavy-bg");
            }
            if (
                rain_code_list.includes(condition_code) ||
                thunder_code_list.includes(condition_code) ||
                snow_code_list.includes(condition_code)
            ) {
                page_background?.classList.add("meteo-dark-bg");
                document.body.classList.add("meteo-dark-bg");
            } else {
                page_background?.classList.add("meteo-clear-bg");
                document.body.classList.add("meteo-clear-bg");
            }
        };
        const fetchData = async () => {
            //const w_data = await getWeather(userCoords.lat, userCoords.lng);
            setWeatherData(FakeWeather);
            setEnvironment(FakeWeather.current_day.condition);
        };
        fetchData();

        const interval = setInterval(fetchData, 900000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [userCoords]);

    const getAngle = () => {
        const currentAngle = weatherData?.current_day.wind.angle;
        if (currentAngle !== undefined) {
            return currentAngle - 45;
        }
        return 0;
    };

    const getConditionText = () => {
        const currentCondition = weatherData?.current_day.condition;
        if (currentCondition !== undefined) {
            return IconWeatherMapping[currentCondition].text;
        }
    };

    const getConditionIcon = () => {
        const currentCondition = weatherData?.current_day.condition;
        if (currentCondition !== undefined) {
            return IconWeatherMapping[currentCondition].icon;
        }
        return FaQuestion;
    };

    return (
        <div className="weather-app-page">
            <div id="meteo-background">
                {isRaining && <Rain />}
                <div className="weather-app-page-content">
                    <div className="location-info">
                        <p className="location-city">
                            {weatherData?.location.city}
                        </p>
                        <p className="location-country">
                            {weatherData?.location.region},{" "}
                            {weatherData?.location.country}
                        </p>
                    </div>
                    <div className="weather-app-content">
                        <div className="content-row" id="first-line">
                            <div
                                id="temperature-container"
                                className="info-container"
                            >
                                <GlassCard
                                    title="TEMPERATURE"
                                    icon={FaTemperatureHalf}
                                >
                                    <div id="temps-container">
                                        <p id="current-temp-label">
                                            {
                                                weatherData?.current_day.temp
                                                    .temp_c
                                            }
                                            °
                                        </p>
                                        <p id="feels-like-temp-label">
                                            {
                                                weatherData?.current_day.temp
                                                    .temp_f_l
                                            }
                                            °
                                        </p>
                                    </div>
                                    <div id="temp-min-max-container">
                                        <div id="temp-min-container">
                                            <p className="temp-label">Min.</p>
                                            <p className="temp-value">
                                                {
                                                    weatherData?.current_day
                                                        .temp.temp_min
                                                }
                                                °
                                            </p>
                                        </div>
                                        <div id="temp-max-container">
                                            <p className="temp-label">Max.</p>
                                            <p className="temp-value">
                                                {
                                                    weatherData?.current_day
                                                        .temp.temp_max
                                                }
                                                °
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                            <div
                                id="condition-container"
                                className="info-container"
                            >
                                <GlassCard title="CONDITION" icon={MdSunny}>
                                    <div id="condition-icon-container">
                                        {(() => {
                                            const Icon = getConditionIcon();
                                            return <Icon className="icon" />;
                                        })()}
                                    </div>
                                    <div id="condition-label-container">
                                        <p id="condition-label">
                                            {getConditionText()}
                                        </p>
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                        <div className="content-row" id="second-line">
                            <div id="wind-container" className="info-container">
                                <GlassCard title="VENT" icon={TbWind}>
                                    <div id="wind-compass-container">
                                        <img
                                            id="compass-img"
                                            src="/src/assets/compass.png"
                                        />
                                        <FaLocationArrow
                                            className="icon"
                                            id="compass-arrow"
                                            style={{
                                                transform: `translate(-50%, -50%) rotate(${getAngle()}deg)`,
                                            }}
                                        />
                                    </div>
                                    <div id="wind-details-container">
                                        <div id="wind-details-label">
                                            <p id="wind-label">
                                                {getWindLabel(
                                                    weatherData?.current_day
                                                        .wind.speed || 0
                                                )}
                                            </p>
                                        </div>
                                        <div id="wind-details-speed">
                                            <p id="wind-speed">
                                                {
                                                    weatherData?.current_day
                                                        .wind.speed
                                                }
                                            </p>
                                            <p id="wind-speed-label">Km/h</p>
                                        </div>
                                        <div id="wind-details-angle">
                                            <p id="wind-angle">
                                                {
                                                    weatherData?.current_day
                                                        .wind.angle
                                                }
                                                °
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                        <div className="content-row" id="third-line">
                            <div id="sky-container" className="info-container">
                                <GlassCard title="CIEL" icon={FaQuestion}>
                                    <div id="uv-container">
                                        <p id="uv-label">UV</p>
                                        <p id="uv-value">
                                            {weatherData?.current_day.sky.uv}
                                        </p>
                                    </div>
                                    <div id="cloud-container">
                                        <div id="cloud-label-container">
                                            <p id="cloud-label">Nuage</p>
                                        </div>
                                        <div id="cloud-value-container">
                                            <p id="cloud-value">
                                                {
                                                    weatherData?.current_day.sky
                                                        .cloud
                                                }
                                            </p>
                                            <p id="cloud-percent">%</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                            <div id="rain-container" className="info-container">
                                <GlassCard title="PRECIPITATION" icon={IoRainy}>
                                    <div id="rain-volume-container">
                                        <p id="rain-volume-value">
                                            {
                                                weatherData?.current_day.rain
                                                    .level
                                            }
                                        </p>
                                        <p id="rain-volume-label">mm</p>
                                    </div>
                                    <div id="humidity-container">
                                        <p id="humidity-label">Humidité</p>
                                        <div id="humidity-content">
                                            <p id="humidity-value">
                                                {
                                                    weatherData?.current_day
                                                        .rain.humidity
                                                }
                                            </p>
                                            <p id="humidity-percent">%</p>
                                        </div>
                                    </div>
                                    <div id="pressure-container">
                                        <p id="pressure-label">Pression</p>
                                        <div id="pressure-content">
                                            <p id="pressure-value">
                                                {
                                                    weatherData?.current_day
                                                        .rain.pressure
                                                }
                                            </p>
                                            <p id="pressure-unit">hPa</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
