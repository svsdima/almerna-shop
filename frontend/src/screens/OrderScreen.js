import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		// Calculate Prices
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, []);

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
								{order.shippingAddress.address}, {order.shippingAddress.city},
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
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderScreen;
