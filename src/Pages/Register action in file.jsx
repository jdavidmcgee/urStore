import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import {action} from '../utils/actionRegister'

// export const action = async ({ request }) => {
// 	const formData = await request.formData();
// 	const data = Object.fromEntries(formData);
// 	try {
// 		const response = await customFetch.post('/auth/local/register', data);
// 		toast.success('account created successfully');
// 		return redirect('/login');
// 	} catch (error) {
// 		const errorMessage =
// 			error?.response?.data?.error?.message || 'An error occurred - please check credentials';
// 		toast.error(errorMessage);
// 		return null;
// 	}
// };

const Register = () => {
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
				<h4 className="text-center text-3xl font-bold">Register</h4>
				<FormInput
					type="text"
					label="username"
					name="username"
					defaultValue="jamesjdm011 smith"
				/>
				<FormInput
					type="email"
					label="email"
					name="email"
					defaultValue="jamesjdm011@gmail.com"
				/>
				<FormInput
					type="password"
					label="password"
					name="password"
					defaultValue="secret"
				/>
				<div className="mt-4">
					<SubmitBtn text="REGISTER" />
				</div>
				<p className="text-center">
					Already a member?
					<Link
						to="/login"
						className="ml-2 link link-hover link-primary capitalize">
						login
					</Link>
				</p>
			</Form>
		</section>
	);
};

export default Register;
