import { useState } from "react";

interface SearchProps {
	label: string;
	onSubmit?: (searchValue: string) => void;
	values?: any[];
	setValues?: React.Dispatch<React.SetStateAction<string>>;
	buttonLabel?: string;
	placeHolder?: string;
	className?: string;
	onSearchHandlerEvent?: () => void;
}
function Search({
	label,
	onSubmit,
	values,
	setValues,
	buttonLabel = "Search",
	placeHolder = "Search Elements...",
	className = `flex items-center`,
	onSearchHandlerEvent,
}: SearchProps) {
	const [searchValue, setSearchValue] = useState('');
	const onSubmitEventHandler = () => {
		if (onSubmit) {
			setSearchValue('');
			onSubmit(searchValue)
		}
	};

	const inputSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event?.target?.value;
		setSearchValue(inputValue);
	};

	return (
		<div className={className} >
			<div className='relative w-full'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<svg
						aria-hidden='true'
						className='w-5 h-5 text-gray-500'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fill-rule='evenodd'
							d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
							clip-rule='evenodd'></path>
					</svg>
				</div>
				<input
					type='text'
					id='simple-search'
					className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 '
					placeholder={placeHolder}
					value={searchValue}
					onChange={inputSearchHandler}
				/>
			</div>
			<button
				onClick={onSubmitEventHandler}
				type='button'
				className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'>
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
				</svg>
				<span className='sr-only'>{buttonLabel}</span>
			</button>
		</div>
	);
}

export default Search;
