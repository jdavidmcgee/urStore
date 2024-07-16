import { customFetch } from './index';
import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { parse } from 'postcss';

const ordersQuery = (params, user) => {
	return {
		queryKey: [
			'orders',
			user.username,
			params.page ? parseInt(params.page) : 1,
		],
		queryFn: () =>
			customFetch.get('/orders', {
				params,
				headers: { Authorization: `Bearer ${user.token}` },
			}),
	};
};

// this function is used to fetch the orders from the server
export const loader =
	(store, queryClient) =>
	async ({ request }) => {
		const user = store.getState().userState.user;
		if (!user) {
			toast.warn('Please login to view orders');
			return redirect('/login');
		}
		const params = Object.fromEntries([
			...new URL(request.url).searchParams.entries(),
		]); // this will be used for pagination
		try {
			const response = await queryClient.ensureQueryData(
				ordersQuery(params, user)
			);
			return { orders: response.data.data, meta: response.data.meta };
		} catch (error) {
			console.log(error);
			const errorMessage =
				error?.response?.data?.error?.message ||
				'An error occurred placing your oder';
			toast.error(errorMessage);
			if (error?.response?.status === 401) return redirect('/login');
			if (error?.response?.status === 403) return redirect('/login');
			return null;
		}
	};
