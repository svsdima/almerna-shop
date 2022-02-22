import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
// Swiper
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message>{error}</Message>
	) : (
		<Swiper
			modules={[Scrollbar, Pagination, Navigation]}
			spaceBetween={50}
			slidesPerView={1}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true, hide: true }}
			className='product-carousel'
		>
			{products.map((product) => {
				console.log(product);
				return (
					<SwiperSlide key={product._id} className='product-carousel-slide'>
						<Link to={`/product/${product._id}`}>
							<div className='product-carousel-img'>
								<img src={product.mainImage} alt={product.name} />\
							</div>
							<h2 className='product-carousel-title'>
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
