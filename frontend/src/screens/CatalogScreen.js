import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';
import NewLingerine from '../components/NewLingerine';
import Rating from '../components/Rating';

const CatalogScreen = ({ history, match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	const addToFavoriteHandler = () => {
		history.push(`/favorite/${match.params.id}`);
	};
	return (
		<section>
			<div className='container'>
				<Meta />
				{keyword && (
					<Link to='/' className='btn'>
						Go Back
					</Link>
				)}
				<h1 className='title'>Bras</h1>
				<h2 className='subtitle'>
					You're spoiled for choice with our wide range of bras, meticulously made to fit, flatter
					and fascinate.{' '}
				</h2>
				<Meta title={'Catalog'} />
				{keyword && (
					<Link to='/' className='btn'>
						Go Back
					</Link>
				)}
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

export default CatalogScreen;
