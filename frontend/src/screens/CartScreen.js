import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import {addToCart} from '../actions/cartActions';
import {Link} from 'react-router-dom';

const CartScreen = ({match, location, history}) => {
	const productId = match.params.id;

	const qty = location.search ? Number(location.search.split('=')[1].replace(/[^0-9]/g, '')) : 1;

	const bandSize = location.search
		? Number(location.search.split('=')[2].replace(/[^0-9]/g, ''))
		: 0;

	const color = location.search ? location.search.split('=')[3] : '';

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const {cartItems} = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty, color, bandSize));
		}
	}, [dispatch, productId, qty, color, bandSize]);

	const removeFromCartHandler = (id) => {
		console.log('remove');
	};

	const checkoutHandler = () => {
		console.log('checkout');
	};

	return (
		<section className='cart-screen'>
			<div className='container'>
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
					<div className='cart-screen-wrapper'>
						<div className='cart-screen-items'>
							<h2 className='cart-screen-title'>My Cart</h2>
							<div className='cart-screen-items-list'>
								{cartItems.map((item) => (
									<div key={item.product} className='cart-screen-item'>
										<Link to={`/product/${item.product}`} className='cart-screen-item-img'>
											<img src={item.image} alt={item.name} />
										</Link>
										<div className='cart-screen-item-info'>
											<div className='cart-screen-item-descr'>
												<Link to={`/product/${item.product}`} className='cart-screen-item-title'>
													{item.name}
												</Link>
												<h4 className='cart-screen-item-subtitle'>
													<span>Size: {item.bandSize}</span> <span>Color: {item.color}</span>
												</h4>
											</div>
											<select
												className='product-screen-qty'
												value={item.qty}
												onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</div>
										<div className='cart-screen-item-result'>
											<h3 className='cart-screen-item-price'>&#8364;{item.price.toFixed(2)}</h3>
											<Link
												to='#'
												className='cart-screen-item-remove'
												onClick={() => removeFromCartHandler(item.product)}
											>
												Remove
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className='cart-screen-summary'>
							<h2 className='cart-screen-title'>Order Summary</h2>
							<div className='cart-screen-summary-total'>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
							</div>
							<div></div>
							<div className='cart-screen-summary-total'>
								Total{' '}
								<span>
									&#8364;
									{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
								</span>
							</div>
							<button
								className='btn'
								type='button'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Go to Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default CartScreen;
