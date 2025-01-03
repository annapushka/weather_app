import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

export interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

export interface WeatherDetailsProps {
    visability: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

const SingleWeatherDetails = ({
    information,
    icon,
    value,
}: SingleWeatherDetailsProps) => {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
            <p className='whitespace-nowrap'>{information}</p>
            <div className='text-3xl'>{icon}</div>
            <p>{value}</p>
        </div>
    );
};

const detailsMap = {
    visability: {
        icon: <LuEye />,
        information: 'Visability',
    },
    humidity: {
        icon: <FiDroplet />,
        information: 'Humidity',
    },
    windSpeed: {
        icon: <MdAir />,
        information: 'Wind speed',
    },
    airPressure: {
        icon: <ImMeter />,
        information: 'Air pressure',
    },
    sunrise: {
        icon: <LuSunrise />,
        information: 'Sunrise',
    },
    sunset: {
        icon: <LuSunset />,
        information: 'Sunset',
    },
};

type DetailsMapKeys = keyof typeof detailsMap;

export const WeatherDetails = (props: WeatherDetailsProps) => {
    return (
        <>
            {Object.keys(detailsMap).map((name) => {
                const key = name as DetailsMapKeys;
                return (
                    <SingleWeatherDetails
                        information={detailsMap[key].information}
                        icon={detailsMap[key].icon}
                        value={props[key]}
                        key={key}
                    />
                );
            })}
        </>
    );
};
