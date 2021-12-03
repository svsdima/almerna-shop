import axios from 'axios';
import {CART_ADD_ITEM} from '../constants/cartConstants';

export const addToCart = (id, qty, color, bandSize) => async (dispatch, getState) => {
	const {data} = await axios.get(`/api/products/${id}`);

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

	localStorage.setItem('cartItemsAlmerna', JSON.stringify(getState().cart.cartItems));
};
