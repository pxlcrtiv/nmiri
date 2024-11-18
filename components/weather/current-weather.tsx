"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
  };
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Current Weather</span>
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
            className="w-16 h-16"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <Thermometer className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Temperature</p>
              <p className="text-2xl font-bold">{data.temp}°C</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Droplets className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-2xl font-bold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Wind className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Wind Speed</p>
              <p className="text-2xl font-bold">{data.windSpeed} m/s</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Cloud className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Conditions</p>
              <p className="text-2xl font-bold capitalize">{data.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}