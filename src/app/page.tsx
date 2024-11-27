/** @format */
'use client';

import { Navbar } from '@/components/Navbar';
import axios from 'axios';
import { useQuery } from 'react-query';
import { WeatherResponse } from './types';
import { format, parseISO } from 'date-fns';

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
                        </h2>
                        <div></div>
                    </div>
                </section>
                <section></section>
            </main>
        </div>
    );
}
