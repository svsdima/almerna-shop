import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import Logo from '../components/Logo';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};
	return (
		<section className='login-screen'>
			<div className='container'>
				<div className='login-screen-wrapper'>
					<Logo />
					<h1 className='title'>
						Members <span>please</span> Sign In
					</h1>
					{error && <Message>{error}</Message>}
					{loading && <Loader />}
					<form className='form' onSubmit={submitHandler}>
						<div className='form-item'>
							<label className='form-label'>Email:</label>
							<input
								type='email'
								placeholder='Enter Email'
								value={email}
								className='form-input'
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='form-item'>
							<label className='form-label'>Password:</label>
							<input
								type='password'
								placeholder='Enter Password'
								value={password}
								className='form-input'
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button className='btn' type='submit'>
							Sign In
						</button>
					</form>
					<div className='login-screen-redirect'>
						New Customer?{' '}
						<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginScreen;
