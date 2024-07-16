import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';

// this code below is used to register a user
// it uses formData to get the form data from the register form...
// then it sends a post request to the server to register the user

export const action =
	(store, queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const { name, address } = Object.fromEntries(formData);
		const user = store.getState().userState.user;
		const { cartItems, orderTotal, numItemsInCart } =
			store.getState().cartState;

		const info = {
			name,
			address,
			chargeTotal: orderTotal,
			orderTotal: formatPrice(orderTotal),
			cartItems,
			numItemsInCart,
		};

		// we can now set up the post request to the server
		try {
			const response = await customFetch.post(
				'/orders',
				{ data: info },
				{ headers: { Authorization: `Bearer ${user.token}` } }
			);
			queryClient.removeQueries(['orders']);
			store.dispatch(clearCart());
			toast.success('Order placed successfully');
			return redirect('/orders');
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
