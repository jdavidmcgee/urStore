import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';

// ACTION IS USED TO LOGIN A USER. SEE APP.JSX AND actionLogin.js FOR THE ACTION. THIS WAS DONE TO REMOVE THE FAST REFRESH WARNING

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginAsGuestUser = async () => {
		try {
			const response = await customFetch.post('/auth/local', {
				identifier: 'test@test.com',
				password: 'secret',
			});
			dispatch(loginUser(response.data));
			toast.success('welcome guest user');
			navigate('/');
		} catch (error) {
			console.log(error);
			toast.error(
				'A guest user login error occurred - please check credentials'
			);
		}
	};

	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
				<h4 className="text-center text-3xl font-bold">LOGIN</h4>
				<FormInput type="email" label="email" name="identifier" />
				<FormInput type="password" label="password" name="password" />
				<div className="mt-4">
					<SubmitBtn text="LOGIN" />
				</div>
				<button
					type="button"
					className="btn btn-secondary btn-block"
					onClick={loginAsGuestUser}>
					GUEST USER
				</button>
				<p className="text-center">
					Not a member?
					<Link
						to="/register"
						className="ml-2 link link-hover link-primary capitalize">
						Register
					</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;
