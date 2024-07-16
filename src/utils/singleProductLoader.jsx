import { customFetch } from './index';

const singleProductQuery = id => ({
	queryKey: ['singleProduct', id],
	queryFn: () => customFetch(`/products/${id}`),
});

export const loader =
	queryClient =>
	async ({ params }) => {
		const response = await queryClient.ensureQueryData(
			singleProductQuery(params.id)
		);
		return { product: response.data.data };
	};
