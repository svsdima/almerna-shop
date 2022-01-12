import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [checked, setChecked] = useState(true);
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<div className='payment-screen'>
			<div className='container'>
				<CheckoutSteps step1 step2 step3 />
				<h1 className='title'>Payment Method</h1>
				<form className='form' onSubmit={submitHandler}>
					<div className='checkbox'>
						<input
							type='radio'
							class='checkbox-input'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label
							htmlFor='formAgreement'
							class='checkbox-label'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
						>
							Paypal or Credit Card
						</label>
					</div>
					{/* <div className='checkbox'>
						<input
							type='radio'
							class='checkbox-input'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label
							htmlFor='formAgreement'
							class='checkbox-label'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
						>
							Stripe
						</label>
					</div> */}
					<button className='btn' type='submit'>
						Continue
					</button>
				</form>
			</div>
		</div>
	);
};

export default PaymentScreen;
