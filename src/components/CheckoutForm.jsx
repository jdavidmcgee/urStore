import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

// ACTION IS USED. SEE APP.JSX AND actionCheckoutForm.js FOR THE ACTION. THIS WAS DONE TO REMOVE THE FAST REFRESH WARNING

const CheckoutForm = () => {
	return (
		<Form method="POST" className="flex flex-col gap-y-4">
			<h4 className="font-medium text-xl capitalize">
				shipping information
			</h4>
			<FormInput label="first name" name="name" type="text" />
			<FormInput label="address" name="address" type="text" />
			<div className="mt-4">
				<SubmitBtn text="place order" />
			</div>
		</Form>
	);
};

export default CheckoutForm;
