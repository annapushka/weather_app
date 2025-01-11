import { Container } from './Container';
import { WeatherIcon } from './WeatherIcon';

interface ForecastWeatherDetailProps {}

export const ForecastWeatherDetail = ({}: ForecastWeatherDetailProps) => {
    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4'>
                <div>
                    <WeatherIcon iconName={''} />
                </div>
            </section>
        </Container>
    );
};
