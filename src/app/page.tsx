/** @format */
'use client';

import { Navbar } from '@/components/Navbar';
import axios from 'axios';
import { useQuery } from 'react-query';
import { WeatherResponse } from './types';
import { format, fromUnixTime, parseISO } from 'date-fns';
import { Container } from '@/components/Container';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { WeatherIcon } from '@/components/WeatherIcon';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';
import { WeatherDetails } from '@/components/WeatherDetails';
import { metersToKilometrs } from '@/utils/metersToKilometrs';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { ForecastWeatherDetail } from '@/components/ForecastWeatherDetail';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from './atom';
import { useEffect } from 'react';

export const WEATHER_URL = (value: string) =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`;

export default function Home() {
    const [place] = useAtom(placeAtom);
    const [loadingCity] = useAtom(loadingCityAtom);

    const { isLoading, data, refetch } = useQuery<WeatherResponse>(
        'repoData',
        async () => {
            const { data } = await axios.get(WEATHER_URL(place));
            return data;
        }
    );

    useEffect(() => {
        refetch();
    }, [place, refetch]);

    const firstData = data?.list?.[0];

    const uniqueDates = [
        ...new Set(
            data?.list.map(
                (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]
            )
        ),
    ];

    const firstDataForEachDate = uniqueDates.map((date) => {
        return data?.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000)
                .toISOString()
                .split('T')[0];
            const entryTime = new Date(entry.dt * 1000).getHours();
            return entryDate === date && entryTime >= 6;
        });
    });

    if (isLoading)
        return (
            <div className='flex items-center min-h-screen justify-center'>
                <p className='animate-bounce'>Loading...</p>
            </div>
        );

    return (
        <div className='flex flex-col gap-4 bg-gray-100 min-h-screen max-w-screen'>
            <Navbar location={data?.city.name} />

            <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
                {loadingCity ? (
                    <Skeleton />
                ) : (
                    <>
                        <section className='space-y-4'>
                            <div className='space-y-2'>
                                <h2 className='flex gap-1 text-2xl items-end'>
                                    <p>
                                        {format(
                                            parseISO(firstData?.dt_txt ?? ''),
                                            'EEEE'
                                        )}
                                    </p>
                                    <p className='text-lg'>
                                        (
                                        {format(
                                            parseISO(firstData?.dt_txt ?? ''),
                                            'dd.MM.yyyy'
                                        )}
                                        )
                                    </p>
                                </h2>
                                <Container className='gap-10 px-6 items-center'>
                                    <div className='flex flex-col px-4'>
                                        <span className='text-5xl'>
                                            {convertKelvinToCelsius(
                                                firstData?.main?.temp ?? 0
                                            )}
                                            °
                                        </span>
                                        <p className='text-xs space-x-1 whitespace-nowrap'>
                                            <span>Feels like</span>
                                            <span>
                                                {convertKelvinToCelsius(
                                                    firstData?.main
                                                        .feels_like ?? 0
                                                )}
                                                °
                                            </span>
                                        </p>
                                        <p className='text-xs space-x-2'>
                                            <span>
                                                {convertKelvinToCelsius(
                                                    firstData?.main?.temp_min ??
                                                        0
                                                )}
                                                °↓
                                            </span>
                                            <span>
                                                {convertKelvinToCelsius(
                                                    firstData?.main?.temp_max ??
                                                        0
                                                )}
                                                °↑
                                            </span>
                                        </p>
                                    </div>
                                    <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                                        {data?.list.map((d, i) => (
                                            <div
                                                key={i}
                                                className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'
                                            >
                                                <p className='whitespace-nowrap'>
                                                    {format(
                                                        parseISO(d.dt_txt),
                                                        'h:mm a'
                                                    )}
                                                </p>
                                                <WeatherIcon
                                                    iconName={getDayOrNightIcon(
                                                        d.weather[0].icon,
                                                        d.dt_txt
                                                    )}
                                                />
                                                <p>
                                                    {convertKelvinToCelsius(
                                                        d?.main?.temp ?? 0
                                                    )}
                                                    °
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Container>
                            </div>
                            <div className='flex gap-4'>
                                <Container className='w-fit justify-center flex-col px-4 items-center'>
                                    <p className='capitalize text-center'>
                                        {firstData?.weather[0].description}
                                    </p>
                                    <WeatherIcon
                                        iconName={getDayOrNightIcon(
                                            firstData?.weather[0].icon ?? '',
                                            firstData?.dt_txt ?? ''
                                        )}
                                    />
                                </Container>
                                <Container className='bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto'>
                                    <WeatherDetails
                                        visability={metersToKilometrs(
                                            firstData?.visibility
                                        )}
                                        humidity={`${
                                            firstData?.main?.humidity ?? '-'
                                        }%`}
                                        windSpeed={convertWindSpeed(
                                            firstData?.wind?.speed
                                        )}
                                        airPressure={`${
                                            firstData?.main?.pressure ?? '-'
                                        } hPa`}
                                        sunrise={
                                            data?.city?.sunrise
                                                ? format(
                                                      fromUnixTime(
                                                          data.city.sunrise
                                                      ),
                                                      'H:mm'
                                                  )
                                                : '-'
                                        }
                                        sunset={
                                            data?.city?.sunset
                                                ? format(
                                                      fromUnixTime(
                                                          data.city.sunset
                                                      ),
                                                      'H:mm'
                                                  )
                                                : '-'
                                        }
                                    />
                                </Container>
                            </div>
                        </section>
                        <section className='flex w-full flex-col gap-4'>
                            <p className='text-2xl'>Forecast (7 days)</p>
                            {firstDataForEachDate.map((d, i) => (
                                <ForecastWeatherDetail
                                    key={i}
                                    weatherIcon={d?.weather[0].icon ?? '01d'}
                                    date={format(
                                        parseISO(d?.dt_txt ?? ''),
                                        'dd.MM'
                                    )}
                                    day={format(
                                        parseISO(d?.dt_txt ?? ''),
                                        'EEEE'
                                    )}
                                    temp={d?.main.temp ?? 0}
                                    feels_like={d?.main.feels_like ?? 0}
                                    description={
                                        d?.weather[0].description ?? ''
                                    }
                                    visability={`${metersToKilometrs(
                                        d?.visibility ?? 0
                                    )}`}
                                    humidity={`${d?.main.humidity} %`}
                                    windSpeed={`${convertWindSpeed(
                                        d?.wind.speed ?? 0
                                    )}`}
                                    airPressure={`${d?.main.pressure} hPa`}
                                    sunrise={
                                        data?.city?.sunrise
                                            ? format(
                                                  fromUnixTime(
                                                      data.city.sunrise
                                                  ),
                                                  'H:mm'
                                              )
                                            : '-'
                                    }
                                    sunset={
                                        data?.city?.sunrise
                                            ? format(
                                                  fromUnixTime(
                                                      data.city.sunset
                                                  ),
                                                  'H:mm'
                                              )
                                            : '-'
                                    }
                                />
                            ))}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export const Skeleton = () => {
    return (
        <div className='flex flex-col gap-5 mt-[60px]'>
            <div className='bg-gray-200 w-full rounded-xl animate-pulse h-[164px]'></div>
            <div className='bg-gray-200 w-full rounded-xl animate-pulse h-[164px]'></div>
            <div className='bg-gray-200 w-full rounded-xl animate-pulse h-[164px] mt-[50px]'></div>
        </div>
    );
};
