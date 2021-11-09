import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router';
import './styles/app.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Route path='/' component={HomeScreen} exact />
				<Route path='/product/:id' component={ProductScreen} />
			</main>
			<Footer />
		</Router>
	);
};

export default App;
