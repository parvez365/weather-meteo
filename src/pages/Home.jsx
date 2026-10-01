import { useState } from "react";
import LocationModel from "../components/LocationModel";

const Home = () => {
  const [click, setClick] = useState(false);

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-3.5">
      <h2 className="text-5xl font-bold text-blue-300">
        NextLevel <span className="text-blue-400">Weather</span>
      </h2>
      <p className="text-lg font-normal text-gray-300">
        Check your weather today in next level
      </p>
      <button
        onClick={() => setClick(true)}
        className="px-6 py-1.5 rounded-full bg-blue-600 text-base font-medium text-white cursor-pointer"
      >
        Check Weather
      </button>
      {click && <LocationModel onClose={() => setClick(false)} />}
    </div>
  );
};

export default Home;
