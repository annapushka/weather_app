/** @format */
'use client';

import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import { SearchBox } from './SearchBox';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { SuggetionBox } from './SuggetionBox';

export const CITY_URL = (value: string) =>
    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

interface NavbarProps {}

export const Navbar = (props: NavbarProps) => {
    const {} = props;
    const [city, setSity] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearch = async (value: string) => {
        setSity(value);
        if (value.length > 2) {
            try {
                const response = await axios.get(CITY_URL(value));
                const suggestions = response.data.list.map(
                    (item: { name: string }) => item.name
                );
                setSuggestions(suggestions);
                setError('');
                setShowSuggestions(true);
            } catch (error) {
                setShowSuggestions(false);
                setSuggestions([]);
            }
        } else {
            setShowSuggestions(false);
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSity(suggestion);
        setShowSuggestions(false);
    };

    const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (suggestions.length === 0) {
            setError('No suggestions found');
        } else {
            setError('');
            setShowSuggestions(false);
        }
    };

    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto'>
                <p className='flex items-center justify-center gap-2'>
                    <h2 className='text-gray-500 text-3xl'>Weather</h2>
                    <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
                </p>
                <section className='flex gap-2 items-center'>
                    <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
                    <MdOutlineLocationOn className='text-3xl' />
                    <p className='text-slate-900/80 text-sm'>Location</p>
                    <div className='relative'>
                        <SearchBox
                            value={city}
                            onChange={(e) => handleSearch(e.target.value)}
                            onSubmit={handleSubmitSearch}
                        />
                        <SuggetionBox
                            {...{
                                showSuggestions,
                                suggestions,
                                handleSuggestionClick,
                                error,
                            }}
                        />
                    </div>
                </section>
            </div>
        </nav>
    );
};
