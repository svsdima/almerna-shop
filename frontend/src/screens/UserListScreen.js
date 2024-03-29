import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<div className='user-list'>
			<div className='container'>
				<h1 className='title'>Users</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message>${error}</Message>
				) : (
					<table className='user-table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Admin</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i className='fas fa-check' style={{ color: 'green' }} />
										) : (
											<i className='fas fa-times' style={{ color: 'red' }} />
										)}
									</td>
									<td>
										<Link to={`/admin/user/${user._id}/edit`}>
											<button className='btn btn-edit'>
												<i className='fas fa-edit' style={{ color: 'white' }} />
											</button>
										</Link>
									</td>
									<td>
										<button className='btn btn-remove' onClick={() => deleteHandler(user._id)}>
											<i className='fas fa-trash' style={{ color: 'white' }} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default UserListScreen;
