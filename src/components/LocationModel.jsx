import { useState } from "react";
import { useNavigate } from "react-router";
import { RxCross2 } from "react-icons/rx";
import { getGeolocation } from "../services/getGeolocation";

const LocationModel = ({ onClose }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = city.trim();
    if (!value) {
      setError("Please enter a city name");
      return;
    }

    try {
      const location = await getGeolocation(value);

      if (!location) {
        setError("Geocoding request failed");
      } else {
        navigate("/weather", { state: location});
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (positions) => {
        const { latitude, longitude } = positions.coords;
        navigate("/weather", {
          state: {
            name: "Current Location",
            lat: latitude,
            lon: longitude,
          },
        });
      },
      (error) => {
        setError(error.message);
      },
      {
        timeout: 6000,
      },
    );
  };

  return (
    <div className="w-full h-full fixed flex justify-center items-center bg-gray-800/50">
      <div className="w-sm h-75 p-3 rounded-lg shadow-md bg-gray-100">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="flex justify-center items-center"
          >
            <RxCross2 className="text-2xl cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 text-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="w-full py-1 px-2 border border-gray-800 rounded-2xl outline-none placeholder:text-gray-900/20"
          />
          {error && (
            <p className="w-1/2 mt-0.5 px-2 bg-red-500 text-white text-sm font-medium text-start ml-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-8 w-full py-1.5 rounded-full bg-blue-600 text-base font-medium text-white cursor-pointer"
          >
            Get Weather
          </button>
          <p className="text-lg font-medium text-black">or</p>
          <button
            type="button"
            onClick={handleGeoLocation}
            className="w-full py-1.5 rounded-full bg-blue-600 text-base font-medium text-white cursor-pointer"
          >
            Use Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationModel;
