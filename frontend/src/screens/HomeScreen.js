import React, {useState, useEffect} from 'react';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const {data} = await axios.get('/api/products');

			setProducts(data);
		};

		fetchProducts();
	}, []);

	return (
		<div className='home-screen'>
			<div className='container'>
				<h1 className='title'>
					Shop Our <span>Trending</span> Products
				</h1>
				<div className='product-list'>
					{products.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
