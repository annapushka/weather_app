/** @format */
'use client';

import { Navbar } from '@/components/Navbar';
import axios from 'axios';
import { useQuery } from 'react-query';
import { WeatherResponse } from './types';
import { format, parseISO } from 'date-fns';
import { Container } from '@/components/Container';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`;

export default function Home() {
    const { isLoading, data } = useQuery<WeatherResponse>(
        'repoData',
        async () => {
            const { data } = await axios.get(WEATHER_URL);
            return data;
        }
    );

    const firstData = data?.list?.[0];

    if (isLoading)
        return (
            <div className='flex items-center min-h-screen justify-center'>
                <p className='animate-bounce'>Loading...</p>
            </div>
        );

    return (
        <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
            <Navbar />
            <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
                <section>
                    <div>
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
                                        firstData?.main?.temp
                                    )}
                                    °
                                </span>
                                <p className='text-xs space-x-1 whitespace-nowrap'></p>
                            </div>
                        </Container>
                    </div>
                </section>
                <section></section>
            </main>
        </div>
    );
}
