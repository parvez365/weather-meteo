import { useLocation } from "react-router";

const Weather = () => {
  const value = useLocation();
  const place = value.state;
  console.log(place);
  
  return (
    <div>Weather</div>
  )
}

export default Weather