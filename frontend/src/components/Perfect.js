import React from 'react';

const Perfect = () => {
	return (
		<div className='perfect'>
			<div className='perfect-left' style={{ backgroundImage: "url('/img/perfect/left.jpg')" }}>
				<div className='container'>
					<div className='perfect-right-wrapper'>
						{' '}
						<div className='white-text'>
							Must Have Intimates
							<span>BRA</span>
						</div>
					</div>
				</div>
			</div>
			<div className='perfect-right' style={{ backgroundImage: "url('/img/perfect/right.jpg')" }}>
				<div className='container'>
					<div className='perfect-right-wrapper'>
						{' '}
						<div className='white-text'>
							Your Pefect Summer
							<span>BODY</span>
						</div>
					</div>
				</div>
			</div>
			<div className='perfect-bottom' style={{ backgroundImage: "url('/img/perfect/bottom.jpg')" }}>
				<div className='container'>
					<div className='perfect-right-wrapper'>
						{' '}
						<div className='white-text'>
							Your Perfect Summer
							<span>nightwear</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Perfect;
