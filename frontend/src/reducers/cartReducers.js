import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_FAVORITE_ADD_ITEM,
	CART_FAVORITE_REMOVE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};

export const favoriteReducer = (state = { favoriteItems: [] }, action) => {
	switch (action.type) {
		case CART_FAVORITE_ADD_ITEM:
			const item = action.payload;

			const existItem = state.favoriteItems.find((x) => x.product === item.product);

			if (existItem) {
				return {
					...state,
					favoriteItems: state.favoriteItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return {
					...state,
					favoriteItems: [...state.favoriteItems, item],
				};
			}
		case CART_FAVORITE_REMOVE_ITEM:
			return {
				...state,
				favoriteItems: state.favoriteItems.filter((x) => x.product !== action.payload),
			};
		default:
			return state;
	}
};
