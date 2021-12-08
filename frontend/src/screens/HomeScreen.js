import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProducts} from '../actions/productActions';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const {loading, error, products} = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<section className='home-screen'>
			<div className='container'>
				<h1 className='title'>
					Shop Our <span>Trending</span> Products
				</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<div className='product-list'>
						{products.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default HomeScreen;
