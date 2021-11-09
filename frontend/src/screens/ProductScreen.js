import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({match}) => {
	const [
		{
			_id,
			name,
			images,
			countInStock,
			price,
			rating,
			numReviews,
			colors,
			description,
			height,
			size,
			materials,
		},
		setProduct,
	] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			const {data} = await axios.get(`/api/products/${match.params.id}`);

			setProduct(data);
		};

		fetchProduct();
	}, [match]);

	const toggleActiveClass = (e) => {
		e.target.classList.toggle('active');
		e.target.nextElementSibling.classList.toggle('active');
	};

	return (
		<div className={`product-screen ${_id}`}>
			<div className='container'>
				<div className='product-screen-nav'>
					<Link to='/'>Home</Link> / <Link to='/catalog'>Catalog</Link> /
					<span> Lingerie</span>
				</div>
				<div className='product-screen-wrapper'>
					<div className='product-screen-images'>
						<div className='product-screen-images-list'></div>
						<div className='product-screen-mainImg'>
							{/* <img src={images} alt={name} /> */}
						</div>
					</div>
					<div className='product-screen-info'>
						<div className='product-screen-title'>{name}</div>
						<div className='product-screen-column'>
							<div className='product-screen-price'>${price}</div>
							<Rating value={rating} text={`${numReviews} reviews`} />
						</div>
						<div className='product-screen-subtitle'>Color</div>
						<div className='product-screen-colors'></div>
						<div className='product-screen-subtitle'>
							Status:{' '}
							<span>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
						</div>

						<button className='btn' type='button' disabled={countInStock === 0}>
							Add to bag by ${price}
						</button>
						<div
							className='product-accordion-title'
							onClick={toggleActiveClass}
						>
							Description
						</div>
						<div className='product-accordion-descr'>{description}</div>
						<div className='product-screen-model'>
							Model: Height {height} m, Size: {size}
						</div>
						<div
							className='product-accordion-title'
							onClick={toggleActiveClass}
						>
							Materials
						</div>
						<div className='product-accordion-descr'>{materials}</div>
						<div
							className='product-accordion-title'
							onClick={toggleActiveClass}
						>
							Delivery & Returns
						</div>
						<div className='product-accordion-descr'>
							Вы можете оформить возврат товара в течение 7 дней, не считая дня
							получения заказа. Правила возврата. Для всех заказов с доставкой в
							Москву и Ростов-на-Дону, оформленных с 28 октября по 7 ноября,
							возврат будет для вас бесплатным.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductScreen;
