import { useState } from "react";
import WeatherItem from "./WeatherItem";

import axios from "axios";
interface weatherProps {
  weather: {
    id: number;
    main: string;
    icon: string;
    description: string;
  }[];
  sys: {
    country: string;
  };
  name: string;
  main: {
    humidity: number;
    temp: number;
  };
  wind: {
    speed: number;
  };
}

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<weatherProps | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string[] | []>([]);
  // const [clothingSuggestions, setClothingSuggestions] = useState([]);
  // console.log(apiKey)

  const fetchPrediction = async () => {
    const response = await axios.post("/weather", { city });
    //  const { suggestions } = ;
    setPrediction(response.data);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCity(input);
    // autoCompleteCityName(input)
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPrediction();
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    // setIsLoading(false)
    setCity("");
  };
  // console.log(weather)
  // console.log(loading)

  return (
    <div className="relative w-full min-h-screen max-h-[120vh] max-w-full px-4 top-[50%] py-6 left-0 mx-auto flex items-center justify-center">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg"
        alt=""
        loading="lazy"
      />
      <div className=" px-4 w-full md:max-w-[50vw] mt-24 lg:max-w-[40vw] backdrop-blur backdrop-filter border translation hover:border-l-8 border-l-2 border-l-cyan-500 h-auto bg-slate-900/10 rounded-2xl">
        <form onSubmit={onSubmit}>
          <div className="flex gap-4 items-center justify-center w-full py-10 h-full">
            <div className="flex flex-col justify-center w-full">
              <label
                htmlFor="city"
                className="uppercase text-slate-200 text-center font-bold text-sm"
              >
                City name
              </label>
              <input
                type="text"
                placeholder="current weather in your City"
                value={city}
                onChange={handleCityChange}
                className="px-4 py-1.5 w-full outline-none focus:border-cyan-500 translation border-b-2 text-slate-200 placeholder:text-slate-400 bg-transparent rounded-xl"
                required
              />
            </div>
            <button className="inline-block px-4 py-1.5 lg:py-2 w-20 lg:w-32 hover:bg-slate-200 hover:text-slate-950 hover:shadow-slate-950 shadow-2xl  hover:border-l-4 hover:border-r-4 border-cyan-500 font-bold bg-slate-950 text-slate-100 rounded-lg text-sm translation">
              Search
            </button>
          </div>
        </form>
        {weather && (
          <WeatherItem
            weather={weather}
            loading={loading}
            prediction={prediction}
          />
        )}
      </div>
    </div>
  );
};

export default Weather;
