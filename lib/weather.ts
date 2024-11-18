const BASE_URL = "https://api.open-meteo.com/v1";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1";

export async function getCurrentWeather(lat: number, lon: number) {
  const response = await fetch(
    `${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );
  const data = await response.json();

  const weatherCodes: { [key: number]: { description: string; icon: string } } = {
    0: { description: "Clear sky", icon: "01d" },
    1: { description: "Mainly clear", icon: "02d" },
    2: { description: "Partly cloudy", icon: "03d" },
    3: { description: "Overcast", icon: "04d" },
    45: { description: "Foggy", icon: "50d" },
    48: { description: "Depositing rime fog", icon: "50d" },
    51: { description: "Light drizzle", icon: "09d" },
    53: { description: "Moderate drizzle", icon: "09d" },
    55: { description: "Dense drizzle", icon: "09d" },
    61: { description: "Slight rain", icon: "10d" },
    63: { description: "Moderate rain", icon: "10d" },
    65: { description: "Heavy rain", icon: "10d" },
    71: { description: "Slight snow", icon: "13d" },
    73: { description: "Moderate snow", icon: "13d" },
    75: { description: "Heavy snow", icon: "13d" },
    77: { description: "Snow grains", icon: "13d" },
    80: { description: "Slight rain showers", icon: "09d" },
    81: { description: "Moderate rain showers", icon: "09d" },
    82: { description: "Violent rain showers", icon: "09d" },
    85: { description: "Slight snow showers", icon: "13d" },
    86: { description: "Heavy snow showers", icon: "13d" },
    95: { description: "Thunderstorm", icon: "11d" },
    96: { description: "Thunderstorm with hail", icon: "11d" },
    99: { description: "Thunderstorm with heavy hail", icon: "11d" },
  };

  const weather = weatherCodes[data.current.weather_code];

  return {
    temp: Math.round(data.current.temperature_2m),
    humidity: Math.round(data.current.relative_humidity_2m),
    windSpeed: Math.round(data.current.wind_speed_10m),
    description: weather.description,
    icon: weather.icon,
  };
}

export async function getForecast(lat: number, lon: number) {
  const response = await fetch(
    `${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&forecast_days=1`
  );
  const data = await response.json();

  return data.hourly.temperature_2m.slice(0, 8).map((temp: number, index: number) => ({
    time: new Date(data.hourly.time[index]).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    }),
    temp: Math.round(temp),
  }));
}

export async function getCoordinates(city: string) {
  const response = await fetch(
    `${GEO_URL}/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );
  const data = await response.json();

  if (!data.results?.length) {
    throw new Error("City not found");
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name,
  };
}