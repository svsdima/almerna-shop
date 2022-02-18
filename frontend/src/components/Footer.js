import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
	return (
		<footer className='footer' id='footer'>
			<div className='container'>
				<div className='footer-top'>
					<Logo />
					<ul className='footer-nav'>
						{/* List */}
						<div className='footer-list'>
							<div className='footer-list-title'>Main</div>
							<li>
								<Link to='#' className='footer-list-link'>
									Shop
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Underwear
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Bras
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Fitting Room
								</Link>
							</li>
						</div>
						{/* List */}
						<div className='footer-list'>
							<div className='footer-list-title'>Information</div>
							<li>
								<Link to='#' className='footer-list-link'>
									Payments
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Shipping & Delivery
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Returns
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Заключение покупки
								</Link>
							</li>
						</div>
						{/* List */}
						<div className='footer-list'>
							<div className='footer-list-title'>Company</div>
							<li>
								<Link to='#' className='footer-list-link'>
									О нас
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Реквизиты
								</Link>
							</li>
							<li>
								<Link to='#' className='footer-list-link'>
									Контакты
								</Link>
							</li>
						</div>
						{/* List */}
						<div className='footer-list'>
							<div className='footer-list-title'>Join Our Mailing List</div>
							<div className='footer-list-descr'>
								By signing up you agree with our Terms & Conditions and Privacy Policy. To opt out,
								click Unsubscribe in our emails.
							</div>
						</div>
					</ul>
				</div>
				<div className='footer-bottom'>
					<div className='footer-bottom-item'>©2021. Almerna</div>
					<div className='footer-bottom-item'>
						<Link to='#'>Terms & Condintions</Link>
					</div>
					<div className='footer-bottom-item'>
						<Link to='#'>Privacy Policy</Link>
					</div>
					<div className='footer-bottom-item'>
						<Link to='#'>
							<i className='fab fa-facebook-f'></i>
						</Link>
					</div>
					<div className='footer-bottom-item'>
						<Link to='#'>
							<i className='fab fa-instagram'></i>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
