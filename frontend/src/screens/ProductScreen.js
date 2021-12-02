import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import {listProductDetails} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({history, match}) => {
	const [qty, setQty] = useState(0);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const {loading, error, product} = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const toggleActiveClass = (e) => {
		e.target.classList.toggle('active');
		e.target.nextElementSibling.classList.toggle('active');
	};

	return (
		<div className={`product-screen ${product._id}`}>
			<div className='container'>
				<div className='product-screen-nav'>
					<Link to='/'>Home</Link> / <Link to='/catalog'>Catalog</Link> /<span> Lingerie</span>
				</div>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<div className='product-screen-wrapper'>
						<div className='product-screen-images'>
							<div className='product-screen-images-list'></div>
							<div className='product-screen-mainImg'>
								<img src={product.images} alt={product.name} />
							</div>
						</div>
						<div className='product-screen-info'>
							<div className='product-screen-title'>{product.name}</div>
							<div className='product-screen-column'>
								<div className='product-screen-price'>${product.price}</div>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} />
							</div>
							<div className='product-screen-subtitle'>Color</div>
							<div className='product-screen-colors'></div>
							<div className='product-screen-column'>
								<div className='product-screen-subtitle'>
									Status: <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
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
							<button
								className='btn'
								type='button'
								disabled={product.countInStock === 0}
								onClick={addToCartHandler}
							>
								Add to bag by ${product.price}
							</button>
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
								Вы можете оформить возврат товара в течение 7 дней, не считая дня получения заказа.
								Правила возврата. Для всех заказов с доставкой в Москву и Ростов-на-Дону,
								оформленных с 28 октября по 7 ноября, возврат будет для вас бесплатным.
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductScreen;
