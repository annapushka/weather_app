import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { Container } from './Container';
import { WeatherDetails, WeatherDetailsProps } from './WeatherDetails';
import { WeatherIcon } from './WeatherIcon';

interface ForecastWeatherDetailProps extends WeatherDetailsProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    description: string;
}

export const ForecastWeatherDetail = (props: ForecastWeatherDetailProps) => {
    const { weatherIcon, date, day, temp, feels_like, description } = props;

    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4'>
                <div className='flex flex-col gap-1 items-center'>
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
                        <span className='text-xs'>
                            {convertKelvinToCelsius(feels_like ?? 0)}°
                        </span>
                    </p>
                    <p className='capitalize'>{description}</p>
                </div>
            </section>
            <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
                <WeatherDetails {...props} />
            </section>
        </Container>
    );
};
