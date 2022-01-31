import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading) {
		// Calculate Prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message>{error}</Message>
	) : (
		<div className='order-screen'>
			<div className='container'>
				<h1 className='title'>Order: {order._id}</h1>
				<div className='order-screen-wrapper'>
					<div className='order-screen-left'>
						<div>
							<h2 className='subtitle'>Shipping</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city} ,
								{order.shippingAddress.postalCode}, {order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message>Delivered on {order.deliveredAt}</Message>
							) : (
								<Message>Not Delivered</Message>
							)}
						</div>
						<div>
							<h2 className='subtitle'>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message>Paid on {order.paidAt}</Message>
							) : (
								<Message>Not Paid</Message>
							)}
						</div>
						<div>
							<h2 className='subtitle'>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ul className='order-screen-list'>
									{order.orderItems.map((item, index) => (
										<li key={index} className='order-screen-item'>
											<div className='order-screen-item-img'>
												<img src={item.image} alt={item.name} />
											</div>
											<div className='order-screen-item-title'>
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</div>
											<h3 className='order-screen-item-price'>
												{item.qty} x ${item.price} = ${item.qty * item.price}
											</h3>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					<div className='order-screen-right'>
						<ul className='order-screen-summary'>
							<h2>Order Summary</h2>
							<li>
								<div>Items</div>
								<div>${order.itemsPrice}</div>
							</li>
							<li>
								<div>Shipping</div>
								<div>${order.shippingPrice}</div>
							</li>
							<li>
								<div>Tax</div>
								<div>${order.taxPrice}</div>
							</li>
							<li>
								<div>Total</div>
								<div>${order.totalPrice}</div>
							</li>
							{!order.isPaid && (
								<div>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
									)}
								</div>
							)}
							{loadingDeliver && <Loader />}
							{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
								<button className='btn' type='button' onClick={deliverHandler}>
									Mark As Delivered
								</button>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderScreen;
