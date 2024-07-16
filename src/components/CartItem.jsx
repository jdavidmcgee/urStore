/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice, generateAmountOptions } from '../utils';
import { editItem, removeItem } from '../features/cart/cartSlice';

const CartItem = ({ cartItem }) => {
	const dispatch = useDispatch();

	const handleRemoveItemFromTheCart = () => {
		dispatch(removeItem({ cartID }));
	};

	const handleAmountChange = event => {
		dispatch(editItem({ cartID, amount: parseInt(event.target.value) }));
	};

	const { cartID, title, price, image, amount, company, productColor } =
		cartItem;
	return (
		<article
			key={cartID}
			className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
			{/* IMAGE */}
			<img
				src={image}
				alt={title}
				className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
			/>
			{/* INFORMATION */}
			<div className="sm:ml-16 sm:w-48">
				{/* TITLE */}
				<h3 className="capitalize font-md">{title}</h3>
				{/* COMPANY */}
				<h4 className="mt-2 capitalize text-sm text-neutral-content ">
					{company}
				</h4>
				{/* DISPLAY COLOR */}
				<p className="mt-4 text-sm capitalize flex items-center gap-x-2">
					color:
					<span
						className="badge badge-sm"
						style={{ backgroundColor: productColor }}></span>
				</p>
			</div>
			<div className="sm:ml-12">
				{/* QTY IN CART - AMOUNT*/}
				<div className="form-control max-w-xs">
					<label htmlFor="amount" className="label p-0">
						<span className="label-text">Amount</span>
					</label>
					<select
						name="amount"
						id="amount"
						className="mt-2 select select-base select-bordered select-xs"
						value={amount}
                        onChange={handleAmountChange}>
						{generateAmountOptions(amount + 5)}
					</select>
				</div>
				{/* REMOVE */}
				<button className="mt-2 link link-primary link-hover text-sm" onClick={handleRemoveItemFromTheCart}>
					remove
				</button>
			</div>
			{/* PRICE */}
			<p className="mr-8 font-medium sm:ml-auto">{formatPrice(price * amount)}</p>
		</article>
	);
};

export default CartItem;