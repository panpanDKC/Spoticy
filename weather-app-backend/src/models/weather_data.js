export function filterWeatherData(weather_data) {
    let final_data = {
        location: {
            city: weather_data.location.name,
            region: weather_data.location.region,
            country: weather_data.location.country,
        },
        current_day: getCurrentDayData(
            weather_data.current,
            weather_data.forecast.forecastday[0]
        ),
        next_day: null,
    };
    return final_data;
}

function getCurrentDayData(day, forecast_curr) {
    return {
        temp: {
            temp_c: Math.round(day.temp_c),
            temp_f_l: Math.round(day.feelslike_c),
            temp_min: Math.round(forecast_curr.day.mintemp_c),
            temp_max: Math.round(forecast_curr.day.maxtemp_c),
        },
        condition: day.condition.code,
        wind: {
            speed: Math.round(day.wind_kph),
            angle: day.wind_degree,
        },
        rain: {
            level: Math.round(day.precip_mm),
            humidity: day.humidity,
            pressure: Math.round(day.pressure_mb),
        },
        sky: {
            uv: Math.round(day.uv),
            cloud: day.cloud,
        },
    };
}
