import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, listProducts } from '../actions/productActions';
import Logo from '../components/Logo';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [item, setItem] = useState('');
	const [mainImage, setMainImage] = useState('');
	const [category, setCategory] = useState('');
	const [height, setHeight] = useState(0);
	const [size, setSize] = useState('');
	const [materials, setMaterials] = useState('');
	const [numReviews, setNumReviews] = useState(0);
	const [countInStock, setCountInStock] = useState(0);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		if (!product.name || product._id !== productId) {
			dispatch(listProductDetails(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setDescription(product.description);
			setItem(product.item);
			setMainImage(product.mainImage);
			setCategory(product.category);
			setHeight(product.height);
			setSize(product.size);
			setMaterials(product.materials);
			setNumReviews(product.numReviews);
			setCountInStock(product.countInStock);
		}
	}, [product, dispatch, productId, history]);

	const submitHandler = (e) => {
		e.preventDefault();

		// UPDATE PRODUCT
	};
	return (
		<>
			<Link to='/admin/productlist'>
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
							<h1 className='title'>Edit Product</h1>
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
									<label className='form-label'>Price:</label>
									<input
										type='number'
										placeholder='Enter Price'
										value={price}
										className='form-input'
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Image:</label>
									<input
										type='text'
										placeholder='Enter Image'
										value={image}
										className='form-input'
										onChange={(e) => setImage(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Description:</label>
									<input
										type='text'
										placeholder='Enter Description'
										value={description}
										className='form-input'
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Item:</label>
									<input
										type='text'
										placeholder='Enter Item'
										value={item}
										className='form-input'
										onChange={(e) => setItem(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Main Image:</label>
									<input
										type='text'
										placeholder='Enter Main Image'
										value={mainImage}
										className='form-input'
										onChange={(e) => setMainImage(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Category:</label>
									<input
										type='text'
										placeholder='Enter Price'
										value={category}
										className='form-input'
										onChange={(e) => setCategory(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Height:</label>
									<input
										type='number'
										placeholder='Enter Height'
										value={height}
										className='form-input'
										onChange={(e) => setHeight(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Size:</label>
									<input
										type='text'
										placeholder='Enter Size'
										value={size}
										className='form-input'
										onChange={(e) => setSize(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Materials:</label>
									<input
										type='text'
										placeholder='Enter Materials'
										value={materials}
										className='form-input'
										onChange={(e) => setMaterials(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Number Reviews:</label>
									<input
										type='number'
										placeholder='Enter Number Reviews'
										value={numReviews}
										className='form-input'
										onChange={(e) => setNumReviews(e.target.value)}
									/>
								</div>
								<div className='form-item'>
									<label className='form-label'>Count In Stock:</label>
									<input
										type='number'
										placeholder='Enter Count In Stock'
										value={countInStock}
										className='form-input'
										onChange={(e) => setCountInStock(e.target.value)}
									/>
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

export default ProductEditScreen;
