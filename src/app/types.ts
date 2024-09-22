export type WeatherData = {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherForecast[];
    city: CityInfo;
};

type WeatherForecast = {
    dt: number;
    main: MainWeather;
    weather: WeatherDescription[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Rain; // Optional, as it may not be present in all forecasts
    sys: Sys;
    dt_txt: string;
};

type MainWeather = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
};

type WeatherDescription = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type Clouds = {
    all: number;
};

type Wind = {
    speed: number;
    deg: number;
    gust: number;
};

type Rain = {
    '3h': number; // Rain volume for the last 3 hours
};

type Sys = {
    pod: string; // Part of the day (e.g., 'd' for day, 'n' for night)
};

type CityInfo = {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
};

type Coordinates = {
    lat: number;
    lon: number;
};
