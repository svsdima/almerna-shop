import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<ul className='checkout-steps container'>
			<li>{step1 ? <Link to='/login'>Sign In</Link> : <span disabled>Sign In</span>}</li>
			<li>{step2 ? <Link to='/shipping'>Shipping</Link> : <span disabled>Shipping</span>}</li>
			<li>{step3 ? <Link to='/payment'>Payment</Link> : <span disabled>Payment</span>}</li>
			<li>
				{step4 ? <Link to='/placeorder'>Place Order</Link> : <span disabled>Place Order</span>}
			</li>
		</ul>
	);
};

export default CheckoutSteps;
