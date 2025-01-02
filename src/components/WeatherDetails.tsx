import { LuEye } from 'react-icons/lu';

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
        icon: <LuEye />,
        information: 'Humidity',
    },
    windSpeed: {
        icon: <LuEye />,
        information: 'Wind Speed',
    },
    airPressure: {
        icon: <LuEye />,
        information: 'Air Pressure',
    },
    sunrise: {
        icon: <LuEye />,
        information: 'Sunrise',
    },
    sunset: {
        icon: <LuEye />,
        information: 'Sunset',
    },
};

export const WeatherDetails = (props: WeatherDetailsProps) => {
    return (
        <>
            {Object.keys(detailsMap).map((name) => (
                <SingleWeatherDetails
                    information={detailsMap.[name].information}
                    icon={detailsMap.[name].icon}
                    value={props.[name]}
                />
            ))}
        </>
    );
};
