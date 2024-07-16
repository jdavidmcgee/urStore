import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
	cartItems: [],
	numItemsInCart: 0,
	cartTotal: 0,
	shipping: 500, // remember we are working with cents! this is $5.00
	tax: 0,
	orderTotal: 0,
};

const taxRate = 0.0825;

const cartSlice = createSlice({
	name: 'cart',
	initialState: defaultState,
	reducers: {
		addItem: (state, action) => {
			console.log(`🙏 ~ file: cartSlice.js:18 ~ action:`, action);

			// let's destructure the product from the action payload
			const { product } = action.payload;
			// let's check if the product is already in the cart
			// we first need to get the item from the cart and make sure it exists
			const item = state.cartItems.find(i => i.cartID === product.cartID);
			// if the item exists, we will increase the amount of the item that is already in the cart.  If it doesn't exist, we will add the product to the cart.  cartItems is an array so we'll use the push method to add the product to the cart.
			if (item) {
				item.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}
			// then we need to update the cart total, the number of items in the cart, the tax, and the order total
			state.numItemsInCart += product.amount;
			state.cartTotal += product.price * product.amount;
			// these lines of code can be refactored to a function
			state.tax = state.cartTotal * taxRate;
			state.orderTotal = state.cartTotal + state.tax + state.shipping;
			// now let's save this to localStorage
			localStorage.setItem('cart', JSON.stringify(state));
			// and let's notify the user that the item was added to the cart
			toast.success('Item added to cart');
		},
		clearCart: state => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {},
		editItem: (state, action) => {},
	},
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
