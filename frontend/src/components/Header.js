import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { SearchBox } from './SearchBox';

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		document.getElementsByClassName('nav-user-items')[0].classList.remove('active');
	};

	const removeActiveItem = () => {
		document.getElementsByClassName('nav-user-items')[0].classList.remove('active');
	};

	const toggleSearchInput = () => {
		document.getElementById('search').classList.toggle('active');
	};

	const burgerMenu = (e) => {
		const mobileNav = document.getElementById('mobile-nav');
		mobileNav.classList.toggle('active');
	};

	const closeBurgerMenu = (e) => {
		const mobileNav = document.getElementById('mobile-nav');
		const mobileNavs = document.querySelectorAll('#mobile-nav .nav-link');
		mobileNavs.forEach((nav) => {
			if (mobileNav.classList.contains('active') && e.target === nav) {
				mobileNav.classList.remove('active');
			}
		});
	};

	return (
		<header className='header' id='header'>
			<div className='header-wrapper'>
				<Link to='/' className='logo'>
					<img src='/img/logo.png' alt='logo' />
				</Link>
				<ul className='nav' id='menu-nav'>
					<li>
						<Link to='#' className='nav-link'>
							NEW ARRIVALS
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							PLUS SIZE
						</Link>
					</li>
					<li>
						<Link to='/catalog' className='nav-link active'>
							LINGERInE
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							NIGHTWEAR
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							GIFTS
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							COLLECTIONS
						</Link>
					</li>
					{/* </ul> */}
					{/* <ul className='nav'> */}
					<li className='nav-search'>
						<i className='fas fa-search' onClick={toggleSearchInput}></i>
					</li>
					<li>
						<Link to='/favorite' className='nav-link active'>
							<i className='far fa-heart'></i>
						</Link>
					</li>
					{userInfo ? (
						<li className='nav-user' title={userInfo.name} id='username'>
							<div
								className='nav-user-img'
								onClick={(e) =>
									e.target.parentElement.nextElementSibling.classList.toggle('active')
								}
							>
								<img src={userInfo.img} alt={userInfo.name} />
							</div>
							<ul className='nav-user-items'>
								<li className='nav-user-item'>
									<Link to='/profile' onClick={removeActiveItem}>
										<i className='far fa-id-badge'></i>
									</Link>
								</li>
								<li className='nav-user-item'>
									<Link to='/' onClick={logoutHandler}>
										<i className='fas fa-sign-out-alt'></i>
									</Link>
								</li>
								{userInfo && userInfo.isAdmin ? (
									<>
										<li className='nav-user-item'>
											<Link to='/admin/userlist' onClick={removeActiveItem}>
												<i className='fas fa-users'></i>
											</Link>
										</li>
										<li className='nav-user-item'>
											<Link to='/admin/productlist' onClick={removeActiveItem}>
												<i className='fas fa-cart-arrow-down'></i>
											</Link>
										</li>
										<li className='nav-user-item'>
											<Link to='/admin/orderlist' onClick={removeActiveItem}>
												<i className='fas fa-chart-bar'></i>
											</Link>
										</li>
									</>
								) : (
									<></>
								)}
							</ul>
						</li>
					) : (
						<li>
							<Link to='/login' className='nav-link'>
								<i className='far fa-user'></i>
							</Link>
						</li>
					)}

					<li>
						<Link to='/cart' className='nav-link active'>
							<i className='fas fa-shopping-cart'></i>
						</Link>
					</li>
				</ul>
			</div>
			<div className='header-wrapper-mobile' id='mobile'>
				<div className='burger' onClick={burgerMenu}>
					<span className='burger-line'></span>
				</div>
				<li className='nav-search'>
					<i className='fas fa-search' onClick={toggleSearchInput}></i>
				</li>
				<Link to='/' className='logo'>
					<img src='/img/logo-text.png' alt='logo-text' />
				</Link>
				<li>
					<Link to='/favorite' className='nav-link active'>
						<i className='far fa-heart'></i>
					</Link>
				</li>
				<li>
					<Link to='/cart' className='nav-link active'>
						<i className='fas fa-shopping-cart'></i>
					</Link>
				</li>
				<ul className='nav nav-mobile' id='mobile-nav' onClick={closeBurgerMenu}>
					<li>
						<Link to='#' className='nav-link'>
							NEW ARRIVALS
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							PLUS SIZE
						</Link>
					</li>
					<li>
						<Link to='/catalog' className='nav-link active'>
							LINGERInE
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							NIGHTWEAR
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							GIFTS
						</Link>
					</li>
					<li>
						<Link to='#' className='nav-link'>
							COLLECTIONS
						</Link>
					</li>
				</ul>
			</div>
			<Route render={({ history }) => <SearchBox history={history} />} />
		</header>
	);
};

export default Header;
