import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link to='/' className='logo'>
			<img src='/img/logo-2.png' alt='logo' />
		</Link>
	);
};

export default Logo;
