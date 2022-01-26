import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import Logo from '../components/Logo';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);

	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, userId]);

	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<Link to='/admin/userlist'>
				<button className='btn' type='submit'>
					Go back
				</button>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<section className='login-screen'>
					<div className='container'>
						<div className='login-screen-wrapper'>
							<Logo />
							<h1 className='title'>Edit User</h1>
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
								<div className='ckeckbox'>
									<input
										type='checkbox'
										label='Is Admin'
										checked={isAdmin}
										className='checkbox'
										onChange={(e) => setIsAdmin(e.target.checked)}
									/>
									<label className='checkbox-label'>Is Admin</label>
								</div>
								<button className='btn' type='submit'>
									Update
								</button>
							</form>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default UserEditScreen;
