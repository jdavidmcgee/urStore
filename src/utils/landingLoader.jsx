import { customFetch } from './index';

const url = '/products?featured=true';

// implementing react-query's loader function
// this code is refactored from the non-react-query version
const featuredProductsQuery = {
	queryKey: ['featuredProducts'],
	queryFn: () => customFetch(url),
}

export const loader = queryClient => async () => {
	const response = await queryClient.ensureQueryData(featuredProductsQuery);
	const products = response.data.data;
	return { products }; // if we don't return something we WILL get an error!
};
