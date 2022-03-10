import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import Product from './Product';
// // Swiper
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
// // swiper bundle styles
// import 'swiper/swiper-bundle.min.css';

// // swiper core styles
// import 'swiper/swiper.min.css';

// // modules styles
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';

//
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/effect-flip/effect-flip.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

const ProductTop = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	};

	return (
		<section className='product-top'>
			<div className='container'>
				<Swiper
					className='almerna-swiper'
					modules={[Pagination, Autoplay]}
					spaceBetween={10}
					slidesPerView={1}
					autoplay={{
						delay: 1500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					loop={true}
					speed={2000}
					pagination={{ clickable: true }}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
							autoplay: {
								disableOnInteraction: true,
							},
						},
						769: {
							slidesPerView: 2,
							spaceBetween: 10,
							autoplay: {
								disableOnInteraction: true,
							},
						},
						1025: {
							slidesPerView: 3,
							autoplay: {
								disableOnInteraction: false,
							},
						},
					}}
					direction={'horizontal'}
				>
					{products.map((product) => {
						return (
							<SwiperSlide>
								<Product key={product._id} product={product} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</section>
	);
};

export default ProductTop;
