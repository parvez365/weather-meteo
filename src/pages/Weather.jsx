import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getWeather } from "../services/getWeather";
import { MapPin } from "lucide-react";

const Weather = () => {
  const value = useLocation();
  const place = value.state;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!place) {
      return;
    }
    const fetchWeather = async () => {
      try {
        const result = await getWeather(place);
        setWeather(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWeather();
  }, [place]);

  console.log(weather);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
        {weather && (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-xl font-bold text-blue-400">
              Today's Weather Details
            </h2>
            <div className="flex items-center space-x-2.5">
              <MapPin size={22} className="text-blue-600"/>
              <h4 className="text-3xl font-bold text-blue-600">{place.name}</h4>
            </div>
            <div className="flex items-center space-x-6">
              <h2 className="text-4xl font-extrabold text-purple-800">
                {weather?.temperature}<sup className="text-xl">°C</sup>
              </h2>
              <p className="text-3xl font-bold text-purple-700">
                {weather?.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-300 p-2.5 rounded-lg shadow-md flex flex-col items-center space-y-1">
                <p className="text-xl font-semibold text-purple-600">Feels Like</p>
                <h3 className="text-2xl font-bold text-purple-800">{weather?.feelsLike}<sup className="text-base">°C</sup></h3>
              </div>
              <div className="bg-gray-300 p-2.5 rounded-lg shadow-md flex flex-col items-center space-y-1">
                <p className="text-xl font-semibold text-purple-600">Humidity</p>
                <h3 className="text-2xl font-bold text-purple-800">{weather?.humidity}<span className="text-lg">%</span></h3>
              </div>
              <div className="bg-gray-300 p-2.5 rounded-lg shadow-md flex flex-col items-center space-y-1">
                <p className="text-xl font-semibold text-purple-600">Wind Speed</p>
                <h3 className="text-2xl font-bold text-purple-800">{weather?.windSpeed} <span className="text-lg">km/h</span></h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
