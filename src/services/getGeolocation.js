export const getGeolocation = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;


  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("Geocoding request failed");
  }

  const data = await result.json();
  const place = data.results[0];

  return {
    name: place.name,
    lat: place.latitude,
    lon: place.longitude,
  };
};
