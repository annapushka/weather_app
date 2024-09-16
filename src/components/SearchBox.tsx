import { IoSearch } from 'react-icons/io5';

interface SearchBoxProps {}

export const SearchBox = (props: SearchBoxProps) => {
    const {} = props;

    return (
        <form className='flex relative items-center justify-center h-10'>
            <input type='text' />
            <button>
                <IoSearch />
            </button>
        </form>
    );
};
