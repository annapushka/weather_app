import { Navbar } from '@/components/Navbar';

export default function Home() {
    // https://api.openweathermap.org/data/3.0/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56
    return (
        <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
            <Navbar />
        </div>
    );
}
