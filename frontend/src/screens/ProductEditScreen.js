import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import Logo from '../components/Logo';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [images, setImages] = useState('');
	const [description, setDescription] = useState('');
	const [item, setItem] = useState('');
	const [mainImage, setMainImage] = useState('');
	const [category, setCategory] = useState('');
	const [height, setHeight] = useState(0);
	const [size, setSize] = useState('');
	const [materials, setMaterials] = useState('');
	const [numReviews, setNumReviews] = useState(0);
	const [countInStock, setCountInStock] = useState(0);
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImages(product.images);
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
		}
	}, [product, dispatch, productId, history, successUpdate]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/upload', formData, config);

			setMainImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				images,
				description,
				item,
				mainImage,
				category,
				height,
				size,
				materials,
				numReviews,
				countInStock,
			})
		);
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
							{loadingUpdate && <Loader />}
							{errorUpdate && <Message>{errorUpdate}</Message>}
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
										value={images}
										className='form-input'
										onChange={(e) => setImages(e.target.value)}
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
									<label className='form-label'>Choose Image:</label>
									<input type='file' id='image-file' onChange={uploadFileHandler}></input>
									{uploading && <Loader />}
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
