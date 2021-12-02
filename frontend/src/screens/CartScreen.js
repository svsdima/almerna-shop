import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import {addToCart} from '../actions/cartActions';
import {Link} from 'react-router-dom';

const CartScreen = ({match, location, history}) => {
	const productId = match.params.id;

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const color = location.search;

	console.log(color);

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const {cartItems} = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		console.log('remove');
	};

	return (
		<section className='cart-screen'>
			<div className='container'>
				<div className='cart-screen-wrapper'>
					{cartItems.length === 0 ? (
						<div className='cart-screen-empty'>
							<div className='cart-screen-img'>
								<img src='/img/empty.png' alt="'empty" />
							</div>
							<h2 className='cart-screen-empty-title'>Empty Cart</h2>
							<h3 className='cart-screen-empty-subtitle'>Ваша корзина пока пуста</h3>
							<Link to='/' className='btn'>
								Return to Shopping
							</Link>
						</div>
					) : (
						<>
							<div className='cart-screen-items'>
								<h2>My Cart</h2>
								<div className='cart-screen-items-list'>
									{cartItems.map((item) => (
										<div key={item.product} className='cart-screen-item'>
											<div className='cart-screen-item-img'>
												<img src={item.image} alt={item.name} />
											</div>
											<div className='cart-screen-item-info'>
												<h3 className='cart-screen-item-title'>{item.name}</h3>
												<select
													className='product-screen-qty'
													value={item.qty}
													onChange={(e) =>
														dispatch(addToCart(item.product, Number(e.target.value)))
													}
												>
													{[...Array(item.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</div>
											<div className='cart-screen-item-result'></div>
										</div>
									))}
								</div>
							</div>
							<div className='cart-screen-summary'></div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default CartScreen;
