import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import Logo from '../components/Logo';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};
	return (
		<section className='login-screen'>
			<div className='container'>
				<div className='login-screen-wrapper'>
					<Logo />
					<h1 className='title'>
						Members <span>please</span> Sign Up
					</h1>
					{message && <Message>{message}</Message>}
					{error && <Message>{error}</Message>}
					{loading && <Loader />}
					<form className='form' onSubmit={submitHandler}>
						<div className='form-item'>
							<label className='form-label'>Name:</label>
							<input
								type='name'
								placeholder='Enter Name'
								value={name}
								className='form-input'
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
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
						<div className='form-item'>
							<label className='form-label'>Confirm password:</label>
							<input
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								className='form-input'
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<button className='btn' type='submit'>
							Register
						</button>
					</form>
					<div className='login-screen-redirect'>
						Have an Account?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterScreen;
