import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to Almerna',
	description: 'We make things comfortable',
	keywords: 'lingerine, buy lingerine, nightwear, buy nightwear',
};

export default Meta;
