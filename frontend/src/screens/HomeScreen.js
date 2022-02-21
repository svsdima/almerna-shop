import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<section className='home-screen'>
			<div className='container'>
				{!keyword && <ProductCarousel />}
				<h1 className='title'>
					Shop Our <span>Trending</span> Products
				</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<>
						<div className='product-list'>
							{products.map((product) => (
								<Product key={product._id} product={product} />
							))}
						</div>
						<Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
					</>
				)}
			</div>
		</section>
	);
};

export default HomeScreen;
