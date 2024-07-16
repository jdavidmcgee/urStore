import { customFetch } from './index';
import { toast } from 'react-toastify';
import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/user/userSlice';


// this code below is used to register a user
// it uses formData to get the form data from the register form...
// then it sends a post request to the server to register the user

export const action = store => async ({request}) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		const response = await customFetch.post('/auth/local', data);
		store.dispatch(loginUser(response.data));
		toast.success('user login successful');
		return redirect('/');
	} catch (error) {
		const errorMessage =
			error?.response?.data?.error?.message ||
			'An error occurred - please check credentials';
		toast.error(errorMessage);
		return null;
	}
};
