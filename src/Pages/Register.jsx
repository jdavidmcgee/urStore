import { FormInput, SubmitBtn } from '../components';
import { Form, Link } from 'react-router-dom';

// ACTION IS USED TO REGISTER A USER. SEE APP.JSX AND actionRegister.js FOR THE ACTION. THIS WAS DONE TO REMOVE THE FAST REFRESH WARNING

const Register = () => {
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
				<h4 className="text-center text-3xl font-bold">Register</h4>
				<FormInput type="text" label="username" name="username" />
				<FormInput type="email" label="email" name="email" />
				<FormInput type="password" label="password" name="password" />
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
