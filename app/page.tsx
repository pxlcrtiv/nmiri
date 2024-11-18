"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CurrentWeather } from "@/components/weather/current-weather";
import { ForecastChart } from "@/components/weather/forecast-chart";
import { LocationSearch } from "@/components/weather/location-search";
import { getCurrentWeather, getForecast, getCoordinates } from "@/lib/weather";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [location, setLocation] = useState<string>("");

  const fetchWeatherData = async (lat: number, lon: number, cityName?: string) => {
    try {
      const [weather, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);
      setCurrentWeather(weather);
      setForecast(forecastData);
      setLocation(cityName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`);
    } catch (error) {
      toast.error("Failed to fetch weather data");
    }
  };

  const handleSearch = async (city: string) => {
    try {
      const coords = await getCoordinates(city);
      await fetchWeatherData(coords.lat, coords.lon, coords.name);
    } catch (error) {
      toast.error("City not found");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          toast.error("Unable to get your location");
          handleSearch("London"); // Default fallback
        }
      );
    } else {
      handleSearch("London"); // Default fallback
    }
  }, []);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold text-center">Nmiri</h1>
          <LocationSearch onSearch={handleSearch} />
          {location && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {currentWeather && forecast ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <CurrentWeather data={currentWeather} />
            <ForecastChart data={forecast} />
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-[400px]">
              <div className="animate-pulse text-xl text-muted-foreground">
                Loading weather data...
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}