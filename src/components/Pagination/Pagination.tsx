/* eslint-disable jsx-a11y/anchor-is-valid */
interface PaginationProps {
	length?: number;
	urlPath?: string;
}
const Pagination = ({ length = 6, urlPath }: PaginationProps) => {
	const DEFAULT_CLASS = 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
	const SELECTED_CLASS = 'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'

	

	return (
		<nav aria-label='Page navigation example'>
			<ul className='inline-flex items-center -space-x-px'>
				{/* LEFTH */}
				<li>
					<a
						href='#'
						className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
						<span className='sr-only'>Previous</span>
						<svg
							aria-hidden='true'
							className='w-5 h-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
								clip-rule='evenodd'></path>
						</svg>
					</a>
				</li>
				{/* NUMBERS */}
				{Array.from({ length: length }).map((item, index) => (
					<li>
						<a
							href={`${urlPath}+/${index}`}
							className={index === 0 ? SELECTED_CLASS : DEFAULT_CLASS}>
							{index + 1}
						</a>
					</li>
				))}

				{/* RIGHT */}
				<li>
					<a
						href='#'
						className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
						<span className='sr-only'>Next</span>
						<svg
							aria-hidden='true'
							className='w-5 h-5'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
								clip-rule='evenodd'></path>
						</svg>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
