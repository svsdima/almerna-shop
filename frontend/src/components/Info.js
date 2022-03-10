import React from 'react';

const Info = () => {
	return (
		<div className='info'>
			<div className='container'>
				<div className='info-list'>
					<div className='info-item'>
						<div>
							<i class='fa fa-gift' aria-hidden='true'></i>
						</div>
						<div>
							<div className='info-title'>Complimentary Gift Wrapping</div>
							<div className='info-descr'>Free Luxury Gift Wrap on orders over £400</div>
						</div>
					</div>
					<div className='info-item'>
						<div>
							<i class='fa fa-gift' aria-hidden='true'></i>
						</div>
						<div>
							<div className='info-title'>PAY LATER WITH KLARNA</div>
							<div className='info-descr'>No interest. No Fees. No credit agreement.</div>
						</div>
					</div>
					<div className='info-item'>
						<div>
							<i class='fa fa-globe' aria-hidden='true'></i>
						</div>
						<div>
							<div className='info-title'>WORLDWIDE SHIPPING</div>
							<div className='info-descr'>International courier shipping</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Info;
