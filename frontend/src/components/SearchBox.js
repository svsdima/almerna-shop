import React, { useState } from 'react';

const closeSearchBox = (e) => {
	const search = document.getElementById('search');
	if (search) {
		if (search.classList.contains('active') && e.target !== search) {
			search.classList.remove('active');
		}
	}
};

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();

		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	const toggleSearch = () => {
		const search = document.getElementById('search');
		search.classList.toggle('active');
		return search;
	};

	return (
		<div className='search' id='search'>
			<div className='search-close'>
				<i className='fa fa-times' onClick={toggleSearch}></i>
			</div>
			<form onSubmit={submitHandler} className='search-form'>
				<input
					type='text'
					className='search-input'
					name='q'
					onChange={(e) => setKeyword(e.target.value)}
					placeholder='Search Products...'
				/>
				<button className='search-btn' type='submit'>
					<i className='fas fa-search'></i>
				</button>
			</form>
		</div>
	);
};

export { closeSearchBox, SearchBox };
