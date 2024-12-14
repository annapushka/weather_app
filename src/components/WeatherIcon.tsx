import { cn } from '@/utils/cn';
import Image from 'next/image';
import { HTMLProps } from 'react';

export const WeatherIcon = (
    props: HTMLProps<HTMLDivElement> & { iconName: string }
) => {
    return (
        <div className={cn('relative h-20 w-20')} {...props}>
            <Image
                width={100}
                height={100}
                alt='weatherIcon'
                className='absolute h-full w-full'
                src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
            />
        </div>
    );
};
