import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Logo from '../components/Logo';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<section className='login-screen'>
			<div className='container'>
				<div className='login-screen-wrapper'>
					<Logo />
					<h1 className='title'>My Details</h1>
					{message && <Message>{message}</Message>}
					{error && <Message>{error}</Message>}
					{success && <div className='message green'>Profile Updated</div>}
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
							Save Details
						</button>
					</form>
					<div className='login-screen-redirect'>
						{/* Have an Account?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileScreen;
