import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { Container } from './Container';
import { WeatherDetailsProps } from './WeatherDetails';
import { WeatherIcon } from './WeatherIcon';

interface ForecastWeatherDetailProps extends WeatherDetailsProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export const ForecastWeatherDetail = ({
    weatherIcon,
    date,
    day,
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
}: ForecastWeatherDetailProps) => {
    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4'>
                <div>
                    <WeatherIcon iconName={weatherIcon} />
                    <p>{date}</p>
                    <p className='text-sm'>{day}</p>
                </div>
                <div className='flex flex-col px-4'>
                    <span className='text-5xl'>
                        {convertKelvinToCelsius(temp ?? 0)}°
                    </span>
                    <p className='text-xs space-x-1 whitespace-nowrap'>
                        <span>Feels like</span>
                        <span className='text-5xl'>
                            {convertKelvinToCelsius(feels_like ?? 0)}°
                        </span>
                    </p>
                    <p className='capitalize'>{description}</p>
                </div>
            </section>
            <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'></section>
        </Container>
    );
};
