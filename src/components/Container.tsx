import { cn } from '@/utils/cn';
import { HTMLProps } from 'react';

export const Container = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cn(
                'w-full bg-white border rounded-xl flex py-4 shadow-sm',
                props.className
            )}
        />
    );
};
