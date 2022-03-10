import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';
import ProductTop from '../components/ProductTop';
import Perfect from '../components/Perfect';
import WrongBra from '../components/WrongBra';
import Info from '../components/Info';
import ComfortableThings from '../components/ComfortableThings';
import GoodLook from '../components/GoodLook';

const HomeScreen = ({ match }) => {
	const productList = useSelector((state) => state.productList);
	const { loading, error } = productList;

	return (
		<section className='home-screen'>
			<div className='home-screen-top-mobile'>
				<h2 className='home-screen-top-title'>Autumn 2021 Collection</h2>
				<h3 className='home-screen-top-subtitle'>Free Luxury Gift Wrap on orders over £400</h3>
				<div className='home-screen-top-btns'>
					<Link to='/catalog' className='btn'>
						Shop Now
					</Link>
				</div>
				<div className='home-screen-top-img'>
					<img src='/img/new-collection-bg-2.jpg' alt='home-screen-top-background' />
				</div>
			</div>
			<div
				className='home-screen-top'
				style={{ backgroundImage: "url('/img/new-collection-bg.jpg')" }}
			>
				{/* <img src='/img/new-collection-bg.jpg' alt='home-screen-top-background' /> */}
				<div className='container'>
					<div className='home-screen-top-wrapper'>
						<h2 className='home-screen-top-title'>
							Our new <span>summer</span> 2021 Collection
						</h2>
						<h3 className='home-screen-top-subtitle'>Free Luxury Gift Wrap on orders over £400</h3>
						<div className='home-screen-top-btns'>
							<Link to='/catalog' className='btn'>
								Shop Now
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<Meta />
				<h1 className='title'>
					Shop Our <span>Trending</span> Products
				</h1>
				{loading ? <Loader /> : error ? <Message>{error}</Message> : <ProductTop />}
			</div>
			<Perfect />
			<WrongBra />
			<Info />
			<ComfortableThings />
			<GoodLook />
		</section>
	);
};

export default HomeScreen;
