import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAdress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAdress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<div>
			<CheckoutSteps step1 step2 />
			<h1 className='title'>Shipping</h1>
			<form className='form' onSubmit={submitHandler}>
				<div className='form-item'>
					<label className='form-label'>Address:</label>
					<input
						type='text'
						placeholder='Enter Address'
						value={address}
						className='form-input'
						required
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div className='form-item'>
					<label className='form-label'>City:</label>
					<input
						type='text'
						placeholder='Enter City'
						value={city}
						className='form-input'
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div className='form-item'>
					<label className='form-label'>PostalCode:</label>
					<input
						type='text'
						placeholder='Enter PostalCode'
						value={postalCode}
						className='form-input'
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</div>
				<div className='form-item'>
					<label className='form-label'>Country:</label>
					<input
						type='text'
						placeholder='Country'
						value={country}
						className='form-input'
						onChange={(e) => setCountry(e.target.value)}
					/>
				</div>
				<button className='btn' type='submit'>
					Continue
				</button>
			</form>
		</div>
	);
};

export default ShippingScreen;
