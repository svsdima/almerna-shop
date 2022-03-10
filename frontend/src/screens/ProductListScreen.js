import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

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
			dispatch(listProducts('', pageNumber));
		}
	}, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

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
					<div className='btn-create'>
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
					<>
						<table className='product-table'>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Price</th>
									<th>Category</th>
									<th>Count In Stock</th>
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
												<button className='btn btn-edit'>
													<i className='fas fa-edit' style={{ color: 'white' }} />
												</button>
											</Link>
										</td>
										<td>
											<button className='btn btn-remove' onClick={() => deleteHandler(product._id)}>
												<i className='fas fa-trash' style={{ color: 'white' }} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Paginate pages={pages} page={page} isAdmin={true} />
					</>
				)}
			</div>
		</div>
	);
};

export default ProductListScreen;
