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

// let's get the cart from localStorage
const getCartFromLocalStorage = () => {
	// const cart = localStorage.getItem('cart');
	// if(cart) {
	// 	return JSON.parse(cart);
	// } else {
	// 	return defaultState;
	// }
	return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: getCartFromLocalStorage(),
	reducers: {
		addItem: (state, action) => {
			//console.log(`🙏 ~ file: cartSlice.js:18 ~ action:`, action);

			const { product } = action.payload;
			const item = state.cartItems.find(i => i.cartID === product.cartID);

			if (item) {
				item.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}

			state.numItemsInCart += product.amount;
			state.cartTotal += product.price * product.amount;

			cartSlice.caseReducers.calculateTotals(state);

			toast.success('Item added to cart');
		},
		clearCart: state => {
			localStorage.setItem('cart', JSON.stringify(defaultState));
			return defaultState;
		},
		removeItem: (state, action) => {
			// the action.payload is the cartID
			const { cartID } = action.payload;
			// product is the item we want to remove
			const product = state.cartItems.find(i => i.cartID === cartID);
			// update the state
			state.cartItems = state.cartItems.filter(i => i.cartID !== cartID);
			// let's update the totals:
			state.numItemsInCart -= product.amount;
			state.cartTotal -= product.price * product.amount;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success('Item removed from cart');
		},
		editItem: (state, action) => {
			// to edit an item we need the cartID and the new amount (quantity).  We are editing an item in the cart - so changing the quantity / amount of the item
			const { cartID, amount } = action.payload;
			const item = state.cartItems.find(i => i.cartID === cartID);
			// we'll need to figure out the variation in the amount.  to do this we'll subtract the current amount from the new amount.  the += will add the variation to the amount.
			state.numItemsInCart += amount - item.amount;
			state.cartTotal += item.price * (amount - item.amount); // we'll need to update the cartTotal as well
			item.amount = amount; // this will update the amount of the item in the cart. this needs to come after the cartTotal update.
			// we'll use our calculateTotals function to update the tax and orderTotal
			cartSlice.caseReducers.calculateTotals(state);
			toast.success('cart updated');
		},
		// function to calculate totals
		calculateTotals: state => {
			state.tax = state.cartTotal * taxRate;
			state.orderTotal = state.cartTotal + state.tax + state.shipping;
			localStorage.setItem('cart', JSON.stringify(state));
		},
	},
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
