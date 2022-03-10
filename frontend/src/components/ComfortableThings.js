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
const ComfortableThings = () => {
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	};

	return (
		<section className='comfortable'>
			<div className='container'>
				<Logo />
				<h1 className='title'>Almerna – we make things comfortable</h1>
			</div>
			<Swiper
				className='almerna-swiper'
				modules={[Pagination, Autoplay]}
				spaceBetween={10}
				slidesPerView={3}
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
				<SwiperSlide>
					<div className='almerna-swiper-img'>
						<img src='/img/comfortable-things/1.jpg' alt='1' />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='almerna-swiper-img'>
						<img src='/img/comfortable-things/2.jpg' alt='2' />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='almerna-swiper-img'>
						<img src='/img/comfortable-things/3.jpg' alt='3' />
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default ComfortableThings;
