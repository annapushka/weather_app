export interface WeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherData[];
    city: CityInfo;
}

interface WeatherData {
    dt: number;
    main: MainWeather;
    weather: WeatherDescription[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: SysInfo;
    dt_txt: string;
}

interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface WeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Clouds {
    all: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface SysInfo {
    pod: string;
}

interface CityInfo {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

interface Coordinates {
    lat: number;
    lon: number;
}
