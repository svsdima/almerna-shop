import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts);
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message>{error}</Message>
	) : (
		<Swiper spaceBetween={50} slidesPerView={3}>
			{products.map((product) => {
				console.log(product);
				return (
					<SwiperSlide key={product._id}>
						<Link to={`/product/${product._id}`}>
							<img src={product.mainImage} alt={product.name} />\
							<h2>
								{product.name} (${product.price})
							</h2>
						</Link>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default ProductCarousel;
