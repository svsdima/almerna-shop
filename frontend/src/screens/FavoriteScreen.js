import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import NewLingerine from '../components/NewLingerine';

const FavoriteScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	const dispatch = useDispatch();

	const favorite = useSelector((state) => state.favorite);
	const { favoriteItems } = favorite;

	useEffect(() => {
		if (productId) {
			dispatch(addToFavorite(productId));
		}
	}, [dispatch, productId]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromFavorite(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	console.log(favoriteItems);

	return (
		<section className='cart-screen'>
			<div className='container'>
				{favoriteItems.length === 0 ? (
					<div className='cart-screen-empty'>
						<div className='cart-screen-img'>
							<img src='/img/empty.png' alt="'empty" />
						</div>
						<h2 className='cart-screen-empty-title'>Empty Wishlist</h2>
						<h3 className='cart-screen-empty-subtitle'>У вас нет товара в списке желаемого</h3>
						<Link to='/' className='btn'>
							Return to Shopping
						</Link>
					</div>
				) : (
					<div className='favorite-screen-wrapper'>
						<div className='favorite-screen-items'>
							<h2 className='title'>
								My Wishlist <sup>{favoriteItems.length}</sup>
							</h2>
							<div className='product-list'>
								{favoriteItems.map((product) => (
									<div className='product-item' key={product._id}>
										<NewLingerine product={product} />
										<Link
											to='#'
											className='product-favorite'
											onClick={() => removeFromCartHandler(product.product)}
										>
											<i className='fa fa-heart'></i>
										</Link>
										<div className='product-card'>
											<Link to={`/product/${product.product}`} className='product-img'>
												<img src={product.image} alt={product.name}></img>
											</Link>
										</div>
										<Link to={`/product/${product.product}`} className='product-title'>
											{product.name}
										</Link>
										<div className='product-info'>
											<h4 className='product-price'>${product.price}</h4>
											<Rating value={product.rating} text={`&#8364;{product.numReviews} reviews`} />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default FavoriteScreen;
