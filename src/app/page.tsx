/** @format */
'use client';

import { Navbar } from '@/components/Navbar';
import { useQuery } from 'react-query';

const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`;

export default function Home() {
    const { isLoading, data } = useQuery('repoData', () =>
        fetch(WEATHER_URL).then((res) => res.json())
    );
    console.log({ data });

    if (isLoading) return 'Loading...';

    return (
        <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
            <Navbar />
        </div>
    );
}
