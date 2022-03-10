import React from 'react';
import Logo from './Logo';
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
const GoodLook = () => {
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	};

	return (
		<section className='comfortable'>
			<div className='container'>
				<h1 className='title'>
					Almerna looks <span>good</span> at you
				</h1>
			</div>
			<Swiper
				className='almerna-swiper'
				modules={[Autoplay]}
				spaceBetween={10}
				slidesPerView={4}
				autoplay={{
					delay: 1500,
					disableOnInteraction: false,
				}}
				loop={true}
				speed={2000}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 10,
						centeredSlides: true,
					},
					769: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					1025: {
						slidesPerView: 4,
						centeredSlides: false,
					},
				}}
				direction={'horizontal'}
			>
				<SwiperSlide>
					<img src='/img/good-looks/1.jpg' alt='1' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/img/good-looks/2.jpg' alt='2' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/img/good-looks/3.jpg' alt='3' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='/img/good-looks/4.jpg' alt='4' />
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default GoodLook;
