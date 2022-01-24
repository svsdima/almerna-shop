import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	// Calculate Prices
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		// eslint-disable-next-line
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<div className='place-order-screen'>
			<div className='container'>
				<CheckoutSteps step1 step2 step3 step4 />
				<div className='place-order-screen-wrapper'>
					<div className='place-order-screen-left'>
						<div>
							<h2 className='subtitle'>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city},
								{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
							</p>
						</div>
						<div>
							<h2 className='subtitle'>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</p>
						</div>
						<div>
							<h2 className='subtitle'>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ul className='place-order-screen-list'>
									{cart.cartItems.map((item, index) => (
										<li key={index} className='place-order-screen-item'>
											<div className='place-order-screen-item-img'>
												<img src={item.image} alt={item.name} />
											</div>
											<div className='place-order-screen-item-title'>
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</div>
											<h3 className='place-order-screen-item-price'>
												{item.qty} x ${item.price} = ${item.qty * item.price}
											</h3>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					<div className='place-order-screen-right'>
						<ul className='place-order-screen-summary'>
							<h2>Order Summary</h2>
							<li>
								<div>Items</div>
								<div>${cart.itemsPrice}</div>
							</li>
							<li>
								<div>Shipping</div>
								<div>${cart.shippingPrice}</div>
							</li>
							<li>
								<div>Tax</div>
								<div>${cart.taxPrice}</div>
							</li>
							<li>
								<div>Total</div>
								<div>${cart.totalPrice}</div>
							</li>
							<div>{error && <Message>{error}</Message>}</div>
							<button
								className='btn'
								type='button'
								disabled={cart.cartItems === 0}
								onClick={placeOrderHandler}
							>
								Place Order
							</button>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderScreen;
