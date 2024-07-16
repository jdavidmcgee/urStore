import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
	const error = useRouteError();
	console.log(`🙏 ~ file: ErrorElement.jsx:5 ~ ErrorElement ~ error:`, error)

	return <h4 className='font-bold text-4xl'>There was an error...</h4>;
};

export default ErrorElement;
