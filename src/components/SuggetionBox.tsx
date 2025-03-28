interface SuggetionBoxProps {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (value: string) => void;
    error: string;
}

export const SuggetionBox = ({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error,
}: SuggetionBoxProps) => {
    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
                    {error && suggestions.length < 1 && (
                        <li className='text-red-500 p-1'>{error}</li>
                    )}
                    {suggestions.map((suggestion, i) => (
                        <li
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className='cursor-pointer p-1 rounded hover:bg-gray-200'
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
