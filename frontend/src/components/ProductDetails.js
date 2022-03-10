import React from 'react';
import Logo from './Logo';

const ProductDetails = () => {
	return (
		<section className='product-details'>
			<div className='container'>
				<h1 className='product-details-title'>
					<span className='product-details-product'>Product</span> <Logo />{' '}
					<span className='product-details-details'>Details</span>
				</h1>
			</div>
		</section>
	);
};

export default ProductDetails;
