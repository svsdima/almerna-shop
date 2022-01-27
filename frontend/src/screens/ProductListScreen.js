import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/login');
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts());
		}
	}, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<div className='user-list'>
			<div className='container'>
				<div>
					<div>
						<h1 className='title'>Products</h1>
					</div>
					<div>
						<button className='btn' onClick={createProductHandler}>
							<i className='fas fa-plus' style={{ color: 'white' }} /> Create Product
						</button>
					</div>
				</div>
				{loadingDelete && <Loader />}
				{errorDelete && <Message>{errorDelete}</Message>}
				{loadingCreate && <Loader />}
				{errorCreate && <Message>{errorCreate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message>${error}</Message>
				) : (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>COUNT IN STOCK</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.countInStock}</td>
									<td>
										<Link to={`/admin/product/${product._id}/edit`}>
											<button className='btn'>
												<i className='fas fa-edit' style={{ color: 'white' }} />
											</button>
										</Link>
										<button className='btn' onClick={() => deleteHandler(product._id)}>
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

export default ProductListScreen;