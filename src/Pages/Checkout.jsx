import { useSelector } from 'react-redux';
import { CheckoutForm, SectionTitle, CartTotals } from '../components';

// WE HAVE A LOADER FUNCTION THAT CHECKS IF THE USER IS LOGGED IN BEFORE THEY CAN ACCESS THE CHECKOUT PAGE

const Checkout = () => {
	const cartTotal = useSelector(state => state.cartState.cartTotal);
	// alternative:
	// const cartItems = useSelector(store => store.cartState.CartTotal);

	if (cartTotal === 0) {
		return <SectionTitle text="Your cart is empty" />;
	}
	return (
		<>
			<SectionTitle text="place your order" />
			<div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
				<CheckoutForm />
				<CartTotals />
			</div>
		</>
	);
};

export default Checkout;
