import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductDetails, createReviewProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';
import { removeFromFavorite } from '../actions/cartActions';
import ProductDetails from '../components/ProductDetails';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [color, setColor] = useState('');
	const [bandSize, setBandSize] = useState('');
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const { error: errorProductReview, success: successProductReview } = productCreateReview;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted!');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}

		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}?size=${bandSize}?color=${color}`);
	};

	const addToFavoriteHandler = () => {
		history.push(`/favorite/${match.params.id}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			createReviewProduct(match.params.id, {
				rating,
				comment,
			})
		);
	};

	const toggleActiveClass = (e) => {
		e.target.classList.toggle('active');
		e.target.nextElementSibling.classList.toggle('active');
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromFavorite(id));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<section className={`product-screen`}>
					<div className='container'>
						<Meta title={product.name} />
						<div className='product-screen-nav'>
							<Link to='/'>Home</Link> / <Link to='/catalog'>Catalog</Link> /<span> Lingerie</span>
						</div>
						<div key={product._id}>
							<div className='product-screen-wrapper'>
								<div className='product-screen-up'>
									<div className='product-screen-images'>
										{/* <div className='product-screen-images-list'></div> */}
										<div className='product-screen-mainImg'>
											<img src={product.mainImage} alt={product.name} />
										</div>
									</div>
									<div className='product-screen-info'>
										<div className='product-screen-title'>{product.name}</div>
										<div className='product-screen-column'>
											<div className='product-screen-prices'>
												<span className='product-screen-price'>
													&#8364;{product.price ? product.price.toFixed(2) : ''}
												</span>
												<span className='product-screen-old-price'>
													&#8364;{product.oldPrice ? product.oldPrice.toFixed(2) : ''}
												</span>
											</div>
											<Rating value={product.rating} text={`${product.numReviews} reviews`} />
										</div>
										<div className='product-screen-subtitle'>
											Color: <span>{color === '' ? 'Select color' : color}</span>
										</div>
										<div className='product-screen-colors'>
											{product.colors
												? product.colors.map((color) => (
														<div
															className='product-screen-color'
															style={{ backgroundColor: `${color}` }}
															value={color}
															onClick={() => setColor(String(color))}
															key={color}
														></div>
												  ))
												: ''}
										</div>
										<div className='product-screen-column'>
											<div className='product-screen-subtitle'>
												Band Size: <span>{bandSize === '' ? 'Select size' : bandSize}</span>
											</div>
											<Link className='product-screen-guide' to='#'>
												Size Guide
											</Link>
										</div>

										<div className='product-screen-band-sizes'>
											{product.bandSizes
												? product.bandSizes.map((Size) => (
														<button
															className='product-screen-band-size'
															value={bandSize}
															disabled={Size.countInStock === false}
															onClick={() => setBandSize(Number(Size.size))}
															key={Size.size}
														>
															<span>{Size.size}</span>
														</button>
												  ))
												: ''}
										</div>
										<div className='product-screen-column'>
											<div className='product-screen-subtitle'>
												Status:{' '}
												<span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
											</div>
											{product.countInStock > 0 && (
												<select
													className='product-screen-qty'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											)}
										</div>
										<div className='product-screen-buttons'>
											<button
												className='btn'
												type='button'
												disabled={product.countInStock === 0 || color === '' || bandSize === ''}
												onClick={addToCartHandler}
											>
												Add to bag by &#8364;{(product.price * qty).toFixed(2)}
											</button>
											<button
												className='product-screen-favorite'
												onClick={addToFavoriteHandler}
												id='btn-favorite'
												onChange={(e) => console.log(e.target)}
											>
												<i className='fa fa-heart'></i>
											</button>
										</div>
										<div className='product-screen-delivery'>
											Доставка 1-2 дня <Link to='#'>Изменить регион</Link>
										</div>
										<div className='product-screen-payment'>
											<div className='product-screen-payment-img'>
												<img src='/img/payment/paypal.png' alt='paypal' />
											</div>
											<div className='product-screen-payment-img'>
												<img src='/img/payment/visa.png' alt='visa' />
											</div>
											<div className='product-screen-payment-img'>
												<img src='/img/payment/mastercard.png' alt='mastercard' />
											</div>
											<div className='product-screen-payment-img'>
												<img src='/img/payment/klarna.png' alt='klarna' />
											</div>
											<div className='product-screen-payment-img'>
												<img src='/img/payment/vorkasse.png' alt='vorkasse' />
											</div>
										</div>
									</div>
								</div>
								<div className='product-screen-down'>
									<div className='product-accordion-title' onClick={toggleActiveClass}>
										Description
									</div>
									<div className='product-accordion-descr'>{product.description}</div>
									<div className='product-screen-model'>
										Model: Height {product.height} m, Size: {product.size}
									</div>
									<div className='product-accordion-title' onClick={toggleActiveClass}>
										Materials
									</div>
									<div className='product-accordion-descr'>{product.materials}</div>
									<div className='product-accordion-title' onClick={toggleActiveClass}>
										Delivery & Returns
									</div>
									<div className='product-accordion-descr'>
										Вы можете оформить возврат товара в течение 7 дней, не считая дня получения
										заказа. Правила возврата. Для всех заказов с доставкой в Москву и
										Ростов-на-Дону, оформленных с 28 октября по 7 ноября, возврат будет для вас
										бесплатным.
									</div>
								</div>
								<div className='product-screen-comments'>
									<h2 className='subtitle'>Reviews</h2>
									{product.reviews.length === 0 && <Message>No Reviews</Message>}
									<ul>
										{product.reviews.map((review) => (
											<li key={review._id}>
												<strong>{review.name}</strong>
												<Rating value={review.rating} />
												<p>{review.createdAt.substring(0, 10)}</p>
												<p>{review.comment}</p>
											</li>
										))}
									</ul>
									<div>
										<h2 className='subtitle'>Write a Customer Review</h2>
										{errorProductReview && <Message>{errorProductReview}</Message>}
										{userInfo ? (
											<form onSubmit={submitHandler}>
												<div id='rating'>
													<label>Rating</label>
													<select value={rating} onChange={(e) => setRating(e.target.value)}>
														<option value=''>Select...</option>
														<option value='1'>1 - Poor</option>
														<option value='2'>2 - Fair</option>
														<option value='3'>3 - Good</option>
														<option value='4'>4 - Vary Good</option>
														<option value='5'>5 - Excellent</option>
													</select>
												</div>
												<div id='comment'>
													<label>Comment</label>
													<textarea
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													></textarea>
												</div>
												<button className='btn' type='submit'>
													Submit
												</button>
											</form>
										) : (
											<Message>
												Please <Link to='/login'>Sign In</Link> to write a review
											</Message>
										)}
									</div>
								</div>
							</div>
						</div>
						{/* <ProductDetails /> */}
					</div>
				</section>
			)}
		</>
	);
};

export default ProductScreen;
