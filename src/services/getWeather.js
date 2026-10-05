const WMO_CODES = {
  0: {
    condition: "clear sky",
    description: "Clear sky",
    label: "clear_sky",
    icon: "clearSky",
  },
  1: {
    condition: "mainly clear",
    description: "Mainly clear",
    label: "mainly_clear",
    icon: "mainlyClear",
  },
  2: {
    condition: "partly cloudy",
    description: "Partly cloudy",
    label: "partly_cloudy",
    icon: "partlyCloudy",
  },
  3: {
    condition: "overcast",
    description: "Overcast",
    label: "overcast",
    icon: "overcast",
  },
  45: {
    condition: "fog",
    description: "Fog",
    label: "fog",
    icon: "fog",
  },
  48: {
    condition: "depositing rime fog",
    description: "Depositing rime fog",
    label: "depositing_rime_fog",
    icon: "depositingRimeFog",
  },
  51: {
    condition: "light drizzle",
    description: "Light drizzle",
    label: "light_drizzle",
    icon: "lightDrizzle",
  },
  53: {
    condition: "moderate drizzle",
    description: "Moderate drizzle",
    label: "moderate_drizzle",
    icon: "moderateDrizzle",
  },
  55: {
    condition: "dense drizzle",
    description: "Dense drizzle",
    label: "dense_drizzle",
    icon: "denseDrizzle",
  },
  56: {
    condition: "light freezing drizzle",
    description: "Light freezing drizzle",
    label: "light_freezing_drizzle",
    icon: "lightFreezingDrizzle",
  },
  57: {
    condition: "dense freezing drizzle",
    description: "Dense freezing drizzle",
    label: "dense_freezing_drizzle",
    icon: "denseFreezingDrizzle",
  },
  61: {
    condition: "slight rain",
    description: "Slight rain",
    label: "slight_rain",
    icon: "slightRain",
  },
  63: {
    condition: "moderate rain",
    description: "Moderate rain",
    label: "moderate_rain",
    icon: "moderateRain",
  },
  65: {
    condition: "heavy rain",
    description: "Heavy rain",
    label: "heavy_rain",
    icon: "heavyRain",
  },
  66: {
    condition: "light freezing rain",
    description: "Light freezing rain",
    label: "light_freezing_rain",
    icon: "lightFreezingRain",
  },
  67: {
    condition: "heavy freezing rain",
    description: "Heavy freezing rain",
    label: "heavy_freezing_rain",
    icon: "heavyFreezingRain",
  },
  71: {
    condition: "slight snowfall",
    description: "Slight snowfall",
    label: "slight_snowfall",
    icon: "slightSnowfall",
  },
  73: {
    condition: "moderate snowfall",
    description: "Moderate snowfall",
    label: "moderate_snowfall",
    icon: "moderateSnowfall",
  },
  75: {
    condition: "heavy snowfall",
    description: "Heavy snowfall",
    label: "heavy_snowfall",
    icon: "heavySnowfall",
  },
  77: {
    condition: "snow grains",
    description: "Snow grains",
    label: "snow_grains",
    icon: "snowGrains",
  },
  80: {
    condition: "slight rain showers",
    description: "Slight rain showers",
    label: "slight_rain",
    icon: "slightRain",
  },
  81: {
    condition: "moderate rain showers",
    description: "Moderate rain showers",
    label: "moderate_rain",
    icon: "moderateRain",
  },
  82: {
    condition: "violent rain showers",
    description: "Violent rain showers",
    label: "violent_rain",
    icon: "violentRain",
  },
  85: {
    condition: "slight snow showers",
    description: "Slight snow showers",
    label: "slight_snow",
    icon: "slightSnow",
  },
  86: {
    condition: "heavy snow showers",
    description: "Heavy snow showers",
    label: "heavy_snow",
    icon: "heavySnow",
  },
  95: {
    condition: "thunderstorm",
    description: "Thunderstorm",
    label: "thunderstorm",
    icon: "thunderstorm",
  },
};

export const getWeather = async (place) => {
  const { lat, lon } = place;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,precipitation,rain,weather_code`;

  const result = await fetch(url);
  const data = await result.json();
  const now = data.current;

  if (!now) {
    throw new Error("Weather data not found");
  }

  const weather = WMO_CODES[now.weather_code];
  const icon = weather.icon === now.is_day
      ? `${weather.icon}_Day`
      : `${weather.icon}_Night`;

  return {
    temperature: Math.round(now.temperature_2m),
    feelsLike: Math.round(now.apparent_temperature),
    humidity: now.relative_humidity_2m,
    windSpeed: Math.round(now.wind_speed_10m),
    condition: weather.condition,
    description: weather.description,
    label: weather.label,
    icon: icon,
  };
};
