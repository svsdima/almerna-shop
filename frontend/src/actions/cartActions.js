import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_FAVORITE_ADD_ITEM,
	CART_FAVORITE_REMOVE_ITEM,
} from '../constants/cartConstants';

export const addToCart = (id, qty, color, bandSize) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.item,
			size: data.size,
			price: data.price,
			countInStock: data.countInStock,
			qty,
			color,
			bandSize,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const addToFavorite = (id) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_FAVORITE_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			price: data.price,
			image: data.mainImage,
		},
	});

	localStorage.setItem('favoriteItems', JSON.stringify(getState().favorite.favoriteItems));
};

export const removeFromFavorite = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_FAVORITE_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem('favoriteItems', JSON.stringify(getState().favorite.favoriteItems));
};
