import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
	const { meta } = useLoaderData();
	const { pageCount, page } = meta.pagination;
	// using Array.from to set up our page number
	const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	const handlePageChange = pageNumber => {
		const searchParams = new URLSearchParams(search); // get the search params
		searchParams.set('page', pageNumber); // add the page number to the search params
		navigate(`${pathname}?${searchParams.toString()}`); // navigate to the new page
	};

	if (pageCount < 2) return null; // this will hide the pagination if there is only one page

	return (
		<div className="mt-16 flex justify-end">
			<div className="join">
				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let prevPage = page - 1;
						if (prevPage < 1) prevPage = pageCount;
						handlePageChange(prevPage);
					}}>
					Prev
				</button>
				{pages.map(pageNumber => {
					return (
						<button
							key={pageNumber}
							onClick={() => handlePageChange(pageNumber)}
							className={`btn btn-xs sm:btn-md border-none join-item ${
								pageNumber === page ? 'bg-base-300 border-base-300' : ''
							}`}>
							{pageNumber}
						</button>
					);
				})}

				<button
					className="btn btn-xs sm:btn-md join-item"
					onClick={() => {
						let nextPage = page + 1;
						if (nextPage > pageCount) nextPage = 1;
						handlePageChange(nextPage);
					}}>
					Next
				</button>
			</div>
		</div>
	);
};

export default PaginationContainer;
