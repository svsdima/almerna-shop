import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	return (
		pages > 1 && (
			<div className='paginate'>
				{[...Array(pages).keys()].map((x) => {
					if (x + 1 === page) {
						return (
							<Link
								className='paginate-item active'
								key={x + 1}
								to={
									!isAdmin
										? keyword
											? `/catalog/search/${keyword}/page/${x + 1}`
											: `/catalog/page/${x + 1}`
										: `/admin/productlist/${x + 1}`
								}
							>
								<span>{x + 1}</span>
							</Link>
						);
					} else {
						return (
							<Link
								className='paginate-item'
								key={x + 1}
								to={
									!isAdmin
										? keyword
											? `/search/${keyword}/page/${x + 1}`
											: `/catalog/page/${x + 1}`
										: `/admin/productlist/${x + 1}`
								}
								onClick={(e) => {
									console.log('active');
									console.log(x);
								}}
							>
								<span>{x + 1}</span>
							</Link>
						);
					}
				})}
			</div>
		)
	);
};

export default Paginate;
