import React from 'react';

const NewLingerine = ({ product }) => {
	return (
		<>
			{product.new && (
				<div className='product-new'>
					<span>New!</span>
				</div>
			)}
		</>
	);
};

export default NewLingerine;
