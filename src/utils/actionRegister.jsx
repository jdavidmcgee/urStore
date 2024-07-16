import { customFetch } from './index';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

// this code below is used to register a user
// it uses formData to get the form data from the register form...
// then it sends a post request to the server to register the user

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		const response = await customFetch.post('/auth/local/register', data);
		toast.success('account created successfully');
		return redirect('/login');
	} catch (error) {
		const errorMessage =
			error?.response?.data?.error?.message ||
			'An error occurred - please check credentials';
		toast.error(errorMessage);
		return null;
	}
};
