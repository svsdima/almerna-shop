import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

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

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
				dispatch(listMyOrders());
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
		<section className='profile-screen'>
			<div className='container'>
				<Logo />
				<div className='profile-screen-wrapper'>
					<div className='profile-screen-left'>
						<h2 className='subtitle'>My Details</h2>
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
						<div className='profile-screen-redirect'>
							{/* Have an Account?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link> */}
						</div>
					</div>
					<div className='profile-screen-right'>
						<h2 className='subtitle'>My Orders</h2>
						{loadingOrders ? (
							<Loader />
						) : errorOrders ? (
							<Message>{errorOrders}</Message>
						) : (
							<table>
								<thead>
									<tr>
										<th>ID</th>
										<th>DATE</th>
										<th>TOTAL</th>
										<th>PAID</th>
										<th>DELIVERED</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order._id}>
											<td>{order.createdAt.substring(0, 10)}</td>
											<td>{order.totalPrice}</td>
											<td>
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<i className='fas fa-times' style={{ color: 'red' }}></i>
												)}
											</td>
											<td>
												{order.isDelivered ? (
													order.deliveredAt.substring(0, 10)
												) : (
													<i className='fas fa-times' style={{ color: 'red' }}></i>
												)}
											</td>
											<td>
												<Link to={`/order/${order._id}`}>
													<button className='btn' type='button'>
														Details
													</button>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileScreen;
