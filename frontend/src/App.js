import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/app.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import { closeSearchBox } from './components/SearchBox';
import FavoriteScreen from './screens/FavoriteScreen';
import CatalogScreen from './screens/CatalogScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='main' id='main' onClick={(e) => closeSearchBox(e)}>
				<Route path='/login' component={LoginScreen} />
				<Route path='/order/:id' component={OrderScreen} />
				<Route path='/shipping' component={ShippingScreen} />
				<Route path='/payment' component={PaymentScreen} />
				<Route path='/placeorder' component={PlaceOrderScreen} />
				<Route path='/register' component={RegisterScreen} />
				<Route path='/profile' component={ProfileScreen} />
				<Route path='/product/:id' component={ProductScreen} />
				<Route path='/catalog/' component={CatalogScreen} exact />
				<Route path='/catalog/page/:pageNumber' component={CatalogScreen} />
				<Route path='/cart/:id?' component={CartScreen} />
				<Route path='/favorite/:id?' component={FavoriteScreen} />
				<Route path='/admin/userlist' component={UserListScreen} />
				<Route path='/admin/user/:id/edit' component={UserEditScreen} />
				<Route path='/admin/productlist' component={ProductListScreen} exact />
				<Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
				<Route path='/admin/product/:id/edit' component={ProductEditScreen} />
				<Route path='/admin/orderlist' component={OrderListScreen} />
				<Route path='/search/:keyword' component={CatalogScreen} exact />
				<Route path='/search/:keyword/page/:pageNumber' component={CatalogScreen} />
				<Route path='/' component={HomeScreen} exact />
			</main>
			<Footer />
		</Router>
	);
};

export default App;
